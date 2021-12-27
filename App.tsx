import React from 'react'
import { StyleSheet, View, Button } from 'react-native'
import * as WebBrowser from 'expo-web-browser'
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session'
import axios from 'axios'
import { oauth } from './config/oauth'

export default function App() {
  WebBrowser.maybeCompleteAuthSession()

  const { config: githubConfig, discovery: githubDiscovery } = oauth.github
  githubConfig.redirectUri = makeRedirectUri()

  const [githubRequest, githubResponse, promptGithubAsync] = useAuthRequest(
    githubConfig,
    githubDiscovery,
  )

  async function getAccessToken(code: string) {
    // Usa esse código na API, não aqui
    // A requisição deve ser realizada no backend
    const token = await axios.post(
      githubDiscovery.tokenEndpoint,
      {},
      {
        params: {
          code,
          client_id: githubConfig.clientId,
          client_secret: githubConfig.clientSecret,
        },
      },
    )
    console.log(token.data)
  }

  async function handleGithubResponse() {
    if (githubResponse?.type === 'success') {
      const { code } = githubResponse.params
      console.log(code)
      console.log(githubResponse)
      await getAccessToken(code)
    } else {
      console.log(githubResponse)
    }
  }

  React.useEffect(() => {
    handleGithubResponse()
  }, [githubResponse])

  return (
    <View style={styles.container}>
      <Button
        disabled={!githubRequest}
        title='Login'
        onPress={() => {
          promptGithubAsync()
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
