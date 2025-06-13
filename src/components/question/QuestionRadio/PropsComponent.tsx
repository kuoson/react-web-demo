import { useEffect, type FC } from 'react'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { Form, Input, Select, Checkbox, Button, Space } from 'antd'
import { nanoid } from 'nanoid'
import { type OptionType, type QuestionRadioPropsType } from './type'

const PropsComponent: FC<QuestionRadioPropsType> = (
  props: QuestionRadioPropsType,
) => {
  const {
    title = '',
    isVertical = false,
    options = [],
    value = '',
    disabled,
    onChange,
  } = props
  const [form] = Form.useForm()

  const handleValuesChange = () => {
    if (onChange) {
      const newValues = form.getFieldsValue()
      const { options } = newValues
      options.forEach((opt: OptionType) => {
        if (!opt.value) {
          opt.value = nanoid()
        }
      })

      onChange(form.getFieldsValue())
    }
  }

  useEffect(() => {
    form.setFieldsValue({ title, isVertical, options, value })
  }, [title, isVertical, options, value])

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{ title, isVertical, options, value }}
      onValuesChange={handleValuesChange}
      disabled={disabled}
    >
      <Form.Item label="标题" name="title" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label="选项">
        <Form.List name="options">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name }, index) => (
                <Space key={key} align="baseline">
                  <Form.Item
                    name={[name, 'text']}
                    rules={[
                      { required: true, message: '请输入选项文字' },
                      {
                        validator: (_, text) => {
                          const { options = [] } = form.getFieldsValue()

                          let num = 0
                          options.forEach((opt: OptionType) => {
                            if (opt.text === text) {
                              num++
                            }
                          })

                          if (num === 1) {
                            return Promise.resolve()
                          }

                          return Promise.reject(new Error('和其他选项重复了'))
                        },
                      },
                    ]}
                  >
                    <Input placeholder="请输入选项文字..." />
                  </Form.Item>
                  {index > 1 && (
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  )}
                </Space>
              ))}
              <Form.Item>
                <Button
                  type="link"
                  icon={<PlusOutlined />}
                  block
                  onClick={() => add({ value: '', text: '' })}
                >
                  添加选项
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form.Item>
      <Form.Item label="默认选中" name="value">
        <Select
          options={options
            .filter((opt) => opt)
            .map(({ value, text }) => ({
              value,
              label: text || '',
            }))}
        />
      </Form.Item>
      <Form.Item name="isVertical" valuePropName="checked">
        <Checkbox>竖向排序</Checkbox>
      </Form.Item>
    </Form>
  )
}

export default PropsComponent
