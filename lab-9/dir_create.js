const fs = require('fs');

fs.mkdir('file_handling', { recursive: true }, (err) => {
    if (err) {
        console.error('Error creating directory:', err);
    } else {
        console.log('Directory created successfully.');
    }
});

