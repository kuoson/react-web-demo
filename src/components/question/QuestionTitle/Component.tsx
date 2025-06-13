import type { FC } from 'react'
import { Typography } from 'antd'
import { type QuestionTitlePropsType, questionTitleDefaultProps } from './type'

const { Title } = Typography

const QuestionTitle: FC<QuestionTitlePropsType> = (
  props: QuestionTitlePropsType,
) => {
  const {
    title = '',
    level = 1,
    isCenter = false,
  } = { ...questionTitleDefaultProps, ...props }

  return (
    <Title level={level} style={{ textAlign: isCenter ? 'center' : 'left' }}>
      {title}
    </Title>
  )
}

export default QuestionTitle
