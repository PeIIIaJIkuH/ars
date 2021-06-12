import {makeAutoObservable, toJS} from 'mobx'
import {IBox, IContainer} from './types'
import {BOX, COLOR, CONTAINER} from './utils/constants'

class Store {
	id: number = 0
	container: IContainer = {
		type: CONTAINER,
		id: this.id++,
		items: []
	}

	constructor() {
		makeAutoObservable(this)
	}

	addBox(container: IContainer, color: string) {
		container.items.push({
			type: BOX,
			id: this.id++,
			color
		})
		// console.log(JSON.stringify(toJS(this.container)))
	}

	deleteBox(id: number) {
		this.deleteBoxHelper(this.container, id)
	}

	deleteBoxHelper(container: IContainer, id: number) {
		for (let i = 0; i < container.items.length; i++) {
			const item = container.items[i]
			if (item.type === BOX && item.id === id) {
				container.items.splice(i, 1)
				return true
			} else if (item.type === CONTAINER) {
				if (this.deleteBoxHelper(item, id)) {
					return true
				}
			}
		}
	}

	setBoxColor(box: IBox, color: string = COLOR) {
		box.color = color
	}

	addContainer(container: IContainer) {
		container.items.push({
			type: CONTAINER,
			id: this.id++,
			items: []
		})
	}

	deleteContainer(id: number) {
		this.deleteContainerHelper(this.container, id)
	}

	deleteContainerHelper(container: IContainer, id: number) {
		for (let i = 0; i < container.items.length; i++) {
			const item = container.items[i]
			if (item.type === CONTAINER && item.id === id) {
				container.items.splice(i, 1)
				return true
			} else if (item.type === CONTAINER) {
				if (this.deleteContainerHelper(item, id)) {
					return true
				}
			}
		}
	}

	toJSON() {
		return JSON.parse(JSON.stringify(toJS(this.container)), (prop, value) => prop === 'id' ? undefined : value)
	}

	fromJSON(json: string) {
		let id = 0
		const data = JSON.parse(json, function (prop, value) {
			const obj = this
			if (prop === 'type') {
				obj.id = id++
				if (value === BOX && !obj.color) {
					obj.color = COLOR
				}
			}
			return value
		})
		this.id = id
		this.container = data
	}
}

export default new Store()
