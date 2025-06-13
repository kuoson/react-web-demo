import { questionTitleDefaultProps } from './type'
import Component from './Component'
import PropsComponent from './PropsComponent'

export * from './type'

export default {
  title: '问卷标题',
  type: 'questionTitle',
  Component,
  PropsComponent,
  defaultProps: questionTitleDefaultProps,
}
