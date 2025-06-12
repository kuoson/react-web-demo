import { type FC } from 'react'
import { Form, Input, Select, Checkbox } from 'antd'
import type { QuestionInputPropsType } from './type'

const PropsComponent: FC<QuestionInputPropsType> = (
  props: QuestionInputPropsType,
) => {
  const {
    title = '标题',
    level = 1,
    isCenter = false,
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
      initialValues={{ title, level, isCenter }}
      onValuesChange={handleValuesChange}
      disabled={disabled}
    >
      <Form.Item label="标题内容" name="title" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label="层级" name="level">
        <Select
          options={[
            { value: 1, label: 1 },
            { value: 2, label: 2 },
            { value: 3, label: 3 },
          ]}
        />
      </Form.Item>
      <Form.Item valuePropName="isCenter">
        <Checkbox>居中显示</Checkbox>
      </Form.Item>
    </Form>
  )
}

export default PropsComponent
