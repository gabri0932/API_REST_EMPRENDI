import multer from 'multer';
import { FIELD_NAME } from '../constants/images.constants.js';

const fileFilter = (_req, file, callback) => {
    const allowedTypes = /jpeg|jpg|png/;
    const isValidType = allowedTypes.test(file.mimetype);

    if (!isValidType) {
        callback(new Error({ fileErrorType: 'INVALID_TYPE' }));
    }

    callback(null, true);
}

const storage = multer.memoryStorage();

const upload = multer({
    storage,
    fileFilter
}).single(FIELD_NAME);

export default upload;
