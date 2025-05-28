import type { FC } from 'react'
import { Spin } from 'antd'
import { useLoadQuestionList } from '@/hooks/useLoadQuestionLIst'
import QuestionCard, { type PropsType } from '@/components/QuestionCard'
import ListSearch from '@/components/ListSearch'
import styles from './common.module.scss'

const List: FC = () => {
  const { data = {}, loading } = useLoadQuestionList()
  const { list = [] } = data

  return (
    <div className={styles.wrapper}>
      <div className={styles.head}>
        <h3>我的问卷</h3>
        <div>
          <ListSearch />
        </div>
      </div>
      <div className={styles.content}>
        <Spin spinning={loading}>
          {list.length > 0 &&
            list.map((item: PropsType) => (
              <QuestionCard key={item._id} {...item} />
            ))}
        </Spin>
      </div>
      <div className={styles.footer}>load more...</div>
    </div>
  )
}

export default List
