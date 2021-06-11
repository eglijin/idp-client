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

const Login = async (username, password) => fetch("https://cognito-idp.us-west-2.amazonaws.com/", {
    "headers": {
        "accept": "*/*",
        "accept-language": "en-US,en;q=0.9,ro;q=0.8,ru;q=0.7",
        "cache-control": "max-age=0",
        "content-type": "application/x-amz-json-1.1",
        "sec-ch-ua": "\"Google Chrome\";v=\"89\", \"Chromium\";v=\"89\", \";Not A Brand\";v=\"99\"",
        "sec-ch-ua-mobile": "?0",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "cross-site",
        "x-amz-target": "AWSCognitoIdentityProviderService.InitiateAuth",
        "x-amz-user-agent": "aws-amplify/0.1.x js"
    },
    "referrer": "https://corporate.demo.iaecsp.org/",
    "referrerPolicy": "strict-origin-when-cross-origin",
    "body": `{"AuthFlow":"USER_PASSWORD_AUTH","ClientId":"7bmcttn4hao13nfesuhpfg21sn","AuthParameters":{"USERNAME":"${username}","PASSWORD":"${password}"}}`,
    "method": "POST",
    "mode": "cors"
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

Login(
    "",
    ""
)
    // forgotPassword("vasile.glijin@agilepartners.eu")
    .then(res => res.json())
    // .then(json => jwt.decode(json.AuthenticationResult.IdToken, {complete: true}).payload)
    .then(console.log)
    .catch((e) => console.error(e.message))
