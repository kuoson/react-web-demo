import { questionCheckboxDefaultProps } from './type'
import Component from './Component'
import PropsComponent from './PropsComponent'
import StatComponent from './StatComponent'

export * from './type'

export default {
  title: '问卷多选',
  type: 'questionCheckbox',
  Component,
  PropsComponent,
  StatComponent,
  defaultProps: questionCheckboxDefaultProps,
}
