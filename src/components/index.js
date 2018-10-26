import Vue from 'vue'
import CityFilter from './CityFilter.vue'

const Components = {
	CityFilter
}

Object.keys(Components).forEach(name => {
	Vue.component(name, Components[name])
})

export default Components