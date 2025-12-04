// Script to clear all Expo and Metro caches
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Clearing Expo and Metro caches...');

// Clear .expo directory
const expoDir = path.join(__dirname, '.expo');
if (fs.existsSync(expoDir)) {
  fs.rmSync(expoDir, { recursive: true, force: true });
  console.log('✓ Cleared .expo directory');
}

// Clear Metro cache
try {
  execSync('npx expo start --clear', { stdio: 'ignore', timeout: 5000 });
} catch (e) {
  // Ignore errors, we just want to trigger cache clear
}

console.log('✓ Cache cleared. You can now run: npm start');

