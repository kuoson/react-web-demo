import { useState, type ChangeEvent, type FC } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { LeftOutlined, EditOutlined } from '@ant-design/icons'
import { Button, Typography, Space, Input, message } from 'antd'
import { useRequest, useKeyPress, useDebounceEffect } from 'ahooks'
import useGetPageInfo from '@/hooks/useGetPageInfo'
import useGetComponentListInfo from '@/hooks/useGetComponentListInfo'
import { changePageTitle } from '@/store/reducers/pageInfoSlice'
import { reqUpdateQuestion } from '@/api/question'
import EditToolBar from './EditToolBar'
import { QUESTION_STAT_PATHNAME } from '@/router/routes'
import styles from './EditHeader.module.scss'

const { Title } = Typography

const TitleElem: FC = () => {
  const dispatch = useDispatch()
  const { title } = useGetPageInfo()
  const [editState, setEditState] = useState(false)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value.trim()
    if (!newTitle) return

    dispatch(changePageTitle(newTitle))
  }

  if (editState) {
    return (
      <Input
        value={title}
        onChange={handleChange}
        onPressEnter={() => {
          setEditState(false)
        }}
        onBlur={() => {
          setEditState(false)
        }}
      />
    )
  }

  return (
    <Space>
      <Title level={5} style={{ margin: '0px' }}>
        {title}
      </Title>
      <Button
        type="text"
        icon={<EditOutlined />}
        onClick={() => {
          setEditState(true)
        }}
      />
    </Space>
  )
}

const SaveButton: FC = () => {
  const { id } = useParams()
  const pageInfo = useGetPageInfo()
  const { componentList } = useGetComponentListInfo()

  const { loading, run: save } = useRequest(
    async () => {
      if (!id) return

      await reqUpdateQuestion(id, { ...pageInfo, componentList })
    },
    { manual: true },
  )

  useKeyPress(['ctrl.s', 'meta.s'], (event: KeyboardEvent) => {
    event.preventDefault()
    if (!loading) save()
  })

  useDebounceEffect(
    () => {
      save()
    },
    [pageInfo, componentList],
    {
      wait: 1000,
    },
  )

  return (
    <Button loading={loading} onClick={save}>
      保存
    </Button>
  )
}

const PublishButton: FC = () => {
  const nav = useNavigate()
  const { id } = useParams()
  const pageInfo = useGetPageInfo()
  const { componentList } = useGetComponentListInfo()

  const { loading, run: pub } = useRequest(
    async () => {
      if (!id) return

      await reqUpdateQuestion(id, {
        ...pageInfo,
        componentList,
        isPublished: true,
      })
    },
    {
      manual: true,
      onSuccess: () => {
        message.success('发布成功')
        nav(QUESTION_STAT_PATHNAME + '/' + id)
      },
    },
  )

  return (
    <Button type="primary" loading={loading} onClick={pub}>
      发布
    </Button>
  )
}

const EditHeader: FC = () => {
  const nav = useNavigate()

  return (
    <div className={styles.wrapper}>
      <div className={styles.left}>
        <Space>
          <Button
            type="link"
            icon={<LeftOutlined />}
            onClick={() => {
              nav(-1)
            }}
          >
            返回
          </Button>

          <TitleElem />
        </Space>
      </div>
      <div className={styles.main}>
        <EditToolBar />
      </div>
      <div className={styles.right}>
        <Space>
          <SaveButton />
          <PublishButton />
        </Space>
      </div>
    </div>
  )
}

export default EditHeader
