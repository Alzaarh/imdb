const fs = require('fs');

exports.readFile = fileName => {
    return new Promise((resolve, reject) => {
        fs.readFile(fileName, 'utf-8', (err, data) => {
            if (err) {
                reject(err);
            }
            resolve(data);
        });
    });
};

exports.writeFile = (fileName, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(fileName, data, err => {
            if (err) {
                reject(err);
            }
            resolve();
        });
    });
};