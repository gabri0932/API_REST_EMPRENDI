export class FileError extends Error {
    constructor(message, fileError) {
        super(message);
        this.fileError = fileError;
    }
}
