import { MAX_FILE_SIZE } from '../constants/images.constants.js';
import { FileError } from '../classes/FileError.js';

export function fileSizeMiddleware(req, _res, next) {
    if (req.file && req.file.size > MAX_FILE_SIZE) return next(new FileError(
        'Max file size exceded',
        { code: 'MAX_SIZE_EXCEDED' }
    ));

    next();
}
