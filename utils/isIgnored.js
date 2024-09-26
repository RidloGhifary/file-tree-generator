const path = require("path");

// Start with default ignored patterns
let ignoredPatterns = [];

// Function to set ignored patterns based on user selection
function setIgnoredPatterns(selectedIgnoreOption) {
  if (selectedIgnoreOption === "Ignore hidden files and node_modules") {
    ignoredPatterns = [".*", "node_modules"];
  } else if (
    selectedIgnoreOption ===
    "Ignore hidden files, node_modules and files starting with ."
  ) {
    ignoredPatterns = [".*", "node_modules", ".*"];
  } else {
    ignoredPatterns = []; // No ignored patterns
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
