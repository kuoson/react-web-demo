import { useRef, type FC } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { LeftOutlined, CopyOutlined, QrcodeOutlined } from '@ant-design/icons'
import {
  Space,
  Button,
  Typography,
  Input,
  type InputRef,
  Tooltip,
  message,
  Popover,
} from 'antd'
import { QRCodeSVG } from 'qrcode.react'
import useGetPageInfo from '@/hooks/useGetPageInfo'
import { QUESTION_EDIT_PATHNAME } from '@/router/routes'
import styles from './StatHeader.module.scss'

const { Title } = Typography

const StatHeader: FC = () => {
  const { title } = useGetPageInfo()
  const nav = useNavigate()
  const { id } = useParams()

  const linkInputRef = useRef<InputRef>(null)
  const genLinkAndQRCodeElem = () => {
    const link = `http://localhost:3000/question/${id}`

    const handleCopy = () => {
      const elem = linkInputRef.current
      if (!elem) return

      elem.select()
      document.execCommand('copy')
      message.success('复制成功！')
    }

    const QRCodeElem = (
      <div>
        <QRCodeSVG value={link} />
      </div>
    )

    return (
      <Space>
        <Input value={link} ref={linkInputRef} style={{ width: '360px' }} />
        <Tooltip title="复制">
          <Button icon={<CopyOutlined />} onClick={handleCopy} />
        </Tooltip>
        <Popover placement="bottom" content={QRCodeElem}>
          <Button icon={<QrcodeOutlined />} />
        </Popover>
      </Space>
    )
  }

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
            {title}
          </Title>
        </Space>
      </div>
      <div className={styles.main}>{genLinkAndQRCodeElem()}</div>
      <div className={styles.right}>
        <Button
          type="primary"
          onClick={() => {
            nav(`${QUESTION_EDIT_PATHNAME}/${id}`)
          }}
        >
          编辑问卷
        </Button>
      </div>
    </div>
  )
}

export default StatHeader
