const fs = require('fs');
const filename = 'file1.txt';

try {
    const data = fs.readFileSync(filename, 'utf8');
    console.log(`${data}`);
} catch (err) {
    console.error(`Error reading file "${filename}":`, err.message);
}

