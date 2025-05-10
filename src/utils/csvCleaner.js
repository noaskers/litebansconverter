const fs = require('fs');
const csv = require('csv-parser');

const cleanCsv = (filePath) => {
    return new Promise((resolve, reject) => {
        const cleanedData = [];
        
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (row) => {
                // Example cleaning logic: filter out rows with empty 'action' field
                if (row.action) {
                    cleanedData.push(row);
                }
            })
            .on('end', () => {
                resolve(cleanedData);
            })
            .on('error', (error) => {
                reject(error);
            });
    });
};

module.exports = cleanCsv;