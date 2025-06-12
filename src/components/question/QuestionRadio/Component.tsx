import type { FC } from 'react'
import { Typography, Space, Radio } from 'antd'
import {
  type OptionType,
  type QuestionRadioPropsType,
  questionRadioDefaultProps,
} from './type'

const { Paragraph } = Typography

const QuestionRadio: FC<QuestionRadioPropsType> = (
  props: QuestionRadioPropsType,
) => {
  const {
    title = '',
    isVertical = false,
    options = [],
    value = '',
  } = {
    ...questionRadioDefaultProps,
    ...props,
  }

  return (
    <>
      <Paragraph strong>{title}</Paragraph>
      <Radio.Group value={value}>
        <Space direction={isVertical ? 'vertical' : 'horizontal'}>
          {options.map((opt: OptionType) => {
            const { value, text } = opt || {}

            return <Radio value={value}>{text}</Radio>
          })}
        </Space>
      </Radio.Group>
    </>
  )
}

export default QuestionRadio
