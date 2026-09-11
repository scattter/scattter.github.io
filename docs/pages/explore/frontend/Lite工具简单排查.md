# Lite工具简单排查

以 **[此方案](https://sit.meijian.com/mj/meijian-tool/meijian-platform/lite-design?configId&designId=1039855&subSiteFrom=default)** 为基准测试

![image2025-8-18_15-46-36](/Users/zhangke/Desktop/image2025-8-18_15-46-36.png)



主要问题在于移动端打开lite工具的时候页面十分卡顿

1. 事件监听多?
2. 引入的额外资源比较多
3. 内存占用过高
4. 监听过多



由于是在移动端使用, 不属于重度使用场景, 更多的重点在于能支持一些简单, 临时的修改就行, 因此主要优化原则就是 **能精简就精简**.



简单处理后得分

![image2025-8-25_17-49-28](/Users/zhangke/.Trash/image2025-8-25_17-49-28.png)





**内存占用过高**(暂时未排查到具体点, 后续做的时候再排查下)

![image2025-8-19_9-45-4](https://cdn.jsdelivr.net/gh/scattter/blogweb/images/image2025-8-19_9-45-4.png)

![image2025-8-19_11-27-40](https://cdn.jsdelivr.net/gh/scattter/blogweb/images/image2025-8-19_11-27-40.png)



https://developer.chrome.com/docs/lighthouse/performance/mainthread-work-breakdown?utm_source=lighthouse&utm_medium=devtools&hl=zh-cn

https://web.dev/articles/monitor-total-page-memory-usage?hl=zh-cn





## 部分已处理问题记录如下

| 示例                                                         | 具体问题                                                     | 解决方法                       |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------ |
| <img src="https://cdn.jsdelivr.net/gh/scattter/blogweb/images/image2025-8-18_17-17-28.png" alt="image2025-8-18_17-17-28" style="zoom:25%;" /> | export-design: 841kb, <br />右上角分享弹窗                   | 懒加载, 点击右上角按钮再去加载 |
|                                                              | ai-generate: 953kb, <br />文本生成 (旧版文本生成)            | 同上懒加载方式                 |
|                                                              | tool-ui-cmn: 788kb                                           | 不处理, 保持现状               |
|                                                              | 字体资源<br />yanshixiaxingkai.woff2: 4657Kb<br />backupFont.woff2: 4176Kb<br />taiwanquanziku....woff2: 3809Kb<br />Source....woff2: 1013kb... | 不处理, 保持现状               |
|                                                              |                                                              |                                |
|                                                              |                                                              |                                |
|                                                              |                                                              |                                |
|                                                              |                                                              |                                |

 示例具体问题解决方法![闰土 > Lite工具性能优化 > image2025-8-18_17-17-28.png](https://cf.qunhequnhe.com/download/attachments/81282631507/image2025-8-18_17-17-28.png?version=1&modificationDate=1755508649000&api=v2)    export-design: 841kb右上角分享弹窗懒加载, 点击右上角按钮再去加载ai-generate: 953kb文本生成 (旧版文本生成)同上懒加载方式tool-ui-cmn: 788kb不处理, 保持现状字体资源yanshixiaxingkai.woff2: 4657KbbackupFont.woff2: 4176Kbtaiwanquanziku....woff2: 3809KbSource....woff2: 1013kb...不处理, 保持现状tool-ui组件资源之前有部分toast使用的tools-ui, 现在统一为了mj-base-ui(这里mj-base里面不做替换)![闰土 > Lite工具性能优化 > image2025-8-21_16-11-51.png](https://cf.qunhequnhe.com/download/attachments/81282631507/image2025-8-21_16-11-51.png?version=1&modificationDate=1755763911000&api=v2)![闰土 > Lite工具性能优化 > image2025-8-21_16-13-26.png](https://cf.qunhequnhe.com/download/attachments/81282631507/image2025-8-21_16-13-26.png?version=1&modificationDate=1755764007000&api=v2)由于lite工具要支持多语言路径切换, 所以挂载了完整的多语言内容, 请求大小飙升至623k如果是pad端, 同时不是coohom环境, 是不是就可以先不适配多语言了(这样能节约很多)local![闰土 > Lite工具性能优化 > image2025-8-21_16-56-11.png](https://cf.qunhequnhe.com/download/attachments/81282631507/image2025-8-21_16-56-11.png?version=1&modificationDate=1755766572000&api=v2)sit![闰土 > Lite工具性能优化 > image2025-8-21_16-55-56.png](https://cf.qunhequnhe.com/download/attachments/81282631507/image2025-8-21_16-55-56.png?version=1&modificationDate=1755766557000&api=v2)lite工具没有chunk, 资源体积有4670ksit环境打包是用splitChunk + Terser![闰土 > Lite工具性能优化 > image2025-8-21_17-9-31.png](https://cf.qunhequnhe.com/download/attachments/81282631507/image2025-8-21_17-9-31.png?version=1&modificationDate=1755767372000&api=v2)chunk拆分后为3801 + 894 两个请求![闰土 > Lite工具性能优化 > image2025-8-21_17-20-31.png](https://cf.qunhequnhe.com/download/attachments/81282631507/image2025-8-21_17-20-31.png?version=1&modificationDate=1755768032000&api=v2)terser压缩后为3449 + 845两个请求, 相比于之前节约了376k 



 示例具体问题解决方法![闰土 > Lite工具性能优化 > image2025-8-18_18-10-33.png](https://cf.qunhequnhe.com/download/attachments/81282631507/image2025-8-18_18-10-33.png?version=1&modificationDate=1755511834000&api=v2)空白页面icon集成到项目中, 不使用线上资源其他图片由于其他的都是预览图, 没办法提前获取, 因此不处理 



 示例具体问题解决方法![闰土 > Lite工具性能优化 > image2025-8-18_18-19-47.png](https://cf.qunhequnhe.com/download/attachments/81282631507/image2025-8-18_18-19-47.png?version=1&modificationDate=1755512388000&api=v2)需要gzip处理暂不处理 



 示例具体问题解决方法![闰土 > Lite工具性能优化 > image2025-8-18_18-20-28.png](https://cf.qunhequnhe.com/download/attachments/81282631507/image2025-8-18_18-20-28.png?version=1&modificationDate=1755512429000&api=v2)![闰土 > Lite工具性能优化 > image2025-8-21_15-45-3.png](https://cf.qunhequnhe.com/download/attachments/81282631507/image2025-8-21_15-45-3.png?version=1&modificationDate=1755762303000&api=v2)返回的资源没有经过压缩使用css-minimizer-webpack-plugin 进行处理, 但是暂时看起来没生效返回了部分其他暂时不用的微应用的资源在第一part懒加载处理后也就不存在了 



 示例具体问题解决方法![闰土 > Lite工具性能优化 > image2025-8-20_15-11-43.png](https://cf.qunhequnhe.com/download/attachments/81282631507/image2025-8-20_15-11-43.png?version=1&modificationDate=1755673904000&api=v2)部分图片请求没有走webp增加对imgUrl的webp处理![闰土 > Lite工具性能优化 > image2025-8-20_16-22-31.png](https://cf.qunhequnhe.com/download/attachments/81282631507/image2025-8-20_16-22-31.png?version=1&modificationDate=1755678152000&api=v2) 





最长的task: 820ms![闰土 > Lite工具性能优化 > image2025-8-21_18-1-41.png](https://cf.qunhequnhe.com/download/attachments/81282631507/image2025-8-21_18-1-41.png?version=1&modificationDate=1755770502000&api=v2)![闰土 > Lite工具性能优化 > image2025-8-21_19-29-12.png](https://cf.qunhequnhe.com/download/attachments/81282631507/image2025-8-21_19-29-12.png?version=1&modificationDate=1755775753000&api=v2)  示例频繁触发函数 `触发layout/util.ts(这里是处理元素)186.4 + 59.7`![闰土 > Lite工具性能优化 > image2025-8-21_17-51-1.png](https://cf.qunhequnhe.com/download/attachments/81282631507/image2025-8-21_17-51-1.png?version=1&modificationDate=1755769861000&api=v2)`eliminateConstraintCollisionByTypealgorithm/layout/util.ts: 186.4KGxLayoutContainer: 108.4 (主要优化)DisplayEntities/index.ts: 49.3 (次要)intelligentContainerEntity/index.ts: 46.3IntelligentLayoutBuilderAdapter.ts: 37.5photoWallLayout.ts: 37.4` ![闰土 > Lite工具性能优化 > image2025-8-21_18-3-12.png](https://cf.qunhequnhe.com/download/attachments/81282631507/image2025-8-21_18-3-12.png?version=1&modificationDate=1755770593000&api=v2)![闰土 > Lite工具性能优化 > image2025-8-22_11-10-6.png](https://cf.qunhequnhe.com/download/attachments/81282631507/image2025-8-22_11-10-6.png?version=1&modificationDate=1755832207000&api=v2)IntelligentGroupCommand: 59.7icon-park 触发layout布局![闰土 > Lite工具性能优化 > image2025-8-21_17-51-57.png](https://cf.qunhequnhe.com/download/attachments/81282631507/image2025-8-21_17-51-57.png?version=1&modificationDate=1755769918000&api=v2)layout: 112.9FunctionPanel: 79QuickDesign: 14.7Design: 11.9AIBackground: 11.6AIAssitant: 26.3 ![闰土 > Lite工具性能优化 > image2025-8-21_17-55-15.png](https://cf.qunhequnhe.com/download/attachments/81282631507/image2025-8-21_17-55-15.png?version=1&modificationDate=1755770116000&api=v2)sceneHandler: 77.6batchGenerate: 70.3BatchGeneratePanel: 46controlPoints/crop/index.ts: 23  ![闰土 > Lite工具性能优化 > image2025-8-21_17-56-51.png](https://cf.qunhequnhe.com/download/attachments/81282631507/image2025-8-21_17-56-51.png?version=1&modificationDate=1755770211000&api=v2)kaf: 201.4不处理 





## mj-base内部toast组件mj-base-ui和tools-ui的解析性能对比

|                                                              | 不同组件                                                     |                                                              |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| case-1fontLoadManager                                        | **mj-base-ui****113ms**                                      | ![闰土 > Lite工具性能优化 > image2025-8-22_14-11-4.png](https://cf.qunhequnhe.com/download/attachments/81282631507/image2025-8-22_14-11-4.png?version=1&modificationDate=1755843065000&api=v2) |
| **tools-ui****18.8ms**                                       | ![闰土 > Lite工具性能优化 > image2025-8-22_14-55-47.png](https://cf.qunhequnhe.com/download/attachments/81282631507/image2025-8-22_14-55-47.png?version=1&modificationDate=1755845748000&api=v2) |                                                              |
| **None****19.4ms**(这里数值是本地测的有波动, 所以可能会比上面的大些) | ![闰土 > Lite工具性能优化 > image2025-8-22_14-29-7.png](https://cf.qunhequnhe.com/download/attachments/81282631507/image2025-8-22_14-29-7.png?version=1&modificationDate=1755844147000&api=v2) |                                                              |
| case-2deleteCommand                                          | mj-base-ui191.5ms                                            | ![闰土 > Lite工具性能优化 > image2025-8-22_15-20-41.png](https://cf.qunhequnhe.com/download/attachments/81282631507/image2025-8-22_15-20-41.png?version=1&modificationDate=1755847242000&api=v2) |
| **tools-ui****118.8ms**                                      | ![闰土 > Lite工具性能优化 > image2025-8-22_15-59-8.png](https://cf.qunhequnhe.com/download/attachments/81282631507/image2025-8-22_15-59-8.png?version=1&modificationDate=1755849549000&api=v2) |                                                              |
| muya-ui153.3ms                                               | ![闰土 > Lite工具性能优化 > image2025-8-22_15-42-39.png](https://cf.qunhequnhe.com/download/attachments/81282631507/image2025-8-22_15-42-39.png?version=1&modificationDate=1755848560000&api=v2) |                                                              |
| 综上, 最后这mj-base里面还是使用tools-ui来进行消息提示        |                                                              |                                                              |

























--------------------------  Below is Draft.... --------------------------

处理前

![闰土 > Lite工具性能优化 > image2025-8-22_11-39-47.png](https://cf.qunhequnhe.com/download/attachments/81282631507/image2025-8-22_11-39-47.png?version=1&modificationDate=1755833987000&api=v2)

在verifyElement中直接不调用该方法

![闰土 > Lite工具性能优化 > image2025-8-22_14-6-34.png](https://cf.qunhequnhe.com/download/attachments/81282631507/image2025-8-22_14-6-34.png?version=1&modificationDate=1755842795000&api=v2)

![闰土 > Lite工具性能优化 > image2025-8-22_14-11-4.png](https://cf.qunhequnhe.com/download/attachments/81282631507/image2025-8-22_14-11-4.png?version=1&modificationDate=1755843065000&api=v2)

![闰土 > Lite工具性能优化 > image2025-8-22_11-38-28.png](https://cf.qunhequnhe.com/download/attachments/81282631507/image2025-8-22_11-38-28.png?version=1&modificationDate=1755833909000&api=v2)

目前是156ms