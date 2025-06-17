import { useState, type FC } from 'react'
import { useParams } from 'react-router-dom'
import { useRequest } from 'ahooks'
import { Typography, Table, Spin, Pagination } from 'antd'
import { reqGetQuestionStatList } from '@/api/stat'
import useGetComponentListInfo from '@/hooks/useGetComponentListInfo'

const { Title } = Typography

type PropsType = {
  selectedComponentId: string
  onSetSelectedComponentId: (id: string) => void
  onSetSelectedComponentType: (type: string) => void
}

const StatTable: FC<PropsType> = (props: PropsType) => {
  const {
    selectedComponentId,
    onSetSelectedComponentId,
    onSetSelectedComponentType,
  } = props

  const { id } = useParams()
  const [total, setTotal] = useState()
  const [list, setList] = useState()
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const { loading } = useRequest(
    async () => {
      if (!id) {
        throw '问卷id为空！'
      }

      return await reqGetQuestionStatList(id, {
        page: 1,
        pageSize: 10,
      })
    },
    {
      refreshDeps: [id, page, pageSize],
      onSuccess: (resData) => {
        const { total, list } = resData

        setTotal(total)
        setList(list)
      },
    },
  )

  const { componentList } = useGetComponentListInfo()
  const columns = componentList.map((c) => {
    const { fe_id, title, props, type } = c
    const colTitle = props.title || title

    return {
      title: (
        <div
          style={{ cursor: 'pointer' }}
          onClick={() => {
            onSetSelectedComponentId(fe_id)
            onSetSelectedComponentType(type)
          }}
        >
          <span
            style={{
              color: fe_id === selectedComponentId ? '#1890ff' : 'inherit',
            }}
          >
            {colTitle}
          </span>
        </div>
      ),
      dataIndex: fe_id,
    }
  })

  return (
    <div>
      <Title level={5} style={{ margin: '0px' }}>
        答卷数量：{total}
      </Title>
      {loading && (
        <div style={{ textAlign: 'center' }}>
          <Spin />
        </div>
      )}
      <div style={{ marginTop: '20px', height: '600px', overflow: 'auto' }}>
        {!loading && (
          <Table
            dataSource={list}
            columns={columns}
            rowKey="_id"
            pagination={false}
          />
        )}
      </div>
      <div style={{ marginTop: '20px' }}></div>
      <Pagination
        total={total}
        current={page}
        pageSize={pageSize}
        align="end"
        onChange={(page, pageSize) => {
          setPage(page)
          setPageSize(pageSize)
        }}
      />
    </div>
  )
}

export default StatTable
