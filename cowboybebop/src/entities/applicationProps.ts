export const ApplicationProps = {
    apiKeys: process.env.APPLICATION_APIKEYS ? process.env.APPLICATION_APIKEYS.split(';') : [],
    userIds: process.env.APPLICATION_USERIDS ? process.env.APPLICATION_USERIDS.split(';') : [],
    secretKey: process.env.APPLICATION_SECRET ? process.env.APPLICATION_SECRET : "7353a011-927d-4a2f-80cf-5ca2032ccb7d"
};