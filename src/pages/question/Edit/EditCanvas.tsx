import type { FC } from 'react'
import { Spin } from 'antd'
import { useDispatch } from 'react-redux'
import classNames from 'classnames'
import { changeSelected } from '@/store/reducers/questionComponentsSlice'
import useGetComponentListInfo from '@/hooks/useGetComponentListInfo'
import { getComponentConfByType } from '@/components/question/index'
import type { componentInfoType } from '@/store/reducers/questionComponentsSlice'
import styles from './EditCanvas.module.scss'

type propsType = {
  loading: boolean
}

// 不涉及重新渲染，所以放外面
const genComponent = (componentInfo: componentInfoType) => {
  const { type, props } = componentInfo
  const conf = getComponentConfByType(type)
  if (!conf) {
    return null
  }

  const { Component } = conf
  return <Component {...props} />
}

const EditCanvas: FC<propsType> = ({ loading }) => {
  const dispatch = useDispatch()
  const { componentList, selectedId } = useGetComponentListInfo()

  const handleClearSelected = (e: MouseEvent, id: string) => {
    e.stopPropagation()
    dispatch(changeSelected(id))
  }

  if (loading) {
    return (
      <div style={{ textAlign: 'center' }}>
        <Spin />
      </div>
    )
  }

  return (
    <div className={styles.wrapper}>
      {componentList
        .filter((cpn: componentInfoType) => !cpn.isHidden)
        .map((item: componentInfoType) => {
          const { fe_id, isLocked } = item

          return (
            <div
              className={classNames(styles['component-wrapper'], {
                [styles.selected]: selectedId === fe_id,
                [styles.locked]: isLocked,
              })}
              key={fe_id}
              onClick={(e) => {
                handleClearSelected(e, fe_id)
              }}
            >
              <div className={styles.component}>{genComponent(item)}</div>
            </div>
          )
        })}
    </div>
  )
}

export default EditCanvas
