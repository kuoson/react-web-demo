import Component from './Component'
import PropsComponent from './PropsComponent'
import { questionCheckboxDefaultProps } from './type'

export * from './type'

export default {
  title: '多选标题',
  type: 'questionCheckbox',
  Component,
  PropsComponent,
  defaultProps: questionCheckboxDefaultProps,
}
