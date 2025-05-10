import multer from 'multer';
import csv from 'csv-parser';
import fs from 'fs';
import path from 'path';
import { cleanCsv } from '../utils/csvCleaner';

const upload = multer({ dest: 'uploads/' });

class FileController {
    uploadFile(req, res) {
        upload.single('csvFile')(req, res, (err) => {
            if (err) {
                return res.status(500).json({ message: 'File upload failed', error: err });
            }
            res.status(200).json({ message: 'File uploaded successfully', filePath: req.file.path });
        });
    }

    cleanCsv(req, res) {
        const filePath = req.body.filePath;

        const results = [];
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', () => {
                const cleanedData = cleanCsv(results);
                const cleanedFilePath = path.join('uploads', `cleaned_${path.basename(filePath)}`);
                fs.writeFileSync(cleanedFilePath, cleanedData);
                res.status(200).json({ message: 'CSV cleaned successfully', cleanedFilePath });
            })
            .on('error', (err) => {
                res.status(500).json({ message: 'Error processing CSV', error: err });
            });
    }
}

export default new FileController();