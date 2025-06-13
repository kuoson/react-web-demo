export type QuestionTitlePropsType = {
  title?: string
  level?: 1 | 2 | 3
  isCenter?: boolean
  disabled?: boolean
  onChange?: (newProps: QuestionTitlePropsType) => void
}

export const questionTitleDefaultProps = {
  title: '标题',
  level: 1 as 1 | 2 | 3,
  isCenter: false,
}
