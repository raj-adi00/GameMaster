
const conf = {
    appwriteProjectId: String(import.meta.env.VITE_PROJECT_ID),
    appwriteURL: String(import.meta.env.VITE_URL),
    appwriteDatabaseId: String(import.meta.env.VITE_DATABASE_ID),
    appwriteCollectionId: String(import.meta.env.VITE_COLLECTION_ID),
    appwriteBucketId: String(import.meta.env.VITE_BUCKET_ID)
}
export default conf;