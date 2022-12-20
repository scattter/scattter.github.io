# 项目生成脚本执行记录并发布npm包

> 在做自己项目`soft work`的时候出现需要在现有数据库表中增加字段的需求, 在TW写后端的时候用的是flyway进行sql脚本控制数据库. 在网上搜索了一番没找到类似的解决方案, 后面和现在公司的后端聊了下, 意识到无论是flyway还是其他解决方案, 主要目的是为了操作可追溯, 此外我在用vitepress写博客的时候想搞一个changelog, 这两个需求有些类似, 因此就自己动手写了这个很简陋的npm包, 进而实现上述功能.



在我的预想中, 这个工具主要可以实现两个功能:

1. 基于本地的脚本, 进行执行随后生成历史记录
1. 基于项目的git信息, 将所有的commit信息生成到一个`changelog`文件中



第一个功能较容易实现, 主要是一些文件的读写和处理; 而在第二个功能中, 涉及到github接口的调用, 信息的分割, 什么时候触发信息的写入, 等等

对于上面提到的问题, 有下面一些初步的想法:

1. 怎么根据用户的版本需要将所有的commit信息进行分割: 基于`npm run build:prod` 命令进行分割处理
2. 触发commit信息写入的时机: 配合`husky` 使用, 在`git push` 的时候进行写入

其他关于`changelog`的问题后续开发后再进行更新



## 一. 本地脚本执行记录的log生成

所需依赖:

- fs: 文件的读取和写入
- shelljs: 脚本执行
- yaml: 日志的yml格式写入和解析



该功能主要分为三大模块

1. 查询数据并处理数据
2. 处理具体脚本
3. 保存脚本的执行状态



为了使log信息清晰明了, 使用yml格式的文件进行存储, 同时为了翻阅记录, 本次生成的脚本执行log信息除了保存在`2022-xx-xx.yml` 这种命名格式的文件中外, 还在单独的文件 (`all.yml`) 中保存有所有脚本的执行信息. 当然, 在`all.yml` 文件中保存的信息比`2022-xx-xx.yml` 中的信息要简陋许多, 具体内容可参考下面图片.

此外, 在函数中还内置了一些默认参数, 包括

```javascript
// 默认的脚本路径
const DEFAULT_SCRIPTS_PATH = './scripts'
// 默认的log信息路径
const DEFAULT_LOGS_PATH = './logs'
// 默认的完成log信息文件
const DEFAULT_SUMMARY_LOG_PATH = './logs/all.yml'
// 默认的node读取文件配置(如果文件不存在那就新建文件)
const DEFAULT_READ_FILE_OPTION = {
  flag: 'a+',
  encoding: 'utf8'
}
```



### 1. 效果

文件目录结构

