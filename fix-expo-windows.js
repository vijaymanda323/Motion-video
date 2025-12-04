// Workaround for Windows path issue with node:sea
const fs = require('fs');
const path = require('path');

const expoDir = path.join(__dirname, '.expo', 'metro', 'externals');

// Create the directory structure, but sanitize any problematic paths
try {
  if (!fs.existsSync(expoDir)) {
    fs.mkdirSync(expoDir, { recursive: true });
  }
  
  // Create a workaround for node:sea path issue on Windows
  // Windows doesn't allow colons in directory names, so we need to handle this
  const nodeSeaDir = path.join(expoDir, 'node_sea'); // Use underscore instead of colon
  
  // Monkey-patch fs.mkdir to handle node:sea paths
  const originalMkdir = fs.promises.mkdir;
  fs.promises.mkdir = function(dirPath, options) {
    // Replace colons with underscores in the path for Windows compatibility
    if (process.platform === 'win32' && dirPath.includes('node:sea')) {
      dirPath = dirPath.replace(/node:sea/g, 'node_sea');
    }
    return originalMkdir.call(this, dirPath, options);
  };
  
  console.log('Created .expo/metro/externals directory and applied Windows fix');
} catch (error) {
  console.error('Error creating directory:', error.message);
}

