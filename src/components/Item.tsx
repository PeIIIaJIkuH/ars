import {observer} from 'mobx-react-lite'
import React, {FC} from 'react'
import {IBox, IContainer, TItem} from '../types'
import {Box} from './Box/Box'
import {Container} from './Container/Container'

interface Props {
	item: TItem
}

export const Item: FC<Props> = observer(({item}) => {
	const options = {
		box: <Box box={item as IBox}/>,
		container: <Container container={item as IContainer}/>
	}

	return options[item.type]
})
