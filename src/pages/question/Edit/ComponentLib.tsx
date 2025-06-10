import type { FC } from 'react'
import { Typography } from 'antd'
import { useDispatch } from 'react-redux'
import { nanoid } from 'nanoid'
import { addComponent } from '@/store/reducers/questionComponentsSlice'
import {
  componentConfGroup,
  type ComponentsConfType,
} from '@/components/question/index'
import styles from './ComponentLib.module.scss'

const { Title } = Typography

const GenComponent: FC<ComponentsConfType> = (props: ComponentsConfType) => {
  const { Component, title, type } = props
  const dispatch = useDispatch()

  const handleClick = () => {
    dispatch(
      addComponent({
        fe_id: nanoid(),
        title,
        type,
      }),
    )
  }

  return (
    <div className={styles['component-wrapper']} onClick={handleClick}>
      <div className={styles.component}>
        <Component />
      </div>
    </div>
  )
}

const ComponentLib: FC = () => {
  return (
    <>
      {componentConfGroup.map((item, index) => {
        const { groupName, components } = item

        return (
          <div key={index}>
            <Title level={5} style={{ marginTop: index > 0 ? '20px' : '0px' }}>
              {groupName}
            </Title>
            <div>
              {components.map((cpn, index) => (
                <div key={index}>
                  <GenComponent {...cpn} />
                </div>
              ))}
            </div>
          </div>
        )
      })}
    </>
  )
}

export default ComponentLib
