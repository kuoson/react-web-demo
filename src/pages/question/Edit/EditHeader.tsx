import type { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { LeftOutlined } from '@ant-design/icons'
import { Button, Typography, Space } from 'antd'
import EditToolBar from './EditToolBar'
import styles from './EditHeader.module.scss'

const { Title } = Typography

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
          <Title level={5} style={{ margin: '0px' }}>
            问卷标题
          </Title>
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
