const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
global.fetch = require('node-fetch');

const oldPool = new AmazonCognitoIdentity.CognitoUserPool({
    UserPoolId: "us-west-2_tmDH3PfHi", // Your user pool id here
    ClientId: "fl4ic0oremjscmpsb3tn855s6" // Your client id here
});

const newPool = new AmazonCognitoIdentity.CognitoUserPool({
    UserPoolId: "us-west-2_ExkFYEw38", // Your user pool id here
    ClientId: "6if3fk9n3okoq4963a4lobl6o" // Your client id here
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

const ResetPassword = async (username, code, password) => fetch("https://cognito-idp.us-west-2.amazonaws.com/", {
    "headers": {
        'Content-Type': 'application/x-amz-json-1.1',
        'Accept': '*/*',
        'Accept-Language': 'en-us',
        'Accept-Encoding': 'gzip, deflate, br',
        'Cache-Control': 'max-age=0',
        'Host': 'cognito-idp.us-west-2.amazonaws.com',
        'Origin': 'https://corporate.test.iaecsp.org',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Safari/605.1.15',
        'Referer': 'https://corporate.test.iaecsp.org/',
        'Content-Length': '196',
        'Connection': 'keep-alive',
        'X-Amz-User-Agent': 'aws-amplify/0.1.x js',
        'X-Amz-Target': 'AWSCognitoIdentityProviderService.ConfirmForgotPassword',
    },
    "referrer": "https://corporate.demo.iaecsp.org/",
    "referrerPolicy": "strict-origin-when-cross-origin",
    "method": "POST",
    "mode": "cors",
    "body": `{
        "ClientId": "7bmcttn4hao13nfesuhpfg21sn",
        "Username": "${username}",
        "ConfirmationCode": "${code}",
        "Password": "${password}",
        "ClientMetadata": {"myCustomKey": "myCustomValue"}
    }`,
});

const confirmPassword = async (username, code, password) => {
    return new Promise<any>((resolve, reject) => {
        new AmazonCognitoIdentity.CognitoUser({
            Username: username,
            Pool: newPool
        }).confirmPassword(code, password, {
            onSuccess: () => resolve(true),
            onFailure: (err) => reject(err)
        });
    });
}

const forgotPassword = async (email): Promise<any> => {
    return new Promise((resolve, reject) => {
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
}

// Login(
//     "",
//     ""
// )
// confirmPassword("vasile.glijin@agilepartners.eu", '332489', "fycqup-tAgkab-qonce0")
forgotPassword('vasile.glijin@agilepartners.eu')
    .then(res => res.json())
    // .then(json => jwt.decode(json.AuthenticationResult.IdToken, {complete: true}).payload)
    .then(console.log)
    .catch((e) => console.error(e.message))
