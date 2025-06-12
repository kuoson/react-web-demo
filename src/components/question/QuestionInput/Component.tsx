import type { FC } from 'react'
import { Typography, Input } from 'antd'
import type { QuestionInputPropsType } from './type'

const { Paragraph } = Typography

const QuestionInput: FC<QuestionInputPropsType> = (
  props: QuestionInputPropsType,
) => {
  const { title = '标题', placeholder = '请输入标题' } = props

  return (
    <>
      <Paragraph>{title}</Paragraph>
      <Input placeholder={placeholder}></Input>
    </>
  )
}

export default QuestionInput
