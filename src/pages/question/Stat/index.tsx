import type { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { Spin, Button, Result } from 'antd'
import { useTitle } from 'ahooks'
import useLoadQuestionData from '@/hooks/useLoadQuestionData'
import useGetPageInfo from '@/hooks/useGetPageInfo'
import styles from './index.module.scss'

const Stat: FC = () => {
  const { loading } = useLoadQuestionData()
  const { isPublished, title } = useGetPageInfo()
  const nav = useNavigate()
  useTitle(`问卷统计 - ${title}`)

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
      <div>Header</div>
      <div className={styles['content-wrapper']}>
        <div className={styles.content}>
          <div className={styles.left}>left</div>
          <div className={styles.main}>content</div>
          <div className={styles.right}>right</div>
        </div>
      </div>
    </div>
  )
}

export default Stat
