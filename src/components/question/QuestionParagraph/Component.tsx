import type { FC } from 'react'
import { Typography } from 'antd'
import type { QuestionParagraphPropsType } from './type'

const { Paragraph } = Typography

const QuestionParagraph: FC<QuestionParagraphPropsType> = (
  props: QuestionParagraphPropsType,
) => {
  const { text = '一行段落', isCenter = false } = props
  const textArr = text.split('\n')

  return (
    <Paragraph style={{ textAlign: isCenter ? 'center' : 'left' }}>
      {textArr.map((t: string, index: number) => (
        <span>
          {index > 0 && <br />}
          {t}
        </span>
      ))}
    </Paragraph>
  )
}

export default QuestionParagraph
