import {
    getStorageClient,
    SUPABASE_AVATARS_FOLDER,
    SUPABASE_COVERS_FOLDER
} from '../../../app/databases/supabase.db.js';

export class MediaModel {
    static async saveAvatarImage({ fileName, fileType, file }) {
        try {
            const client = await getStorageClient();

            const { data, error } = await client.upload(
                `${SUPABASE_AVATARS_FOLDER}/${fileName}`,
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

    static async saveCoverImage({ fileName, fileType, file }) {
        try {
            const client = await getStorageClient();

            const { data, error } = await client.upload(
                `${SUPABASE_COVERS_FOLDER}/${fileName}`,
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
}
