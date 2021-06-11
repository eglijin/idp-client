global.fetch = require('node-fetch');
const jwt = require('jsonwebtoken');

const login = async (username, password) =>
fetch("https://cognito-idp.us-west-2.amazonaws.com/", {
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
    "body": `{"AuthFlow":"USER_PASSWORD_AUTH","ClientId":"fl4ic0oremjscmpsb3tn855s6","AuthParameters":{"USERNAME":"${username}","PASSWORD":"${password}"}}`,
    "method": "POST",
    "mode": "cors"
});

login('vasile.glijin@agilepartners.eu', 'fycqup-tAgkab-qonce0')
    .then(res => res.json())
    .then(json => jwt.decode(json.AuthenticationResult.IdToken, {complete: true}).payload)
    .then(token => console.log(token))
    .catch(e => console.log(e));