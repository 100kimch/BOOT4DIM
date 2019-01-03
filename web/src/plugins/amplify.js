import * as AmplifyModules from 'aws-amplify'
// import Amplify, * as AmplifyModules from 'aws-amplify'
import { AmplifyPlugin, components } from 'aws-amplify-vue'
// import aws_exports from './aws-exports'
// Amplify.configure(aws_exports)

export default ({ app, router, Vue }) => {
  Vue.use(AmplifyPlugin, AmplifyModules)
  Vue.component('components', components)
}
