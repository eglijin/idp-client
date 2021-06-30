const { Amplify } = require("aws-amplify");
const login = async (username, password) => {
    Amplify.configure({
        Auth: {
            region: "us-west-2",
            mandatorySignIn: false,
            authenticationFlowType: "USER_PASSWORD_AUTH",
            clientMetadata: { myCustomKey: "myCustomValue" },
            oauth: {
                scope: [
                    "phone",
                    "email",
                    "profile",
                    "openid",
                    "aws.cognito.signin.user.admin",
                ],
                redirectSignIn: "http://localhost:3000/",
                redirectSignOut: "http://localhost:3000/",
                responseType: "code",
                userPoolId: "us-west-2_c5oce7KPk",
                userPoolWebClientId: "7bmcttn4hao13nfesuhpfg21sn"
            },
        },
    });
    return await Amplify.Auth.signIn(username, password);
};
login("", "")
    .then(console.log) // prints out the logged user if successfully logged in
    .catch((e) => console.error(e.message));
//# sourceMappingURL=amplify.js.map