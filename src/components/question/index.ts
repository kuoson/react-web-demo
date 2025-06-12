import type { FC } from 'react'
import QuestionInputConf, { type QuestionInputPropsType } from './QuestionInput'
import QuestionTitleConf, { type QuestionTitlePropsType } from './QuestionTitle'
import QuestionParagraphConf, {
  type QuestionParagraphPropsType,
} from './QuestionParagraph'

export type ComponentsPropsType = QuestionInputPropsType &
  QuestionTitlePropsType &
  QuestionParagraphPropsType

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
]

export const componentConfGroup = [
  {
    groupName: '文本显示',
    components: [QuestionTitleConf],
  },
  {
    groupName: '用户输入',
    components: [QuestionInputConf, QuestionParagraphConf],
  },
]

export const getComponentConfByType = (type: string) =>
  componentConfList.find((item) => item.type === type)
