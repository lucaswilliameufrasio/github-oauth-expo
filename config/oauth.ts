export default {
  github: {
    config: {
      clientId: "356660bcfa4691481031",
      scopes: ["user"],
      // For usage in managed apps using the proxy
      redirectUri: "",
    },
    discovery: {
      authorizationEndpoint: "https://github.com/login/oauth/authorize",
      tokenEndpoint: "https://github.com/login/oauth/access_token",
      revocationEndpoint:
        "https://github.com/settings/connections/applications/356660bcfa4691481031",
    },
  },
};
