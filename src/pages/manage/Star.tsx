import type { FC } from 'react'
import { Empty } from 'antd'
import QuestionCard, { type PropsType } from '@/components/QuestionCard'
import ListSearch from '@/components/ListSearch'
import styles from './common.module.scss'

const listMock: PropsType[] = [
  {
    _id: '1',
    title: '问卷一',
    createdAt: '2025-05-20',
    answerCount: 10,
    isPublished: true,
    isStar: false,
  },
  {
    _id: '2',
    title: '问卷二',
    createdAt: '2025-05-18',
    answerCount: 5,
    isPublished: false,
    isStar: true,
  },
  {
    _id: '3',
    title: '用户满意度调查',
    createdAt: '2025-04-30',
    answerCount: 25,
    isPublished: true,
    isStar: true,
  },
  {
    _id: '4',
    title: '产品反馈问卷',
    createdAt: '2025-03-15',
    answerCount: 8,
    isPublished: false,
    isStar: false,
  },
  {
    _id: '5',
    title: '市场调研',
    createdAt: '2025-02-10',
    answerCount: 12,
    isPublished: true,
    isStar: false,
  },
  {
    _id: '6',
    title: '员工满意度调查',
    createdAt: '2025-01-22',
    answerCount: 18,
    isPublished: true,
    isStar: true,
  },
  {
    _id: '7',
    title: '活动报名表',
    createdAt: '2024-12-05',
    answerCount: 30,
    isPublished: false,
    isStar: false,
  },
  {
    _id: '8',
    title: '客户需求调研',
    createdAt: '2024-11-18',
    answerCount: 20,
    isPublished: true,
    isStar: true,
  },
]

const Star: FC = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.head}>
        <h3>星标问卷</h3>
        <div>
          <ListSearch />
        </div>
      </div>
      <div className={styles.content}>
        {listMock.length > 0 ? (
          listMock.map((item: PropsType) => (
            <QuestionCard key={item._id} {...item} />
          ))
        ) : (
          <Empty description="暂无数据" />
        )}
      </div>
      {listMock.length > 0 && <div className={styles.footer}>分页</div>}
    </div>
  )
}

export default Star
