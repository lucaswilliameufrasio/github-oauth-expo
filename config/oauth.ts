import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } from 'react-native-dotenv'

export const oauth = {
  github: {
    config: {
      clientId: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      scopes: ["identity"],
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
