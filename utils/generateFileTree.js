const fs = require("fs");
const path = require("path");
const vscode = require("vscode");

const { isIgnored } = require("./isIgnored");

const config = vscode.workspace.getConfiguration("fileTreeGenerator");

async function generateFileTree(dir, progress, prefix = "") {
  let tree = "";
  const files = await fs.promises.readdir(dir);
  const totalFiles = files.length;

  for (let i = 0; i < files.length; i++) {
    const filePath = path.join(dir, files[i]);

    // Skip ignored files or directories
    if (isIgnored(filePath)) {
      continue;
    }

    const stat = await fs.promises.stat(filePath);

    const isLast = i === files.length - 1;

    // Add the current file or directory to the tree
    tree += `${prefix}${isLast ? "└── " : "├── "}${files[i]}\n`;

    // If it's a directory, recursively generate its file tree
    if (stat.isDirectory()) {
      const newPrefix = prefix + (isLast ? "    " : "│   ");
      tree += await generateFileTree(filePath, progress, newPrefix);
    }

    // Report progress (you can modify this as needed)
    progress.report({
      increment: 100 / totalFiles,
      message: `Processing: ${files[i]}`,
    });
  }

  return tree;
}

async function generateFileTreeWithSizes(dir, prefix = "") {
  const files = fs.readdirSync(dir);
  let tree = "";

  for (const file of files) {
    const filePath = path.join(dir, file);

    // Skip ignored files or directories
    if (isIgnored(filePath)) {
      continue;
    }

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
