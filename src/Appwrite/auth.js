import conf from '../Conf/conf'
import { Client, Account, ID } from 'appwrite'
export class Authentication {
    client = new Client();
    account
    constructor() {
        this.client
            .setEndpoint(conf.appwriteURL)
            .setProject(conf.appwriteProjectId)
        this.account = new Account(this.client)
    }
    async signup({ email, password, name, userid, profilephoto, rating, level }) {
        try {
            const session = await this.account.create(ID.unique(), email, password, name, userid, profilephoto, rating, level)
            if (session) {
                return this.login({ email, password })
            }
            else {
                return session;
            }
        } catch (error) {
            console.log("error at signup", error);
        }
    }

    async login({ email, password }) {
        try {
        return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            // console.log(email)
            // console.log(conf.appwriteURL)
            console.log("error at login", error);
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (err) {
            console.log("error at getCurrentUser", err)
        }
    }

    async logout() {
        this.account.deleteSessions()
            .then((res) => {
                return res;
            })
            .catch((err) => {
                console.log("error at logout", err)
            })
    }
}

const authentication=new Authentication();
export default authentication;