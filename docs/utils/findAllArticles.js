const fs = require('fs/promises');
const path = require('path');
const dayjs = require("dayjs");
const _ = require("lodash");

let markdownFiles = [];
const findMarkdownFiles = async (folderPath) => {
  try {
    // 读取文件夹内的所有文件/文件夹
    const files = await fs.readdir(folderPath);
    for (const file of files) {
      const filePath = path.join(folderPath, file);
      // 读取文件/文件夹的信息
      const stats = await fs.stat(filePath)
      if (stats.isDirectory()) {
        await findMarkdownFiles(filePath);
      } else {
        const fileName = path.basename(filePath);
        if (fileName.toLowerCase().endsWith('.md')) {
          markdownFiles.push(handleFileInfo(stats, fileName, folderPath));
        }
      }
    }
  } catch (err) {
    console.error(`Error reading directory: ${err.message}`);
  }
}

const handleFileInfo = (stats, fileName, folderPath) => {
  const info = {
    createTime: dayjs(stats.ctime).format('YYYY-MM-DD HH:mm:ss'),
    lastTime: dayjs(stats.mtime).format('YYYY-MM-DD HH:mm:ss'),
  }
  if (fileName === 'index.md') {
    const parentFolder = folderPath.split('/').pop();
    return {
      ...info,
      name: `${parentFolder}.md`,
    }
  } else {
    return {
      ...info,
      name: fileName,
    }
  }
}

findMarkdownFiles('docs/pages').then(async () => {
  try {
    _.sortBy(markdownFiles, ['createTime'], ['desc']);
    // 更新文章列表
    await fs.writeFile('docs/public/asserts/articles.json', JSON.stringify(markdownFiles))
  } catch (err) {
    console.error(err);
  }
});