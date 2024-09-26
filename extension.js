const vscode = require("vscode");
const fs = require("fs");
const path = require("path");

const {
  generateFileTree,
  generateFileTreeWithSizes,
} = require("./utils/generateFileTree");
const { setIgnoredPatterns } = require("./utils/isIgnored");
const { ignoreOptions } = require("./constant/index");

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

        // Prompt user for ignore options
        const selectedIgnoreOption = await vscode.window.showQuickPick(
          ignoreOptions,
          {
            placeHolder: "Select ignore options",
          }
        );

        setIgnoredPatterns(selectedIgnoreOption);

        // Prompt user for file name
        let fileName;

        // Present option for user
        const options = ["Generate File Tree", "Generate File Tree with Sizes"];
        const selectedOption = await vscode.window.showQuickPick(options, {
          placeHolder: "Select an option",
        });

        // Handle user choice
        let tree;
        if (selectedOption === options[0]) {
          tree = await generateFileTree(rootPath);
        } else if (selectedOption === options[1]) {
          tree = await generateFileTreeWithSizes(rootPath);
        }

        if (tree) {
          // Prompt user for file name
          fileName = await vscode.window.showInputBox({
            placeHolder: "Enter file name",
            prompt: "Enter the name of the file to generate (e.g., tree.txt)",
            value: "FILE-TREE.txt",
          });

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
          vscode.window.showErrorMessage(
            "An error occurred while generating the file tree."
          );
        }
      } else {
        vscode.window.showInformationMessage("No folder or workspace opened.");
      }
    }
  );

  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
