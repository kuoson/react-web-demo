import type { FC } from 'react'
import { useDispatch } from 'react-redux'
import { changeSelected } from '@/store/reducers/questionComponentsSlice'
import LeftPanel from './LeftPanel'
import EditCanvas from './EditCanvas'
import RightPanel from './RightPanel'
import styles from './index.module.scss'
import { useLoadQuestionData } from '@/hooks/useLoadQuestionData'

const Edit: FC = () => {
  const dispatch = useDispatch()
  const { loading } = useLoadQuestionData()

  const handleClick = () => {
    dispatch(changeSelected(''))
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>Header</div>
      <div className={styles['content-wrapper']}>
        <div className={styles.content}>
          <div className={styles.left}>
            <LeftPanel />
          </div>
          <div className={styles.main} onClick={() => handleClick()}>
            <div className={styles['canvas-wrapper']}>
              <div style={{ height: '900px' }}>
                <EditCanvas loading={loading} />
              </div>
            </div>
          </div>
          <div className={styles.right}>
            <RightPanel />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Edit
