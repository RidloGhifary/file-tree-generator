# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.0.1] - 2024-09-25

### Added

- Initial release of the extension.
- Generate a file tree of the workspace with one click.
- Output is saved in a `FILE-TREE.txt` file by default in the root of the workspace.
- Display the generated file tree in the VS Code editor after creation.

## [0.1.0] - 2024-09-26

### Added

- Generate a file tree of the workspace with options for including file sizes.
- Output is saved in a user-defined file name.
- Display the generated file tree in the VS Code editor after creation.

## [0.1.1] - 2024-09-27

### Added

- User options to ignore hidden files and specific directories like `node_modules`, `.git`, and `.vscode`.
- Options for ignoring:
  - "Ignore hidden files and node_modules"
  - "Ignore hidden files, node_modules, and files starting with ."
  - "None" (no files ignored).
- Enhanced file tree generation logic to incorporate user choices for ignored files.
- Users can now set a default file name for the generated file tree
- Added the ability to specify ignored patterns through settings

## [0.1.2] - 2024-09-27

### Fix

- Overwrite file name when user says "No".
