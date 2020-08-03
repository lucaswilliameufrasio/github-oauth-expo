import React from "react";
import { StyleSheet, View, Button } from "react-native";
import * as WebBrowser from "expo-web-browser";
import {
  makeRedirectUri,
  useAuthRequest,
  getRedirectUrl,
} from "expo-auth-session";
import axios from "axios";
import env from "./config/oauth";

export default function App() {
  WebBrowser.maybeCompleteAuthSession();
  const redirectTo = getRedirectUrl();

  const { config: githubConfig, discovery: githubDiscovery } = env.github;
  githubConfig.redirectUri = makeRedirectUri({
    native: redirectTo,
  });

  const [githubRequest, githubResponse, promptGithubAsync] = useAuthRequest(
    githubConfig,
    githubDiscovery
  );

  async function getAccessToken(code: string) {
    // Usa esse código na API, não aqui
    // A requisição deve ser realizada no backend
    const token = await axios.post(
      "https://github.com/login/oauth/access_token",
      {},
      {
        params: {
          code,
          client_id: "356660bcfa4691481031",
          client_secret: "",
        },
      }
    );
    console.log(token.data);
  }

  function handleGithubResponse() {
    if (githubResponse?.type === "success") {
      const { code } = githubResponse.params;
      console.log(code);
      console.log(githubResponse);
      getAccessToken(code);
    } else {
      console.log(githubResponse);
    }
  }

  React.useEffect(() => {
    handleGithubResponse();
  }, [githubResponse]);

  return (
    <View style={styles.container}>
      <Button
        disabled={!githubRequest}
        title="Login"
        onPress={() => {
          promptGithubAsync();
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
