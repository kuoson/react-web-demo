import { useState, type ChangeEvent, type FC } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { LeftOutlined, EditOutlined } from '@ant-design/icons'
import { Button, Typography, Space, Input } from 'antd'
import { useRequest, useKeyPress } from 'ahooks'
import useGetPageInfo from '@/hooks/useGetPageInfo'
import useGetComponentListInfo from '@/hooks/useGetComponentListInfo'
import { changePageTitle } from '@/store/reducers/pageInfoSlice'
import { reqUpdateQuestion } from '@/api/question'
import EditToolBar from './EditToolBar'
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
  const componentList = useGetComponentListInfo()

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

  return (
    <Button loading={loading} onClick={save}>
      保存
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
          <Button type="primary">发布</Button>
        </Space>
      </div>
    </div>
  )
}

export default EditHeader
