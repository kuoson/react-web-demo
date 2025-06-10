import type { FC } from 'react'
import { useDispatch } from 'react-redux'
import { DeleteOutlined } from '@ant-design/icons'
import { Button, Tooltip } from 'antd'
import { removeComponent } from '@/store/reducers/questionComponentsSlice'

const EditToolBar: FC = () => {
  const dispatch = useDispatch()

  const handleDel = () => {
    dispatch(removeComponent())
  }

  return (
    <div>
      <Tooltip title="删除">
        <Button shape="circle" icon={<DeleteOutlined />} onClick={handleDel} />
      </Tooltip>
    </div>
  )
}
export default EditToolBar
