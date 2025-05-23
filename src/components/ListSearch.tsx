import { useState, useEffect } from 'react'
import type { FC, ChangeEvent } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { Input } from 'antd'
import { LIST_SEARCH_PARAM_KEY } from '@/const'

const { Search } = Input

const ListSearch: FC = () => {
  const { pathname } = useLocation()
  const nav = useNavigate()

  const [searchVal, setSearchVal] = useState('')

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchVal(event.target.value)
  }

  const [searchParams] = useSearchParams()
  const handleSearch = (val: string) => {
    nav({
      pathname,
      search: `${LIST_SEARCH_PARAM_KEY}=${val}`,
    })
  }

  useEffect(() => {
    setSearchVal(searchParams.get(LIST_SEARCH_PARAM_KEY) || '')
  }, [searchParams])

  return (
    <Search
      placeholder="请输入关键字"
      allowClear
      value={searchVal}
      onChange={handleChange}
      onSearch={handleSearch}
      style={{ width: 200 }}
    />
  )
}

export default ListSearch
