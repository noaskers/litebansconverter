import express from 'express';
import FileController from '../controllers/fileController';

const router = express.Router();
const fileController = new FileController();

const setRoutes = (app) => {
    router.post('/upload', fileController.uploadFile.bind(fileController));
    router.post('/clean', fileController.cleanCsv.bind(fileController));

    app.use('/api/files', router);
};

export default setRoutes;