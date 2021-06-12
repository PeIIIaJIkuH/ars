import React, {FC} from 'react'
import boxImg from '../../assets/img/box.svg'
import containerImg from '../../assets/img/container.svg'
import store from '../../store'
import {IContainer} from '../../types'
import {generateRandomHex} from '../../utils/generateRandomHex'
import s from './AddItem.module.css'

interface Props {
	container: IContainer
}

export const AddItem: FC<Props> = ({container}) => {
	const addBox = () => {
		store.addBox(container, generateRandomHex())
	}

	const addContainer = () => {
		store.addContainer(container)
	}

	return (
		<div className={s.wrapper}>
			<div className={s.add}>
				Add
				<div className={s.options}>
					<button className={s.btn} onClick={addBox}>
						<img src={boxImg} alt='box'/>
					</button>
					<button className={s.btn} onClick={addContainer}>
						<img src={containerImg} alt='container'/>
					</button>
				</div>
			</div>
		</div>
	)
}
