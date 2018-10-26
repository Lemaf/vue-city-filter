<template lang="pug">
#app
	city-filter(v-on:selectedStates="setSelectedStates", :config="configCityFilter")

</template>

<script>
import CityFilter from './components/CityFilter.vue'

export default {

	name: 'app',

	components: {

		CityFilter

	},
	data() {

		return {
			configCityFilter:{
				limit: 3,
				limitText: count => `and ${count} more`,
				clearAllText: 'Clear all',
				placeholder: 'Select...',
				noOptionsText: 'No options available.',
				noResultsText: 'No results found...',
				labelAllSelected: 'All/PA',
				color: '#2B4150',
				colorBorder: '#E0E0E0',
				background: '#ededee',
				fontSizePlaceHolder: '14px',
				inputHeight: '40px',
				fontWeight: 400,
				inputTextPaddingTop: '2px',
				urlGet: 'http://www.geonames.org/childrenJSON?geonameId=3393129',
				propertyData: 'geonames',
				propertyCityCode: 'geonameId',
				propertyCityName: 'name',
				idAll: 0,
				callBackErrorRequest: this.callBackErrorRequest
			}

		}

	},
	methods: {

		callBackErrorRequest(error) {

			// eslint-disable-next-line
			console.log(error.message)

		},
		setSelectedStates(data) {

			// eslint-disable-next-line
			console.log(data)

		}

	}

}
</script>