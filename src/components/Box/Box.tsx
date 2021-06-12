import {observer} from 'mobx-react-lite'
import React, {FC, MouseEventHandler, useRef, useState} from 'react'
import {ChromePicker, ColorChangeHandler} from 'react-color'
import {useOnClickOutside} from '../../hooks/useOnClickOutside'
import store from '../../store'
import {IBox} from '../../types'
import {invertColor} from '../../utils/invertHex'
import s from './Box.module.css'

interface Props {
	box: IBox
}

export const Box: FC<Props> = observer(({box}) => {
	const [isOpen, setIsOpen] = useState(false),
		boxRef = useRef<HTMLDivElement>(null),
		colorPickerRef = useRef<HTMLDivElement>(null)

	const deleteBox: MouseEventHandler = (e) => {
		e.stopPropagation()
		store.deleteBox(box.id)
	}

	const openColorPicker = () => {
		setIsOpen(true)
	}

	const saveColor: ColorChangeHandler = (color) => {
		store.setBoxColor(box, color.hex)
	}

	useOnClickOutside(boxRef, () => {
		setIsOpen(false)
	})

	return (
		<div className={s.box} style={{background: box.color}} onClick={openColorPicker} ref={boxRef}>
			{isOpen &&
			<div className={s.colorPicker} ref={colorPickerRef}>
				<ChromePicker color={box.color} onChange={saveColor} onChangeComplete={saveColor}
				              disableAlpha={true}/>
			</div>}
			<button className={s.delete} onClick={deleteBox}>
				<div className={s.first} style={{background: invertColor(box.color, true)}}/>
				<div className={s.second} style={{background: invertColor(box.color, true)}}/>
			</button>
		</div>
	)
})
