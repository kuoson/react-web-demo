export type QuestionInputPropsType = {
  title?: string
  level?: 1 | 2 | 3
  isCenter?: boolean
  onChange?: (newProps: QuestionInputPropsType) => void
}
