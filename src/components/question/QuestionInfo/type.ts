export type QuestionInfoPropsType = {
  title?: string
  desc?: string
  isCenter?: boolean
  disabled?: boolean
  onChange?: (newProps: QuestionInfoPropsType) => void
}

export const questionInfoDefaultProps: QuestionInfoPropsType = {
  title: '信息标题',
  desc: '信息描述...',
  isCenter: false,
}
