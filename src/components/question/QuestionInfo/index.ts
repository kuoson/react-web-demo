import { questionInfoDefaultProps } from './type'
import Component from './Component'
import PropsComponent from './PropsComponent'

export * from './type'

export default {
  title: '问卷信息',
  type: 'questionInfo',
  Component,
  PropsComponent,
  defaultProps: questionInfoDefaultProps,
}
