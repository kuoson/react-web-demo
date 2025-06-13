export type QuestionParagraphPropsType = {
  text?: string
  isCenter?: boolean
  disabled?: boolean
  onChange?: (newProps: QuestionParagraphPropsType) => void
}

export const questionParagraphDefaultProps = {
  text: '一行段落',
  isCenter: false,
}
