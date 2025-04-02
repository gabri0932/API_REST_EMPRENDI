import {
    getStorageClient,
    SUPABASE_AVATARS_FOLDER,
    SUPABASE_COVERS_FOLDER
} from '../../../app/databases/supabase.db.js';

export class MediaModel {
    static async saveImage({ path, file, fileType }) {
        const client = await getStorageClient();
        const path = `${SUPABASE_AVATARS_FOLDER}/${fileName}`;

        const { data, error } = await client.upload(
            path,
            file,
            { contentType: fileType }
        );

        if (error || !data) return {
            success: false,
            error: {
                status: 500
            }
        }

        return {
            success: true,
            data
        }
    }

    static async saveAvatarImage({ fileName, file, fileType }) {
        try {
            const path = `${SUPABASE_AVATARS_FOLDER}/${fileName}`;

            const result = await this.saveImage({
                path,
                file,
                fileType
            });

            return result;
        } catch (error) {
            if (error instanceof Error) {
                console.log('Error in MediaModel.saveAvatarImage():\n');
                console.dir(error, { depth: null });

                return {
                    success: false,
                    error: {
                        status: 500
                    }
                }
            }
        }
    }

    static async saveCoverImage({ fileName, file, fileType }) {
        try {
            const path = `${SUPABASE_COVERS_FOLDER}/${fileName}`;

            const result = await this.saveImage({
                path,
                file,
                fileType
            });

            return result;
        } catch (error) {
            if (error instanceof Error) {
                console.log('Error in MediaModel.saveCoverImage():\n');
                console.dir(error, { depth: null });

                return {
                    success: false,
                    error: {
                        status: 500
                    }
                }
            }
        }
    }

    static async getImage({ path }) {
        try {
            const client = await getStorageClient();

            const { error, data } = await client.download(path);

            if (error || !data) return {
                success: false,
                error: {
                    status: 500
                }
            }

            return {
                success: true,
                data
            }
        } catch (error) {
            if (error instanceof Error) {
                console.log('Error in MediaModel.getImage():\n');
                console.dir(error, { depth: null });

                return {
                    success: false,
                    error: {
                        status: 500
                    }
                }
            }
        }
    }

    static async deleteImage({ path }) {
        try {
            const client = await getStorageClient();

            const { error } = await client.remove([ path ]);

            if (error) return {
                success: false,
                error: {
                    status: 500
                }
            }

            return {
                success: true,
                data: null
            }
        } catch (error) {
            if (error instanceof Error) {
                console.log('Error in MediaModel.deleteImage():\n');
                console.dir(error, { depth: null });

                return {
                    success: false,
                    error: {
                        status: 500
                    }
                }
            }
        }
    }
}
