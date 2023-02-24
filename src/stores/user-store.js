import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    trackingId: null, // someday set a cookie and track, even anonymously
    username: null,
    alias: null,
    email: null,
    email_verified: false,
    accountId: null,
    accessToken: null,
  }),
  getters: {
    signedIn: (state) => !!state.accessToken,
  },
  actions: {
    onUserSignIn(user) {
      this.username = user.username
      this.alias = user.attributes.nickname
      this.email = user.attributes.email
      this.email_verified = user.attributes.email_verified
      this.accountId = user.attributes.sub
      this.accessToken = user.signInUserSession.accessToken
    },
    onUserSignOut() {
      this.$reset()
    },
    trackUser(trackingId) {
      this.trackingId = trackingId
    }
  },
})
