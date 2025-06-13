import { useEffect, type FC } from 'react'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { Form, Input, Checkbox, Button, Space } from 'antd'
import { nanoid } from 'nanoid'
import { type OptionType, type QuestionCheckboxPropsType } from './type'

const PropsComponent: FC<QuestionCheckboxPropsType> = (
  props: QuestionCheckboxPropsType,
) => {
  const {
    title = '标题',
    isVertical = false,
    list = [],
    disabled,
    onChange,
  } = props
  const [form] = Form.useForm()

  const handleValuesChange = () => {
    if (onChange) {
      const newValues = form.getFieldsValue()
      const { list } = newValues
      list.forEach((opt: OptionType) => {
        if (!opt.value) {
          opt.value = nanoid()
        }
      })

      onChange(form.getFieldsValue())
    }
  }

  useEffect(() => {
    form.setFieldsValue({ title, isVertical, list })
  }, [title, isVertical, list])

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{ title, isVertical, list }}
      onValuesChange={handleValuesChange}
      disabled={disabled}
    >
      <Form.Item label="标题" name="title" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label="选项">
        <Form.List name="list">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name }, index) => (
                <Space key={key} align="baseline">
                  <Form.Item name={[name, 'checked']} valuePropName="checked">
                    <Checkbox></Checkbox>
                  </Form.Item>
                  <Form.Item
                    name={[name, 'text']}
                    rules={[
                      { required: true, message: '请输入选项文字' },
                      {
                        validator: (_, text) => {
                          const { list = [] } = form.getFieldsValue()

                          let num = 0
                          list.forEach((opt: OptionType) => {
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
                  {index > 0 && (
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  )}
                </Space>
              ))}
              <Form.Item>
                <Button
                  type="link"
                  icon={<PlusOutlined />}
                  block
                  onClick={() => add({ value: '', text: '', checked: false })}
                >
                  添加选项
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form.Item>
      <Form.Item name="isVertical" valuePropName="checked">
        <Checkbox>竖向排序</Checkbox>
      </Form.Item>
    </Form>
  )
}

export default PropsComponent
