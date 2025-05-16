const fs = require('fs');
const filename = 'file1.txt';

try {
    fs.appendFileSync(filename, '\nThis is an append operation\n');
    console.log(`Data appended to file "${filename}" successfully.`);
} catch (err) {
    console.error(`Error appending to file "${filename}":`, err.message);
}
