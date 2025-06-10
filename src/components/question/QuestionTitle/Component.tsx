import type { FC } from 'react'
import { Typography, Input } from 'antd'
import type { QuestionTitlePropsType } from './type'

const { Paragraph } = Typography

const QuestionTitle: FC<QuestionTitlePropsType> = (
  props: QuestionTitlePropsType,
) => {
  const { title = '标题', placeholder = '请输入标题' } = props

  return (
    <>
      <Paragraph>{title}</Paragraph>
      <Input placeholder={placeholder}></Input>
    </>
  )
}

export default QuestionTitle
