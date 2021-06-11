import {ListUsersResponse} from "aws-sdk/clients/cognitoidentityserviceprovider";

const AWS = require("aws-sdk")
const idp = new AWS.CognitoIdentityServiceProvider({
    // apiVersion: '2016-04-18',
    region: "us-west-2",
});

const fetchUser = (email): Promise<ListUsersResponse> => new Promise((resolve, reject) => {
    idp.listUsers({
        UserPoolId: "us-west-2_tmDH3PfHi", /* required */
        AttributesToGet: ["email", "email_verified", "phone_number", "custom:iamUserId", "sub"],
        Filter: `email="${email}"`,
        Limit: 0
    }, (err, data) => {
        if (err) reject(err)
        else if (data.Users.length === 0) reject(new Error("USER_NOT_FOUND"));
        resolve(data.Users[0])
    });
});

const adminGetUser = async (email) => new Promise((resolve, reject) => {
    let params = {
        UserPoolId: "us-west-2_tmDH3PfHi",
        Username: email
    }
    idp.adminGetUser(params, (err, data) => {
        if (err) reject(err)
        resolve(data.UserAttributes.reduce((acc, pair) => {
            acc[pair.Name] = pair.Value;
            return acc;
        }, {}))
    });
})

const adminGetGroups = async (email) => new Promise(((resolve, reject) => {
    let params = {
        UserPoolId: "us-west-2_tmDH3PfHi",
        Username: email
    }
    idp.adminListGroupsForUser(
        params,
        (err, data) => {
            if (err) reject(err)
            resolve(data.Groups.map(group => group.GroupName))
        })
}))

const getUser = async (email) => {
    return {
        user: await adminGetUser(email),
        groups: await adminGetGroups(email)
    }
};

getUser("vasile.glijin@agilepartners.eu")
    .then(console.log)
    .catch((e) => console.error(e.message));