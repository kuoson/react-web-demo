export type OptionType = {
  value: string
  text: string
  checked: boolean
}

export type QuestionCheckboxPropsType = {
  title?: string
  isVertical?: boolean
  list?: OptionType[]
  isCenter?: boolean
  disabled?: boolean
  onChange?: (newProps: QuestionCheckboxPropsType) => void
}

export const questionCheckboxDefaultProps: QuestionCheckboxPropsType = {
  title: '多选标题',
  isVertical: false,
  list: [
    { value: 'item1', text: '选项1', checked: false },
    { value: 'item2', text: '选项2', checked: false },
    { value: 'item3', text: '选项3', checked: false },
  ],
}

export type QuestionCheckboxStatPropsType = {
  stat: Array<{ name: string; count: number }>
}
