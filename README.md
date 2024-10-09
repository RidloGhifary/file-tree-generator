# File Tree Generator

**File Tree Generator** is a Visual Studio Code extension that allows users to generate a visual file tree of their workspace with just one click. This extension provides a quick and easy way to view the structure of your project and even includes options to show file sizes.

## Features

- **Generate File Tree:** Visualize the structure of your project folders and files.
- **File Sizes (Optional):** Option to include file sizes alongside the file names.
- **Custom File Name:** Users can choose the name for the file tree output.
- **Keyboard Shortcut:** Quickly generate a file tree using a customizable keyboard shortcut.
- **Ignore Options**:
  - Ignore hidden files and the `node_modules` directory.
  - Ignore hidden files, `node_modules`, and files starting with `.`.
  - No files ignored (all files included).
- **Output Display**: View the generated file tree directly in the VS Code editor.
- **User Settings**:
  - Users can now set a default file name for the generated file tree
  - Added the ability to specify ignored patterns through settings

## How to Use

1. Open a folder in VS Code.
2. Press `Ctrl+Alt+t` to open the command palette.
3. Type `Generate File Tree` and select the option you prefer:
   - **Generate File Tree**: Create a basic file tree.
   - **Generate File Tree with Sizes**: Create a file tree that includes file sizes.
4. You will be asked for the name of the file.
5. The output will be saved as `FILE-TREE.txt` by default (or your chosen file name) in the root directory of the workspace.

## Settings

This extension can be customized through settings:

- **`fileTreeGenerator.defaultFileName`**: Set the default file name for the generated file tree.
- **`fileTreeGenerator.includeFiles`**: Choose whether to include files in the file tree.
- **`fileTreeGenerator.ignoredPatterns`**: Set default ignore patterns for files and directories.

## Custom Keyboard Shortcut

By default, you can trigger the command through the command palette. If you'd like to assign a keyboard shortcut:

1. Go to **Preferences** > **Keyboard Shortcuts**.
2. Search for `fileTreeGenerator.generate` and assign your preferred shortcut.

## Installation

1. Download or clone this repository.
2. Install the extension in VS Code by navigating to `Extensions` > `Install from VSIX` or searching the marketplace once it’s published.
3. Enjoy quick and easy file tree generation!

## Contributing

I genuinely believe that collaboration is key in development, so I welcome any contributions or feedback from fellow developers who are interested in this project. Your insights could help make this extension even better! Additionally, I believe this project has a lot of potential for future features, and I would love to see it evolve with the help of the community.

## Issues and Feedback

If you encounter any issues or have suggestions for improvement, feel free to open an issue on the GitHub repository or leave a review on the Visual Studio Code Marketplace.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
