import type { FC } from 'react'
import { Typography, Input } from 'antd'
import {
  type QuestionTextareaPropsType,
  questionTextareaDefaultProps,
} from './type'

const { Paragraph } = Typography
const { TextArea } = Input

const QuestionTextarea: FC<QuestionTextareaPropsType> = (
  props: QuestionTextareaPropsType,
) => {
  const { title = '', placeholder = '' } = {
    ...questionTextareaDefaultProps,
    ...props,
  }

  return (
    <>
      <Paragraph>{title}</Paragraph>
      <TextArea placeholder={placeholder}></TextArea>
    </>
  )
}

export default QuestionTextarea
