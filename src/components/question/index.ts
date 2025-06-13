import type { FC } from 'react'
import QuestionInputConf, { type QuestionInputPropsType } from './QuestionInput'
import QuestionTitleConf, { type QuestionTitlePropsType } from './QuestionTitle'
import QuestionParagraphConf, {
  type QuestionParagraphPropsType,
} from './QuestionParagraph'
import QuestionInfoConf, { type QuestionInfoPropsType } from './QuestionInfo'
import QuestionTextareaConf, {
  type QuestionTextareaPropsType,
} from './QuestionTextarea'
import QuestionRadioConf, { type QuestionRadioPropsType } from './QuestionRadio'
import QuestionCheckboxConf, {
  type QuestionCheckboxPropsType,
} from './QuestionCheckbox'

export type ComponentsPropsType = QuestionInputPropsType &
  QuestionTitlePropsType &
  QuestionParagraphPropsType &
  QuestionInfoPropsType &
  QuestionTextareaPropsType &
  QuestionRadioPropsType &
  QuestionCheckboxPropsType

export type ComponentsConfType = {
  title: string
  type: string
  Component: FC<ComponentsPropsType>
  PropsComponent: FC<ComponentsPropsType>
}

const componentConfList: ComponentsConfType[] = [
  QuestionInputConf,
  QuestionTitleConf,
  QuestionParagraphConf,
  QuestionInfoConf,
  QuestionTextareaConf,
  QuestionRadioConf,
  QuestionCheckboxConf,
]

export const componentConfGroup = [
  {
    groupId: 'textGroup',
    groupName: '文本显示',
    components: [QuestionInfoConf, QuestionTitleConf, QuestionParagraphConf],
  },
  {
    groupId: 'inputGroup',
    groupName: '用户输入',
    components: [QuestionInputConf, QuestionTextareaConf],
  },
  {
    groupId: 'chooseGroup',
    groupName: '用户选择',
    components: [QuestionRadioConf, QuestionCheckboxConf],
  },
]

export const getComponentConfByType = (type: string) =>
  componentConfList.find((item) => item.type === type)
