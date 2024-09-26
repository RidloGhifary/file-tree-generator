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

        // Get user settings
        const config = vscode.workspace.getConfiguration("fileTreeGenerator");
        const defaultFileName = config.get("defaultFileName", "FILE-TREE.txt");

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

        // Show progress indicator while generating file tree
        await vscode.window.withProgress(
          {
            location: vscode.ProgressLocation.Notification,
            title: "Generating File Tree",
            cancellable: false,
          },
          async (progress) => {
            progress.report({ increment: 0, message: "Starting..." });

            // Handle user choice
            let tree;
            if (selectedOption === options[0]) {
              tree = await generateFileTree(rootPath, progress);
            } else if (selectedOption === options[1]) {
              tree = await generateFileTreeWithSizes(rootPath);
            }

            if (tree) {
              // Prompt user for file name
              fileName = await vscode.window.showInputBox({
                placeHolder: "Enter file name",
                prompt:
                  "Enter the name of the file to generate (e.g., tree.txt)",
                value: defaultFileName,
              });

              // Handle potential invalid file name input
              if (!fileName) {
                vscode.window.showErrorMessage("File name cannot be empty.");
                return;
              }

              // Save the file tree to a file in the root folder
              const outputFilePath = path.join(rootPath, fileName);

              // Check if file already exists
              if (fs.existsSync(outputFilePath)) {
                const overwrite = await vscode.window.showWarningMessage(
                  `File ${fileName} already exists. Overwrite?`,
                  {
                    modal: true,
                    detail: "Select 'Yes' to overwrite or 'No' to rename.",
                  },
                  "Yes",
                  "No"
                );
                if (overwrite !== "Yes") {
                  return; // Abort saving
                }
              }

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
          }
        );
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