![image-20221220220820357](https://cdn.jsdelivr.net/gh/scattter/blogweb/images/image-20221220220820357.png)



`all.yml` 的文件内部格式

<img src="https://cdn.jsdelivr.net/gh/scattter/blogweb/images/image-20221220220935634.png" alt="image-20221220220935634" />

`2022-12-20.yml` 的文件内部格式

<img src="https://cdn.jsdelivr.net/gh/scattter/blogweb/images/image-20221220220954338.png" alt="image-20221220220954338" />





### 2. 实现

#### 2.1 查询数据并处理数据

该功能的入口函数为`generateLogs` , 该函数如果不传参, 那么函数内部就使用默认的参数, 如脚本路径, log信息路径, 读取文件配置等

主要处理流程包括为:

1. 读取配置项, 获取脚本文件, 脚本执行的日志信息
2. 对概览型的脚本执行日志 (`all.yml`) 信息进行过滤, 找出所有成功执行的脚本并保存进`activeScripts` 数组
3. 新建变量`newScripts` 用来保存本次执行脚本日志到`all.yml` 文件中
4. 遍历所有的脚本文件, 根据`activeScripts` 数组判断脚本是否成功执行过, 未成功执行就调用`execScript` 函数进行脚本执行和日志记录(该函数在2.2 部分介绍)
5. 所有未执行脚本执行完毕后,  保存`newScripts` 信息到`all.yml` 文件中 (保存逻辑在2.3 部分介绍)



具体代码为:

```javascript
function generateLogs(logsFolderPath = DEFAULT_LOGS_PATH, scriptsFolderPath = DEFAULT_SCRIPTS_PATH, ...options) {
  const { summaryLogPath = DEFAULT_SUMMARY_LOG_PATH, readFileOption = DEFAULT_READ_FILE_OPTION } = options || {}
  let readDirs = fs.readdirSync(scriptsFolderPath);
  let allLogs = fs.readFileSync(summaryLogPath, readFileOption);
  let parsedLogs = YAML.parse(allLogs)

// 所有成功执行的脚本数组
  let activeScripts = []
  if (parsedLogs) {
    Object.values(parsedLogs).forEach(dayLogs => {
      activeScripts = [...activeScripts, ...Object.keys(dayLogs).filter(key => dayLogs[key] === 'success')]
    })
  }

  // 记录新执行脚本成功与否
  let newScripts = {}
  const nowDate = shell.exec('date +%Y-%m-%d').trim()

  // 写入单独的带有时间信息的yml文件中
  readDirs.forEach(dir => {
    const filePath = `${scriptsFolderPath}/${dir}`
    const targetPath = `${logsFolderPath}/${nowDate}.yml`
    if (!activeScripts.includes(filePath)) {
      // 执行脚本同时进行结果的保存处理
      execScript(filePath, targetPath, newScripts)
    }
  })

  // 写入全部yml记录中
  // 更新
  if (parsedLogs && parsedLogs[nowDate]) {
    // 更新所有本次执行脚本的执行结果
    Object.keys(newScripts).map(key => {
      parsedLogs[nowDate][key] = newScripts[key]
    })
    fs.writeFileSync(summaryLogPath, YAML.stringify(parsedLogs))
  } else {
    // 本次执行脚本之前从未执行过, 因此进行新增
    const yamlContext = YAML.stringify({
      [nowDate]: newScripts
    })
    fs.appendFileSync(summaryLogPath, yamlContext)
  }
}
```



#### 2.2 处理具体脚本

该功能的函数为`execScript`, 该函数有三个基本的必填入参和一些额外的可选入参: 

- filePath: 执行脚本的路径
- targetPath: 脚本执行后状态保存的路径
- newScripts: 全局变量, 用来记录每次脚本执行的概览信息, 保存更新到`all.yml` 文件中
- options: 如文件读取配置项等信息



主要的处理流程包括:

1. 读取要保存的日志文件file a(`2022-xx-xx.yml` 命名格式的文件), 查询当前日期
2. 判断当前路径的脚本文件是否在日志文件中存在过
   1. 如果日志文件不存在, 或者当前脚本文件不在日志文件中存在, 执行当前脚本, 同时根据脚本的执行状态, 将日志状态, 时间直接追加进file a中, 同时更新全局变量`newScripts`, 用于最后保存到all.yml` 文件中
   2. 如果日志文件存在, 且之前该脚本的执行状态是`error` , 重新执行改脚本. 如果执行成功, 那么将之前file a中改脚本的执行状态置为`success`, 使用新的内容覆盖历史内容, 写入文件; 失败的话保持现状, 同时更新全局变量`newScripts`.



具体代码为:

```javascript
// 脚本处理函数
function execScript(filePath, targetPath, newScripts, ...options) {
  const { readFileOption = DEFAULT_READ_FILE_OPTION } = options || {}
  const data = YAML.parse(fs.readFileSync(targetPath, readFileOption))
  const now = shell.exec('date "+%Y-%m-%d %H:%M:%S"').trim()
  // 判断是否未执行
  if (!data || !data[filePath]) {
    const script = fs.readFileSync(filePath, readFileOption);
    const isSuccess = shell.exec(script).code === 0

    // 新脚本的话直接添加进去
    newScripts[filePath] = isSuccess ? 'success' : 'error'
    const result = {
      [filePath]: {
        status: isSuccess ? 'success' : 'error',
        firstDate: now,
        lastDate: now
      },
    }
    const yamlContext = YAML.stringify(result)
    fs.appendFileSync(targetPath, yamlContext)

    // 如果脚本执行失败, 抛出错误
    if (!isSuccess) {
      shell.echo(`Error: ${filePath} script failed`);
    }
  } else {
    // 如果是执行之前出错的代码, 那么就对原数据进行修改, 然后重写进yml文件中
    if (data[filePath] && data[filePath].status === 'error') {
      const script = fs.readFileSync(filePath, readFileOption);
      if (shell.exec(script).code === 0) {
        newScripts[filePath] = 'success'
        data[filePath].status = 'success'
        data[filePath].lastDate = now
        const yamlContext = YAML.stringify(data)
        fs.writeFileSync(targetPath, yamlContext)
      } else {
        newScripts[filePath] = 'error'
        shell.echo(`Error: ${filePath} script failed`);
      }
    }
  }
}
```



#### 2.3 日志保存逻辑

- 如果当前脚本的日志不存在, 那么就新生成对象, 格式化后追加进日志文件中;

-  如果当前脚本的日志存在, 同时是`error` 状态, 那么就对文件历史内容进行解析,执行脚本后更新其状态为最新执行状态, 然后整个覆盖日志文件的旧内容.

  

`generateLogs` 函数和`execScript` 函数都使用该逻辑, 同时该逻辑在2.2部分的处理流程中也有详细的解释.



以上就是该部分功能实现的一些介绍.