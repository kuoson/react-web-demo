import type { FC } from 'react'
import { Empty, Spin } from 'antd'
import { useLoadQuestionList } from '@/hooks/useLoadQuestionLIst'
import QuestionCard, { type PropsType } from '@/components/QuestionCard'
import ListSearch from '@/components/ListSearch'
import styles from './common.module.scss'

const Star: FC = () => {
  const { data = {}, loading } = useLoadQuestionList({ isStar: true })
  const { list = [] } = data

  return (
    <div className={styles.wrapper}>
      <div className={styles.head}>
        <h3>星标问卷</h3>
        <div>
          <ListSearch />
        </div>
      </div>
      <div className={styles.content}>
        <Spin spinning={loading}>
          {list.length > 0
            ? list.map((item: PropsType) => (
                <QuestionCard key={item._id} {...item} />
              ))
            : !loading && <Empty description="暂无数据" />}
        </Spin>
      </div>
      {list.length > 0 && <div className={styles.footer}>分页</div>}
    </div>
  )
}

export default Star
