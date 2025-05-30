import { useState } from 'react'
import type { FC } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {
  StarOutlined,
  EditOutlined,
  LineChartOutlined,
  CopyOutlined,
  DeleteOutlined,
  ExclamationCircleFilled,
} from '@ant-design/icons'
import { Tag, Space, Divider, Button, message, Modal } from 'antd'
import { useRequest } from 'ahooks'
import { reqUpdateQuestion, reqDuplicateQuestion } from '@/api/question'
import { QUESTION_EDIT_PATHNAME, QUESTION_STAT_PATHNAME } from '@/router/routes'
import styles from './QuestionCard.module.scss'

const { confirm } = Modal

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
  const [curStar, setCurStar] = useState(isStar)
  const [curDelete, setCurDelete] = useState(false)

  const { loading: changeStarLoading, run: handleChangeStar } = useRequest(
    async () => {
      await reqUpdateQuestion(_id, {
        isStar: !curStar,
      })
    },
    {
      manual: true,
      onSuccess: () => {
        setCurStar(!curStar)
        message.success('已更新')
      },
    },
  )

  const { loading: changeDuplicateLoading, run: handleDuplicateStar } =
    useRequest(async () => await reqDuplicateQuestion(_id), {
      manual: true,
      onSuccess: (res) => {
        message.success('复制成功')
        nav(`${QUESTION_EDIT_PATHNAME}/${res.id}`)
      },
    })

  const { loading: changeDelLoading, run: handleConfirmDel } = useRequest(
    async () => {
      await reqUpdateQuestion(_id, {
        isDeleted: true,
      })
    },
    {
      manual: true,
      onSuccess: () => {
        message.success('删除成功')
        setCurDelete(true)
      },
    },
  )

  const handleDel = () => {
    confirm({
      title: '确认删除该问卷?',
      icon: <ExclamationCircleFilled />,
      okText: '确认',
      cancelText: '取消',
      onOk: handleConfirmDel,
    })
  }

  return (
    <>
      {!curDelete && (
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
                {curStar && <StarOutlined style={{ color: 'red' }} />}
                {title}
              </Space>
            </Link>
            <Space>
              {isPublished ? (
                <Tag color="processing">已发布</Tag>
              ) : (
                <Tag>未发布</Tag>
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
              <Button
                icon={<StarOutlined />}
                type="text"
                loading={changeStarLoading}
                onClick={handleChangeStar}
              >
                {curStar ? '取消标星' : '标星'}
              </Button>
              <Button
                icon={<CopyOutlined />}
                type="text"
                loading={changeDuplicateLoading}
                onClick={handleDuplicateStar}
              >
                复制
              </Button>
              <Button
                icon={<DeleteOutlined />}
                type="text"
                loading={changeDelLoading}
                onClick={handleDel}
              >
                删除
              </Button>
            </Space>
          </div>
        </div>
      )}
    </>
  )
}

export default List
