import { useState, useEffect, useRef } from 'react'
import type { FC } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Spin } from 'antd'
import { useRequest } from 'ahooks'
import { reqGetQuestionList } from '@/api/question'
import { LIST_SEARCH_PARAM_KEY } from '@/const'
import QuestionCard, { type PropsType } from '@/components/QuestionCard'
import ListSearch from '@/components/ListSearch'
import styles from './common.module.scss'

const List: FC = () => {
  const [searchParams] = useSearchParams()

  const loadMoreRef = useRef<HTMLDivElement | null>(null)
  const [curPage, setCurPage] = useState(1)
  const [list, setList] = useState([])
  const [total, setTotal] = useState(0)
  const [isFirst, setIsFirst] = useState(true)

  const isHaveMore = total > list.length

  const triLoadMore = () => {
    if (!loadMoreRef.current) {
      return
    }

    const rect = loadMoreRef.current.getBoundingClientRect()
    const windowHeight =
      window.innerHeight || document.documentElement.clientHeight
    if (!(rect.top < windowHeight && rect.bottom > 0)) {
      return
    }

    if (!isHaveMore) {
      return
    }

    loadMore()
  }

  const { loading, run: loadMore } = useRequest(
    async () => {
      const resData = await reqGetQuestionList({
        keyword: searchParams.get(LIST_SEARCH_PARAM_KEY) || '',
        page: curPage,
        pageSize: 10,
      })
      setCurPage(curPage + 1)

      return resData
    },
    {
      debounceWait: 500,
      manual: true,
      onSuccess: (result) => {
        const { list: resList, total } = result
        setList(list.concat(resList))
        setTotal(total)
        setIsFirst(false)
      },
    },
  )

  useEffect(() => {
    setCurPage(1)
    setList([])
    setTotal(0)

    loadMore()
  }, [searchParams])

  useEffect(() => {
    window.addEventListener('scroll', triLoadMore)

    return () => {
      window.removeEventListener('scroll', triLoadMore)
    }
  }, [isHaveMore]) // 监听 isHaveMore 的作用是，如果 isHaveMore 依赖的数据更新了，但没有监听的话，那么绑定的还是之前的旧照，即还是旧值

  return (
    <div className={styles.wrapper}>
      <div className={styles.head}>
        <h3>我的问卷</h3>
        <div>
          <ListSearch />
        </div>
      </div>
      <div className={styles.content}>
        {list.length > 0 &&
          list.map((item: PropsType) => (
            <QuestionCard key={item._id} {...item} />
          ))}
      </div>
      <div className={styles.footer} ref={loadMoreRef}>
        <Spin spinning={loading}>
          {isFirst || isHaveMore ? 'load more...' : 'no more'}
        </Spin>
      </div>
    </div>
  )
}

export default List
