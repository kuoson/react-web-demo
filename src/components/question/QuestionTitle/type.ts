export type QuestionTitlePropsType = {
  title?: string
  level?: 1 | 2 | 3
  isCenter?: boolean
  disabled?: boolean
  onChange?: (newProps: QuestionTitlePropsType) => void
}
