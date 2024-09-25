const vscode = require("vscode");
const fs = require("fs");
const path = require("path");

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  const disposable = vscode.commands.registerCommand(
    "file-tree-generator.generate",
    async function () {
      const workspaceFolders = vscode.workspace.workspaceFolders;

      if (workspaceFolders && workspaceFolders.length > 0) {
        const rootPath = workspaceFolders[0].uri.fsPath;
        const tree = await generateFileTree(rootPath);
        const fileName = "FILE_TREE.txt";

        // Save the file tree to a file in the root folder
        const outputFilePath = path.join(rootPath, fileName);
        await fs.promises.writeFile(outputFilePath, tree);

        // Open the output file in the editor
        vscode.workspace.openTextDocument(outputFilePath).then((doc) => {
          vscode.window.showTextDocument(doc);
        });

        vscode.window.showInformationMessage(
          "File Tree Generated and saved to: " + fileName
        );
      } else {
        vscode.window.showInformationMessage("No folder or workspace opened.");
      }
    }
  );

  context.subscriptions.push(disposable);
}

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

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
