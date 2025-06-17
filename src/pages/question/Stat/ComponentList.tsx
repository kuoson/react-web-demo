import type { FC } from 'react'
import classNames from 'classnames'
import useGetComponentListInfo from '@/hooks/useGetComponentListInfo'
import { getComponentConfByType } from '@/components/question'
import styles from './ComponentList.module.scss'

type PropsType = {
  selectedComponentId: string
  onSetSelectedComponentId: (id: string) => void
  onSetSelectedComponentType: (type: string) => void
}

const ComponentList: FC<PropsType> = (props) => {
  const {
    selectedComponentId,
    onSetSelectedComponentId,
    onSetSelectedComponentType,
  } = props
  const { componentList } = useGetComponentListInfo()

  return (
    <div className={styles.container}>
      {componentList
        .filter((c) => !c.isHidden) // 过滤隐藏的组件
        .map((c) => {
          const { fe_id, props, type } = c

          const componentConf = getComponentConfByType(type)
          if (componentConf == null) return null

          const { Component } = componentConf

          // 拼接 class name
          const wrapperDefaultClassName = styles['component-wrapper']
          const selectedClassName = styles.selected
          const wrapperClassName = classNames({
            [wrapperDefaultClassName]: true,
            [selectedClassName]: fe_id === selectedComponentId, // 是否选中
          })

          return (
            <div
              className={wrapperClassName}
              key={fe_id}
              onClick={() => {
                onSetSelectedComponentId(fe_id)
                onSetSelectedComponentType(type)
              }}
            >
              <div className={styles.component}>
                <Component {...props}></Component>
              </div>
            </div>
          )
        })}
    </div>
  )
}

export default ComponentList
