export type QuestionInfoPropsType = {
  title?: string
  desc?: string
  isCenter?: boolean
  disabled?: boolean
  onChange?: (newProps: QuestionInfoPropsType) => void
}
