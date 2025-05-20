import type { FC } from 'react'
import { Outlet } from 'react-router-dom'

const QuestionLayout: FC = () => {
  return (
    <>
      <Outlet />
    </>
  )
}

export default QuestionLayout
