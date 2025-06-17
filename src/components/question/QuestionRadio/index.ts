import { questionRadioDefaultProps } from './type'
import Component from './Component'
import PropsComponent from './PropsComponent'
import StatComponent from './StatComponent'

export * from './type'

export default {
  title: '问卷单选',
  type: 'questionRadio',
  Component,
  PropsComponent,
  StatComponent,
  defaultProps: questionRadioDefaultProps,
}
