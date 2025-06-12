import type { FC } from 'react'
import { Typography } from 'antd'
import type { QuestionInfoPropsType } from './type'

const { Title, Paragraph } = Typography

const QuestionInfo: FC<QuestionInfoPropsType> = (
  props: QuestionInfoPropsType,
) => {
  const { title = '问卷标题', desc = '问卷描述' } = props
  const descArr = desc.split('\n')

  return (
    <div style={{ textAlign: 'center' }}>
      <Title level={4}>{title}</Title>
      <Paragraph>
        {descArr.map((t: string, index: number) => (
          <span key={index}>
            {index > 0 && <br />}
            {t}
          </span>
        ))}
      </Paragraph>
    </div>
  )
}

export default QuestionInfo
