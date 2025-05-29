import { useEffect, useState } from 'react'
import type { FC } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { Pagination } from 'antd'
import {
  LIST_SEARCH_PARAM_CUR_PAGE_KEY,
  LIST_SEARCH_PARAM_PAGE_SIZE_KEY,
} from '@/const'

type PropsType = {
  total: number
}
const ListPagination: FC<PropsType> = (props) => {
  const { pathname } = useLocation()
  const nav = useNavigate()
  const [searchParams] = useSearchParams()

  const { total } = props
  const [curPage, setCurPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const handleChange = (page: number, pageSize: number) => {
    setCurPage(page)
    setPageSize(pageSize)
    searchParams.set(LIST_SEARCH_PARAM_CUR_PAGE_KEY, page.toString())
    searchParams.set(LIST_SEARCH_PARAM_PAGE_SIZE_KEY, pageSize.toString())

    nav({
      pathname,
      search: searchParams.toString(),
    })
  }

  useEffect(() => {
    setCurPage(
      parseInt(searchParams.get(LIST_SEARCH_PARAM_CUR_PAGE_KEY) || '1'),
    )
    setPageSize(
      parseInt(searchParams.get(LIST_SEARCH_PARAM_PAGE_SIZE_KEY) || '10'),
    )
  }, [searchParams])

  return (
    <Pagination
      align="center"
      current={curPage}
      pageSize={pageSize}
      total={total}
      onChange={handleChange}
    />
  )
}

export default ListPagination
