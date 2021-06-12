import {observer} from 'mobx-react-lite'
import React, {FC} from 'react'
import closeImg from '../../assets/img/close.svg'
import store from '../../store'
import {IContainer} from '../../types'
import {AddItem} from '../AddItem/AddItem'
import {Item} from '../Item'
import s from './Container.module.css'

interface Props {
	container: IContainer
}

export const Container: FC<Props> = observer(({container}) => {
	const deleteContainer = () => {
		store.deleteContainer(container.id)
	}

	return (
		<div className={s.container}>
			{container.items.map(item => (
				<Item item={item} key={item.id}/>
			))}
			<AddItem container={container as IContainer}/>
			{container.id !== 0 && (
				<button className={s.close} onClick={deleteContainer}>
					<img src={closeImg} alt='close'/>
				</button>
			)}
		</div>
	)
})
