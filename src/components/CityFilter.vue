<template lang="pug">
#container
	div(v-if="state")
		treeselect(	v-model="selectedStates"
					:multiple="true"
					:options="state"
					:limit="config.limit"
					:limitText="config.limitText"
					:clearAllText="config.clearAllText"
					:placeholder="config.placeholder"
					:noResultsText="config.noResultsText"
					:noOptionsText="config.noOptionsText")
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'

export default {

	name: 'CityFilter',
	components: { Treeselect },
	props: {
		config: {
			type: Object
		}
	},
	data() {

		return {
			selectedStates: [this.config.idAll],
			state: []
		}

	},
	beforeCreate() {
		
		if(!Vue.axios) {
			Vue.use(VueAxios, axios)
		}

		Vue.axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

	},
	mounted() {

		this.setStyle()

	},
	created() {

		this.populateState()

	},
	methods: {
		populateState() {

			let that = this
			Vue.axios.get(this.config.urlGet).then(data => {

				let result = that.config.propertyData ? data.data[that.config.propertyData] : data.data

				that.state = [
					{
						id: that.config.idAll,
						label: that.config.labelAllSelected,
						children: result
							.map(city => {

								return {
									id: city[that.config.propertyCityCode],
									label: city[that.config.propertyCityName]
								}

							})
					}
				]

				if(!that.state[0].children) {

					that.state = []

				}

				this.$emit('selectedStates', this.selectedStates)

			}).catch(error => {

				that.config.callBackErrorRequest(error)

			})

		},
		setStyle() {

			this.$el.style.setProperty('--color', this.config.color ? this.config.color : '#000')
			this.$el.style.setProperty('--color-border', this.config.colorBorder ? this.config.colorBorder : '#000')
			this.$el.style.setProperty('--background', this.config.background ? this.config.background : '#ededee')
			this.$el.style.setProperty('--font-size-placeholder', this.config.fontSizePlaceHolder ? this.config.fontSizePlaceHolder : 'initial')
			this.$el.style.setProperty('--input-height', this.config.inputHeight ? this.config.inputHeight : 'initial')
			this.$el.style.setProperty('--font-weight', this.config.fontWeight ? this.config.fontWeight : 'initial')
			this.$el.style.setProperty('--input-text-padding-top', this.config.inputTextPaddingTop ? this.config.inputTextPaddingTop : 'initial')

		}

	},

	watch: {

		selectedStates() {

			this.$emit('selectedStates', this.selectedStates)

		}

	}

}
</script>

<style lang="sass">
#container
	.vue-treeselect__multi-value-item, .vue-treeselect__value-remove
		color: var(--color)
		background: var(--background)
	.vue-treeselect__control
		height: var(--input-height)
		padding-top: var(--input-text-padding-top)
		font-size: var(--font-size-placeholder)
		font-weight: var(--font-weight)
		border: 1px solid var(--color-border)
	.el-submenu__title
		border-bottom: 1px solid var(--color-border)
	.vue-treeselect__checkbox--checked, .vue-treeselect__checkbox--indeterminate, .vue-treeselect__label-container:hover .vue-treeselect__checkbox--checked, .vue-treeselect__label-container:hover .vue-treeselect__checkbox--indeterminate
		background: var(--color)
		border-color: var(--color)
	.vue-treeselect__label-container:hover .vue-treeselect__checkbox--unchecked
		border-color: var(--color)
</style>
