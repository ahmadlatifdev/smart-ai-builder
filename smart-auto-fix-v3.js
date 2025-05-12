// smart-auto-fix-v3.js

const fs = require('fs');
const path = require('path');

// Helper to check if a folder exists
function folderExists(folderPath) {
    return fs.existsSync(folderPath) && fs.lstatSync(folderPath).isDirectory();
}

// Helper to check if a file exists
function fileExists(filePath) {
    return fs.existsSync(filePath) && fs.lstatSync(filePath).isFile();
}

function validateProjectStructure() {
    const requiredFolders = ['app', 'components'];
    const requiredFiles = ['package.json', 'tailwind.config.js', 'tsconfig.json', 'postcss.config.js', 'next.config.js'];

    let errors = [];

    // Check folders
    requiredFolders.forEach(folder => {
        if (!folderExists(folder)) {
            errors.push(`❌ Missing folder: ${folder}`);
        }
    });

    // Check files
    requiredFiles.forEach(file => {
        if (!fileExists(file)) {
            errors.push(`❌ Missing file: ${file}`);
        }
    });

    if (errors.length > 0) {
        console.error('Project structure validation failed:\n' + errors.join('\n'));
        process.exit(1);
    } else {
        console.log('✅ Project structure is valid.');
    }
}

validateProjectStructure();
