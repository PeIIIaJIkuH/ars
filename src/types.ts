export interface IBox {
	type: 'box'
	id: number
	color: string
}

export interface IContainer {
	type: 'container'
	id: number
	items: TItem[]
}

export type TItem = IBox | IContainer
