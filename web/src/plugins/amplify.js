// import * as AmplifyModules from 'aws-amplify'
import Amplify, * as AmplifyModules from 'aws-amplify'
import { AmplifyPlugin, components } from 'aws-amplify-vue'

import * as queries from '../graphql/queries.ts'
import * as mutations from '../graphql/mutations.ts'
import * as subscriptions from '../graphql/subscriptions.ts'

import awsExports from '../aws-exports'
Amplify.configure(awsExports)

export default ({ app, router, Vue }) => {
  Vue.use(AmplifyPlugin, AmplifyModules)
  Vue.component('components', components)

  Vue.prototype.$queries = queries
  Vue.prototype.$mutations = mutations
  Vue.prototype.$subscriptions = subscriptions
  Vue.prototype.$API = AmplifyModules.API
  Vue.prototype.$graphqlOperation = AmplifyModules.graphqlOperation
}
