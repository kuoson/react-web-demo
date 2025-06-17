import { useState, type FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { Spin, Button, Result } from 'antd'
import { useTitle } from 'ahooks'
import useLoadQuestionData from '@/hooks/useLoadQuestionData'
import useGetPageInfo from '@/hooks/useGetPageInfo'
import StatHeader from './StatHeader'
import ComponentList from './ComponentList'
import StatTable from './StatTable'
import styles from './index.module.scss'

const Stat: FC = () => {
  const { loading } = useLoadQuestionData()
  const { isPublished, title } = useGetPageInfo()
  const nav = useNavigate()
  useTitle(`问卷统计 - ${title}`)

  const [selectedComponentId, setSelectedComponentId] = useState('')
  const [selectedComponentType, setSelectedComponentType] = useState('')
  console.log(selectedComponentType)

  if (loading) {
    return (
      <div style={{ height: '100%', width: '100%', textAlign: 'center' }}>
        <Spin spinning={loading} />
      </div>
    )
  }

  if (!isPublished) {
    return (
      <Result
        status="warning"
        title="该页面尚未发布"
        extra={
          <Button type="primary" onClick={() => nav(-1)}>
            返回
          </Button>
        }
      />
    )
  }

  return (
    <div className={styles.container}>
      <div>
        <StatHeader />
      </div>
      <div className={styles['content-wrapper']}>
        <div className={styles.content}>
          <div className={styles.left}>
            <ComponentList
              selectedComponentId={selectedComponentId}
              onSetSelectedComponentId={setSelectedComponentId}
              onSetSelectedComponentType={setSelectedComponentType}
            />
          </div>
          <div className={styles.main}>
            <StatTable
              selectedComponentId={selectedComponentId}
              onSetSelectedComponentId={setSelectedComponentId}
              onSetSelectedComponentType={setSelectedComponentType}
            />
          </div>
          <div className={styles.right}>right</div>
        </div>
      </div>
    </div>
  )
}

export default Stat
