import type { FC } from 'react'
import { Typography } from 'antd'
import type { QuestionInputPropsType } from './type'

const { Title } = Typography

const Input: FC<QuestionInputPropsType> = (props: QuestionInputPropsType) => {
  const { title = '标题', level = 1, isCenter = false } = props

  return (
    <Title level={level} style={{ textAlign: isCenter ? 'center' : 'left' }}>
      {title}
    </Title>
  )
}

export default Input
