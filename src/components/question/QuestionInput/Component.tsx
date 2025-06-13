import type { FC } from 'react'
import { Typography, Input } from 'antd'
import { type QuestionInputPropsType, questionInputDefaultProps } from './type'

const { Paragraph } = Typography

const QuestionInput: FC<QuestionInputPropsType> = (
  props: QuestionInputPropsType,
) => {
  const { title = '', placeholder = '' } = {
    ...questionInputDefaultProps,
    ...props,
  }

  return (
    <>
      <Paragraph>{title}</Paragraph>
      <Input placeholder={placeholder}></Input>
    </>
  )
}

export default QuestionInput
