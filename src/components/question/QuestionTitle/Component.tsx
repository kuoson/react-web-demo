import type { FC } from 'react'
import { Typography } from 'antd'
import type { QuestionTitlePropsType } from './type'

const { Title } = Typography

const QuestionTitle: FC<QuestionTitlePropsType> = (
  props: QuestionTitlePropsType,
) => {
  const { title = '标题', level = 1, isCenter = false } = props

  return (
    <Title level={level} style={{ textAlign: isCenter ? 'center' : 'left' }}>
      {title}
    </Title>
  )
}

export default QuestionTitle
