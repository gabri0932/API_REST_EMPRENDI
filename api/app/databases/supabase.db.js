import { StorageClient } from '@supabase/storage-js';
import { env } from 'process';
import 'dotenv/config';

const SUPABASE_URL = env.SUPABASE_URL;
const SUPABASE_SECRET = env.SUPABASE_SECRET;
const SUPABASE_BUCKET = env.SUPABASE_BUCKET;
export const SUPABASE_AVATARS_FOLDER = env.SUPABASE_AVATARS_FOLDER;
export const SUPABASE_COVERS_FOLDER = env.SUPABASE_COVERS_FOLDER;

let client = null;

export async function getStorageClient() {
    if (!client) {
        client = new StorageClient(SUPABASE_URL, {
            apiKey: SUPABASE_SECRET,
            Authorization: `Bearer ${SUPABASE_SECRET}`
        });
    }

    return client.from(SUPABASE_BUCKET);
}
