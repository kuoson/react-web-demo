import { useEffect, type FC, type ReactNode } from 'react'

interface PageWrapperProps {
  title?: string
  children: ReactNode
}

const PageWrapper: FC<PageWrapperProps> = ({ title, children }) => {
  useEffect(() => {
    document.title = title || 'react-demo'
  }, [title])
  return children
}

export default PageWrapper
