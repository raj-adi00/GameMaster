import conf from "../Conf/conf";
import { Client, Databases, ID, Storage, Query } from "appwrite";
import authentication from "./auth";

class Service {
    client = new Client()
    databases;
    bucket;
    constructor() {
        this.client
            .setEndpoint(conf.appwriteURL)
            .setProject(conf.appwriteProjectId)
        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client)
    }
    async createProfile({ email, name, userid, profilephoto, rating = 0, level }) {
        try {
            // console.log(email)
            const session = await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                ID.unique(),
                {
                    userid,
                    profilephoto,
                    rating,
                    level,
                    name,
                    email,
                }
            )
            return session
        } catch (err) {
            console.log("error at createProfile", err)
        }
    }

    async updateProfile(id, { email, name, profilephoto, rating, level }) {
        try {
            // console.log(userid);
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                id,
                {
                    profilephoto,
                    rating,
                    level,
                    name,
                    email,
                }
            );
        } catch (err) {
            console.log("error at updateProfile", err)
        }
    }

    async getProfile(userid) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                [
                    Query.equal("email", userid)
                ]
            )
        } catch (err) {
            console.log("error at getProfile", err);
            return false;
        }
    }

    async getProfiles(queries = [Query.orderDesc("rating")]) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            )
        } catch (err) {
            console.log("error at getprofiles", err);
            return false;
        }
    }
    async getCurrentUserData(email) {
        try {
            const data = await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                [Query.equal('email', [email])]
            )
            return data.documents[0];
        } catch (err) {
            console.log("error at getCurrentUserData", err);
            return false;
        }
    }
    async uploadimage(file) {
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (err) {
            console.log("error at uploadimages", err);
            return false;
        }
    }

    async deleteimage(imageid) {
        try {
            return await this.bucket.deleteFile(
                conf.appwriteBucketId,
                imageid
            )
        } catch (err) {
            console.log("error at deleteimage", err)
            return false;
        }
    }

    getfilePreview(imageid) {
        console.log(imageid)
        const link = this.bucket.getFilePreview(
            conf.appwriteBucketId,
            imageid
        )
        return link;
    }
}

const service = new Service();
export default service;