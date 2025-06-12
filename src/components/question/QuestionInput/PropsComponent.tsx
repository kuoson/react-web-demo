import { type FC } from 'react'
import { Form, Input } from 'antd'
import type { QuestionInputPropsType } from './type'

const PropsComponent: FC<QuestionInputPropsType> = (
  props: QuestionInputPropsType,
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
        <Input />
      </Form.Item>
    </Form>
  )
}

export default PropsComponent
