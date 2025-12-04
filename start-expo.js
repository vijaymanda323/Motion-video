// Wrapper script to fix Windows node:sea path issue
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

// Patch fs.promises.mkdir before requiring Expo
const originalMkdir = fs.promises.mkdir;
fs.promises.mkdir = function(dirPath, options) {
  // Replace colons with underscores in the path for Windows compatibility
  if (process.platform === 'win32' && typeof dirPath === 'string' && dirPath.includes('node:sea')) {
    dirPath = dirPath.replace(/node:sea/g, 'node_sea');
  }
  return originalMkdir.call(this, dirPath, options);
};

// Also patch fs.mkdirSync
const originalMkdirSync = fs.mkdirSync;
fs.mkdirSync = function(dirPath, options) {
  // Replace colons with underscores in the path for Windows compatibility
  if (process.platform === 'win32' && typeof dirPath === 'string' && dirPath.includes('node:sea')) {
    dirPath = dirPath.replace(/node:sea/g, 'node_sea');
  }
  return originalMkdirSync.call(this, dirPath, options);
};

// Now start Expo
const expoProcess = spawn('npx', ['expo', 'start', ...process.argv.slice(2)], {
  stdio: 'inherit',
  shell: true
});

expoProcess.on('error', (error) => {
  console.error('Failed to start Expo:', error);
  process.exit(1);
});

expoProcess.on('exit', (code) => {
  process.exit(code || 0);
});

