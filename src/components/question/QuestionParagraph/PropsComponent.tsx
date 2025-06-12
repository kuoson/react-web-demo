import { useEffect, type FC } from 'react'
import { Form, Input, Checkbox } from 'antd'
import type { QuestionParagraphPropsType } from './type'

const { TextArea } = Input

const PropsComponent: FC<QuestionParagraphPropsType> = (
  props: QuestionParagraphPropsType,
) => {
  const { text = '一行段落', isCenter = false, disabled, onChange } = props
  const [form] = Form.useForm()

  const handleValuesChange = () => {
    if (onChange) {
      onChange(form.getFieldsValue())
    }
  }

  useEffect(() => {
    form.setFieldsValue({ text, isCenter })
  }, [text, isCenter])

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{ text, isCenter }}
      onValuesChange={handleValuesChange}
      disabled={disabled}
    >
      <Form.Item label="段落内容" name="text" rules={[{ required: true }]}>
        <TextArea />
      </Form.Item>
      <Form.Item name="isCenter" valuePropName="checked">
        <Checkbox>居中显示</Checkbox>
      </Form.Item>
    </Form>
  )
}

export default PropsComponent
