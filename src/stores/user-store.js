import { defineStore } from 'pinia'
import jwt_decode from 'jwt-decode'

export const useUserStore = defineStore('user', {
  state: () => ({
    username: null,
    email: null,
    emailVerified: false,
    accountId: null,
    groups: [],
    signInUserSession: null,
    awsUser: null,
    awsSession: null,
  }),
  getters: {
    accessToken: (state) => state.signInUserSession?.accessToken,
    refreshToken: (state) => state.signInUserSession?.refreshToken,
    isSignedIn: (state) => !!state.accessToken,
    isMember: (state) => state.groups.includes('Members'),
    isEditor: (state) => state.groups.includes('Editors'),
    isAdmin: (state) => state.groups.includes('Admins'),
    isInGroup: (state) => {
      return (groupName) => {
        if (!state.groups) {
          return false
        }
        return state.groups.includes(groupName)
      }
    },
  },
  actions: {
    cacheUser(awsUser) {
      // get rid of any residue from previous sign in
      this.$reset()

      this.awsUser = awsUser
      const { username, attributes, signInUserSession } = awsUser
      this.username = username
      this.email = attributes.email
      this.emailVerified = attributes.email_verified
      this.accountId = attributes.sub
      this.signInUserSession = signInUserSession

      const { jwtToken } = this.signInUserSession?.idToken
      if (jwtToken) {
        const decoded = jwt_decode(jwtToken)
        console.log('jwt', decoded)
        this.groups = decoded['cognito:groups']
      }
    },
    cacheSession(session) {
      this.awsSession = session
    },
    signOut() {
      this.$reset()
    },
  },
})
