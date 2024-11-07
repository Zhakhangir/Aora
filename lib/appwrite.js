import { Client, Account, Avatars, Databases, Query } from 'react-native-appwrite';
import { ID } from 'react-native-appwrite';

export const config = {
    endpoint: "https://cloud.appwrite.io/v1",
    platform: "com.tairov.aora.rn",
    projectId: "6726ad03000fcf609db2",
    databaseId: "6726b2fc002cf153c72f",
    usersCollectionId: "6726b35e002767022e6b",
    videoCollectionId: "672c27790010d541baef",
    storageId: "6726b5b70007bc4d2697"
}


const {
    endpoint,
    platform,
    projectId,
    databaseId,
    usersCollectionId,
    videoCollectionId,
    storageId
} = config
// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(config.endpoint)
    .setProject(config.projectId)
    .setPlatform(config.platform)

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const createUser = async (email, password, username) => {
    try {
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username
        )

        if (!newAccount) throw Error('Missing account');

        const avatarURLs = avatars.getInitials(username)
        await signIn(email, password)
        const newUser = databases.createDocument(
            config.databaseId,
            config.usersCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email,
                username,
                avatar: avatarURLs
            })

        return newUser
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}

export const signIn = async (email, password) => {
    try {
        const session = await account.createEmailPasswordSession(email, password)
        return session
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}

export const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get()
        if (!currentAccount) throw new Error('Account not find')
        const currentUser = databases.listDocuments(
            config.databaseId,
            config.usersCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        )
        if (!currentUser) throw new Error('User not find')

        return (await currentUser).documents[0]

    } catch (error) {
        console.log(error)
    }
}

export const getAllPosts = async () => {
    try {
        const posts = await databases.listDocuments(
            config.databaseId,
            config.videoCollectionId
        )

        return posts.documents
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const getLatestPosts = async () => {
    try {
        const posts = await databases.listDocuments(
            config.databaseId,
            config.videoCollectionId
        )

        return posts.documents
    } catch (error) {
        console.log(error)
        throw error
    }
} 