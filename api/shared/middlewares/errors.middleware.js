import { FileError } from '../../modules/media/classes/FileError.js';
import { MAX_FILE_SIZE } from '../../modules/media/constants/images.constants.js';

const errorByCode = {
    INVALID_FILE_TYPE: {
        status: 400,
        message: `The provided file type isn't supported. These are the file types supported: image/jpeg, image/jpg, image/png.`
    },
    MAX_SIZE_EXCEDED: {
        status: 400,
        message: `The provided file exceed the file limit size: ${MAX_FILE_SIZE / (1024 * 1024)} MB.`
    }
}

export function errorsMiddleware(err, _req, res, next) {
    if (res.headersSent) return next();

    if (err instanceof FileError && err.fileError) {
        const { code } = err.fileError;
        const errorObject = errorByCode[code] ?? { status: 500, message: 'Error handling a file error.' };

        res.status(errorObject.status).json({
            ...errorObject
        });

        return;
    }

    next();
}
