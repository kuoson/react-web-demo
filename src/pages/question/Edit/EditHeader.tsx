import { useState, type ChangeEvent, type FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { LeftOutlined, EditOutlined } from '@ant-design/icons'
import { Button, Typography, Space, Input } from 'antd'
import useGetPageInfo from '@/hooks/useGetPageInfo'
import { changePageTitle } from '@/store/reducers/pageInfoSlice'
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
          <Button>保存</Button>
          <Button type="primary">发布</Button>
        </Space>
      </div>
    </div>
  )
}

export default EditHeader
