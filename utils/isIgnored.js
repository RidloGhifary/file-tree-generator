const path = require("path");
const vscode = require("vscode");

// Start with default ignored patterns
let ignoredPatterns = [];

// Function to set ignored patterns based on user selection
function setIgnoredPatterns(selectedIgnoreOption) {
  const config = vscode.workspace.getConfiguration("fileTreeGenerator");
  const savedIgnoredPatterns = config.get("ignoredPatterns", [
    ".*",
    "node_modules",
    ".git",
    ".vscode",
  ]);

  if (selectedIgnoreOption === "Ignore hidden files and node_modules") {
    ignoredPatterns = [...savedIgnoredPatterns, "node_modules"];
  } else if (
    selectedIgnoreOption ===
    "Ignore hidden files, node_modules and files starting with ."
  ) {
    ignoredPatterns = [...savedIgnoredPatterns, "node_modules", ".*"];
  } else {
    ignoredPatterns = [...savedIgnoredPatterns]; // Use default settings from user config
  }
}

function isIgnored(filePath) {
  return ignoredPatterns.some((pattern) => {
    const baseName = path.basename(filePath);
    return (
      baseName === pattern || (pattern === ".*" && baseName.startsWith("."))
    );
  });
}

// Export the functions and patterns
module.exports = { isIgnored, setIgnoredPatterns };
