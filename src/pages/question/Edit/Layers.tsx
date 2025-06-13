import type { FC } from 'react'
import { useDispatch } from 'react-redux'
import { message } from 'antd'
import { useGetComponentListInfo } from '@/hooks/useGetComponentListInfo'
import { changeSelected } from '@/store/reducers/questionComponentsSlice'
import type { componentInfoType } from '@/store/reducers/questionComponentsSlice'
import styles from './Layers.module.scss'

const Layers: FC = () => {
  const { componentList, selectedId } = useGetComponentListInfo()
  const dispatch = useDispatch()

  function handleTitleClick(fe_id: string) {
    const curComp = componentList.find(
      (c: componentInfoType) => c.fe_id === fe_id,
    )

    if (curComp && curComp.isHidden) {
      message.info('不能选中隐藏的组件')
      return
    }

    if (fe_id !== selectedId) {
      dispatch(changeSelected(fe_id))
      return
    }
  }

  return (
    <>
      {componentList.map((c: componentInfoType) => {
        const { fe_id, title } = c

        return (
          <div key={fe_id} className={styles.wrapper}>
            <div onClick={() => handleTitleClick(fe_id)}>{title}</div>
            <div className={styles.handler}>按钮</div>
          </div>
        )
      })}
    </>
  )
}

export default Layers
