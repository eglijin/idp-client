const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const jwt = require('jsonwebtoken');
global.fetch = require('node-fetch');

const oldPool = new AmazonCognitoIdentity.CognitoUserPool({
    UserPoolId: "us-west-2_tmDH3PfHi", // Your user pool id here
    ClientId: "fl4ic0oremjscmpsb3tn855s6" // Your client id here
});

const newPool = new AmazonCognitoIdentity.CognitoUserPool({
    UserPoolId: "us-west-2_c5oce7KPk", // Your user pool id here
    ClientId: "7bmcttn4hao13nfesuhpfg21sn" // Your client id here
});

const Login = async (username, password) => new Promise((resolve, reject) => {
    let cognitoUser = new AmazonCognitoIdentity.CognitoUser({
        Username: username,
        Pool: newPool
    });
    let authentication = new AmazonCognitoIdentity.AuthenticationDetails({
        Username: username,
        Password: password,
    });
    cognitoUser.authenticateUser(authentication, {
        onSuccess: (result) =>
            resolve(jwt.decode(result.getIdToken().getJwtToken(), {complete: true}).payload),
        onFailure: (err) => reject(err),
    });
});

const forgotPassword = async (email) => new Promise((resolve, reject) => {
    let cognitoUser = new AmazonCognitoIdentity.CognitoUser({
        Username: email,
        Pool: newPool
    });
    cognitoUser.forgotPassword(
        {
            onSuccess: (result) => resolve(result),
            onFailure: (err) => reject(err),
        }
    );
});

Login("vasile.glijin@agilepartners.eu", "TheStronggestPa55word")
    // forgotPassword("vasile.glijin@agilepartners.eu")
    .then(console.log)
    .catch((e) => console.error(e.message))

