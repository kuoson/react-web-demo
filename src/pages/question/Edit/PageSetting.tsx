import { useEffect, type FC } from 'react'
import { useDispatch } from 'react-redux'
import { Form, Input } from 'antd'
import useGetPageInfo from '@/hooks/useGetPageInfo'
import { restPageInfo } from '@/store/reducers/pageInfoSlice'

const { TextArea } = Input

const PageSetting: FC = () => {
  const dispatch = useDispatch()
  const [form] = Form.useForm()
  const pageInfo = useGetPageInfo()

  const handleValuesChange = () => {
    dispatch(restPageInfo(form.getFieldsValue()))
  }

  useEffect(() => {
    form.setFieldsValue(pageInfo)
  }, [pageInfo])

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={pageInfo}
      onValuesChange={handleValuesChange}
    >
      <Form.Item label="问卷标题" name="title" rules={[{ required: true }]}>
        <Input placeholder="请输入问卷标题" />
      </Form.Item>
      <Form.Item label="问卷描述" name="desc">
        <TextArea placeholder="请输入问卷描述..." />
      </Form.Item>
      <Form.Item label="样式代码" name="css">
        <TextArea placeholder="请输入样式代码..." />
      </Form.Item>
      <Form.Item label="脚本代码" name="js">
        <TextArea placeholder="请输入脚本代码..." />
      </Form.Item>
    </Form>
  )
}

export default PageSetting
