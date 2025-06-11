import type { FC } from 'react'
import { useDispatch } from 'react-redux'
import { changeComponentProps } from '@/store/reducers/questionComponentsSlice'
import { useGetComponentListInfo } from '@/hooks/useGetComponentListInfo'
import {
  type ComponentsPropsType,
  getComponentConfByType,
} from '@/components/question'

const NoProp = () => {
  return <div style={{ textAlign: 'center' }}>未选中组件</div>
}

const ComponentProp: FC = () => {
  const { selectedComponent } = useGetComponentListInfo()
  const { isLocked } = selectedComponent
  const dispatch = useDispatch()

  if (!selectedComponent) {
    return <NoProp />
  }

  const { fe_id, type, props } = selectedComponent
  const selectedComponentConf = getComponentConfByType(type)
  if (!selectedComponentConf) {
    return <NoProp />
  }

  const handleChange = (newProps: ComponentsPropsType) => {
    dispatch(changeComponentProps({ fe_id, newProps }))
  }

  const { PropsComponent } = selectedComponentConf
  return (
    <PropsComponent {...props} onChange={handleChange} disabled={isLocked} />
  )
}

export default ComponentProp
