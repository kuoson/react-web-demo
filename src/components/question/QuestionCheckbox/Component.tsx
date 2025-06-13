import type { FC } from 'react'
import { Typography, Space, Checkbox } from 'antd'
import {
  type QuestionCheckboxPropsType,
  questionCheckboxDefaultProps,
} from './type'

const { Paragraph } = Typography

const QuestionCheckbox: FC<QuestionCheckboxPropsType> = (
  props: QuestionCheckboxPropsType,
) => {
  const {
    title = '',
    isVertical = false,
    list = [],
  } = {
    ...questionCheckboxDefaultProps,
    ...props,
  }

  return (
    <>
      <Paragraph strong>{title}</Paragraph>
      <Space direction={isVertical ? 'vertical' : 'horizontal'}>
        {list.map((opt) => {
          const { value, text, checked } = opt

          return (
            <Checkbox key={value} value={value} checked={checked}>
              {text}
            </Checkbox>
          )
        })}
      </Space>
    </>
  )
}

export default QuestionCheckbox
