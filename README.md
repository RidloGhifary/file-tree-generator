# File Tree Generator

**File Tree Generator** is a Visual Studio Code extension that allows users to generate a visual file tree of their workspace with just one click. This extension provides a quick and easy way to view the structure of your project and even includes options to show file sizes.

## Features

- 📂 **Generate File Tree:** Visualize the structure of your project folders and files.
- 📊 **File Sizes (Optional):** Option to include file sizes alongside the file names.
- 💾 **Custom File Name:** Users can choose the name for the file tree output.
- ⚡ **Keyboard Shortcut:** Quickly generate a file tree using a customizable keyboard shortcut.
- 💡 **Customizable Output:** Choose whether to generate just the file tree or include file sizes as well.

## How to Use

1. Open a folder in VS Code.
2. Press `Ctrl+Alt+t` to open the command palette.
3. Type `Generate File Tree` and select the option you prefer:
   - **Generate File Tree**: Create a basic file tree.
   - **Generate File Tree with Sizes**: Create a file tree that includes file sizes.
4. You will be asked for the name of the file.
5. The output will be saved as `FILE-TREE.txt` by default (or your chosen file name) in the root directory of the workspace.

## Custom Keyboard Shortcut

By default, you can trigger the command through the command palette. If you'd like to assign a keyboard shortcut:

1. Go to **Preferences** > **Keyboard Shortcuts**.
2. Search for `fileTreeGenerator.generate` and assign your preferred shortcut.

## Installation

1. Download or clone this repository.
2. Install the extension in VS Code by navigating to `Extensions` > `Install from VSIX` or searching the marketplace once it’s published.
3. Enjoy quick and easy file tree generation!

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests to improve the extension.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
