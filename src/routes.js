import Base from './views/Base/Base.vue'
import About from './components/About/About.vue'

export default [
  { path: '', component: Base },
  { path: '/about', component: About },
  { path: '*', component: Base }
]
