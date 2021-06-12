import {observer} from 'mobx-react-lite'
import React, {FC} from 'react'
import {Item} from './components/Item'
import store from './store'

export const App: FC = observer(() => {
	return <>
		<Item item={store.container}/>
		<button onClick={() => {
			store.fromJSON('{"type":"container","id":0,"items":[{"type":"box","id":1},{"type":"container","id":2,"items":[{"type":"box","id":3,"color":"#83A255"},{"type":"box","id":4,"color":"#1954E1"}]}]}')
		}
		}>TEST
		</button>
	</>
})
