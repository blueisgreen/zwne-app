import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    username: null,
    email: null,
    emailVerified: false,
    accountId: null,
    signInUserSession: null,
    awsUser: null,
    awsSession: null,
  }),
  getters: {
    accessToken: (state) => state.signInUserSession?.accessToken,
    refreshToken: (state) => state.signInUserSession?.refreshToken,
    isSignedIn: (state) => !!state.accessToken,
  },
  actions: {
    cacheUser(awsUser) {
      this.awsUser = awsUser
      const { username, attributes, signInUserSession } = awsUser
      this.username = username
      this.email = attributes.email
      this.email_verified = attributes.email_verified
      this.accountId = attributes.sub
      this.signInUserSession = signInUserSession
    },
    cacheSession(session) {
      this.awsSession = session
    },
    signOut() {
      this.$reset()
    },
  },
})
