const fs = require('fs');
const filename = 'file1.txt';

try {
    if (fs.existsSync(filename)) {
        fs.unlinkSync(filename);
        console.log(`File "${filename}" deleted successfully.`);
    } else {
        console.error(`Error: File "${filename}" does not exist.`);
    }
} catch (err) {
    console.error(`Error deleting file "${filename}":`, err.message);
}
