const fs = require('fs');
const path = require('path');

notePath = path.resolve(__dirname, 'note.txt');

const fileReadCallback = (error, data) => {
    if(error) {
        console.log('Gagal membaca berkas');
        return;
    }
    console.log(data);
};

fs.readFile(notePath, 'UTF-8', fileReadCallback);