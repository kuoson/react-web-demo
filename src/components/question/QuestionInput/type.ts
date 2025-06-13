export type QuestionInputPropsType = {
  title?: string
  placeholder?: string
  disabled?: boolean
  onChange?: (newProps: QuestionInputPropsType) => void
}

export const questionInputDefaultProps = {
  title: '输入框标题',
  placeholder: '请输入文本',
}
