import { useState, type ChangeEvent, type FC } from 'react'
import { useDispatch } from 'react-redux'
import { message, Input } from 'antd'
import classNames from 'classnames'
import { useGetComponentListInfo } from '@/hooks/useGetComponentListInfo'
import {
  changeSelected,
  changeComponentTitle,
} from '@/store/reducers/questionComponentsSlice'
import type { componentInfoType } from '@/store/reducers/questionComponentsSlice'
import styles from './Layers.module.scss'

const Layers: FC = () => {
  const { componentList, selectedId } = useGetComponentListInfo()
  const dispatch = useDispatch()
  const [changingTitleId, setChangingTitleId] = useState('')

  const handleTitleClick = (fe_id: string) => {
    const curComp = componentList.find(
      (c: componentInfoType) => c.fe_id === fe_id,
    )

    if (curComp && curComp.isHidden) {
      message.info('不能选中隐藏的组件')
      return
    }

    if (fe_id !== selectedId) {
      setChangingTitleId('')
      dispatch(changeSelected(fe_id))
      return
    }

    setChangingTitleId(fe_id)
  }

  const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value.trim()
    if (!newTitle) return
    if (!selectedId) return

    dispatch(changeComponentTitle({ fe_id: selectedId, newTitle }))
  }

  return (
    <>
      {componentList.map((c: componentInfoType) => {
        const { fe_id, title } = c

        const titleDefaultClassName = styles.title
        const selectedClassName = styles.selected
        const titleClassName = classNames({
          [titleDefaultClassName]: true,
          [selectedClassName]: fe_id === selectedId,
        })

        return (
          <div key={fe_id} className={styles.wrapper}>
            <div
              className={titleClassName}
              onClick={() => handleTitleClick(fe_id)}
            >
              {fe_id === changingTitleId && (
                <Input
                  value={title}
                  onChange={handleChangeTitle}
                  onPressEnter={() => {
                    setChangingTitleId('')
                  }}
                  onBlur={() => {
                    setChangingTitleId('')
                  }}
                />
              )}
              {fe_id !== changingTitleId && title}
            </div>
            <div className={styles.handler}>按钮</div>
          </div>
        )
      })}
    </>
  )
}

export default Layers
