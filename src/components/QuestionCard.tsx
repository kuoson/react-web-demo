import type { FC } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {
  StarOutlined,
  EditOutlined,
  LineChartOutlined,
  CopyOutlined,
  DeleteOutlined,
} from '@ant-design/icons'
import { Tag, Space, Divider, Button } from 'antd'
import { QUESTION_EDIT_PATHNAME, QUESTION_STAT_PATHNAME } from '@/router/routes'
import styles from './QuestionCard.module.scss'

export type PropsType = {
  _id: string
  title: string
  createdAt: string
  answerCount: number
  isPublished: boolean
  isStar: boolean
}

const List: FC<PropsType> = (props: PropsType) => {
  const nav = useNavigate()
  const { _id, title, createdAt, answerCount, isPublished, isStar } = props

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.top}>
          <Link
            to={
              isPublished
                ? `${QUESTION_STAT_PATHNAME}/${_id}`
                : `${QUESTION_EDIT_PATHNAME}/${_id}`
            }
          >
            <Space>
              {isStar && <StarOutlined style={{ color: 'red' }} />}
              {title}
            </Space>
          </Link>
          <Space>
            {isPublished ? (
              <Tag color="processing">已发布</Tag>
            ) : (
              <Tag color="magenta">未发布</Tag>
            )}
            <span>答卷: {answerCount}</span>
            <span>{createdAt}</span>
          </Space>
        </div>
        <Divider style={{ margin: '12px 0px' }} />
        <div className={styles.bottom}>
          <Space>
            <Button
              icon={<EditOutlined />}
              type="text"
              onClick={() => {
                nav(`${QUESTION_EDIT_PATHNAME}/${_id}`)
              }}
            >
              编辑问卷
            </Button>
            <Button
              icon={<LineChartOutlined />}
              type="text"
              disabled={isPublished ? false : true}
              onClick={() => {
                nav(`${QUESTION_STAT_PATHNAME}/${_id}`)
              }}
            >
              问卷统计
            </Button>
          </Space>
          <Space>
            <Button icon={<StarOutlined />} type="text">
              {isStar ? '取消标星' : '标星'}
            </Button>
            <Button icon={<CopyOutlined />} type="text">
              复制
            </Button>
            <Button icon={<DeleteOutlined />} type="text">
              删除
            </Button>
          </Space>
        </div>
      </div>
    </>
  )
}

export default List
