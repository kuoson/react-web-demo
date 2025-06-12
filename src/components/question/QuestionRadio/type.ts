export type OptionType = {
  value: string
  text: string
}

export type QuestionRadioPropsType = {
  title?: string
  isVertical?: boolean
  options: OptionType[]
  value?: string
  isCenter?: boolean
  disabled?: boolean
  onChange?: (newProps: QuestionRadioPropsType) => void
}

export const questionRadioDefaultProps: QuestionRadioPropsType = {
  title: '单选标题',
  isVertical: false,
  options: [
    {
      value: 'item1',
      text: '选项1',
    },
    {
      value: 'item2',
      text: '选项2',
    },
    {
      value: 'ite3',
      text: '选项3',
    },
  ],
  value: '',
}
