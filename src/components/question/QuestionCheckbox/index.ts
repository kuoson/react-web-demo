import Component from './Component'
import PropsComponent from './PropsComponent'
import { questionCheckboxDefaultProps } from './type'

export * from './type'

export default {
  title: '问卷多选',
  type: 'questionCheckbox',
  Component,
  PropsComponent,
  defaultProps: questionCheckboxDefaultProps,
}
