import { type FC } from 'react'
import { Form, Input } from 'antd'
import type { QuestionTitlePropsType } from './type'

const PropsComponent: FC<QuestionTitlePropsType> = (
  props: QuestionTitlePropsType,
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
