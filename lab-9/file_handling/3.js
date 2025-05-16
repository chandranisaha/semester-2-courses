const fs = require('fs');
const filename = 'file1.txt';

try {
    fs.writeFileSync(filename, 'This is a write operation');
    console.log(`File "${filename}" created and written successfully.`);
} catch (err) {
    console.error(`Error writing to file "${filename}":`, err.message);
}
