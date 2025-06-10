import type { FC } from 'react'
import QuestionInputConf, { type QuestionInputPropsType } from './QuestionInput'
import QuestionTitleConf, { type QuestionTitlePropsType } from './QuestionTitle'

export type ComponentsPropsType =
  | QuestionInputPropsType
  | QuestionTitlePropsType

export type ComponentsConfType = {
  title: string
  type: string
  Component: FC<ComponentsPropsType>
}

const componentConfList: ComponentsConfType[] = [
  QuestionInputConf,
  QuestionTitleConf,
]

export const getComponentConfByType = (type: string) =>
  componentConfList.find((item) => item.type === type)
