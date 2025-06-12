import type { FC } from 'react'
import { Typography, Input } from 'antd'
import type { QuestionTextareaPropsType } from './type'

const { Paragraph } = Typography
const { TextArea } = Input

const QuestionTextarea: FC<QuestionTextareaPropsType> = (
  props: QuestionTextareaPropsType,
) => {
  const { title = '标题', placeholder = '请输入标题' } = props

  return (
    <>
      <Paragraph>{title}</Paragraph>
      <TextArea placeholder={placeholder}></TextArea>
    </>
  )
}

export default QuestionTextarea
