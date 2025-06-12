import { useEffect, type FC } from 'react'
import { Form, Input } from 'antd'
import type { QuestionTextareaPropsType } from './type'

const { TextArea } = Input

const PropsComponent: FC<QuestionTextareaPropsType> = (
  props: QuestionTextareaPropsType,
) => {
  const {
    title = '标题',
    placeholder = 'placeholder',
    disabled,
    onChange,
  } = props
  const [form] = Form.useForm()

  const handleValuesChange = () => {
    if (onChange) {
      onChange(form.getFieldsValue())
    }
  }

  useEffect(() => {
    form.setFieldsValue({ title, placeholder })
  }, [title, placeholder])

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{ title, placeholder }}
      onValuesChange={handleValuesChange}
      disabled={disabled}
    >
      <Form.Item label="标题内容" name="title" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label="placeholder" name="placeholder">
        <TextArea />
      </Form.Item>
    </Form>
  )
}

export default PropsComponent
