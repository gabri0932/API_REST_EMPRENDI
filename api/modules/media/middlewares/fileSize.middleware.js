import { MAX_FILE_SIZE } from '../constants/images.constants.js';

export function fileSizeMiddleware(req, _res, next) {
    if (req.file && req.file.size > MAX_FILE_SIZE) return next(new Error({
        fileErrorType: 'MAX_SIZE_EXCEDED'
    }));

    next();
}
