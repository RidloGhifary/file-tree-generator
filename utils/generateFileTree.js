const fs = require("fs");
const path = require("path");

async function generateFileTree(dir, prefix = "") {
  let tree = "";
  const files = await fs.promises.readdir(dir);

  for (let i = 0; i < files.length; i++) {
    const filePath = path.join(dir, files[i]);
    const stat = await fs.promises.stat(filePath);

    const isLast = i === files.length - 1;

    // Add the current file or directory to the tree
    tree += `${prefix}${isLast ? "└── " : "├── "}${files[i]}\n`;

    // If it's a directory, recursively generate its file tree
    if (stat.isDirectory()) {
      const newPrefix = prefix + (isLast ? "    " : "│   ");
      tree += await generateFileTree(filePath, newPrefix);
    }
  }

  return tree;
}

async function generateFileTreeWithSizes(dir, prefix = "") {
  const files = fs.readdirSync(dir);
  let tree = "";

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stats = fs.statSync(filePath);
    const fileSizeInBytes = stats.size;

    if (stats.isDirectory()) {
      tree += `${prefix}├── ${file}/ (${fileSizeInBytes} bytes)\n`;
      tree += await generateFileTreeWithSizes(filePath, prefix + "│   ");
    } else {
      tree += `${prefix}├── ${file} (${fileSizeInBytes} bytes)\n`;
    }
  }

  return tree;
}

module.exports = { generateFileTree, generateFileTreeWithSizes };
