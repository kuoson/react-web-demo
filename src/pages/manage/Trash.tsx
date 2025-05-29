import { useState, type FC } from 'react'
import { ExclamationCircleFilled } from '@ant-design/icons'
import { Table, Empty, Tag, Button, Space, Modal, Spin } from 'antd'
import type { TableProps } from 'antd'
import { useLoadQuestionList } from '@/hooks/useLoadQuestionLIst'
import { type PropsType } from '@/components/QuestionCard'
import ListSearch from '@/components/ListSearch'
import ListPagination from '@/components/ListPagination'
import styles from './common.module.scss'

const { confirm } = Modal

const Trash: FC = () => {
  const [selectedIds, setSelectedIds] = useState<React.Key[]>([])
  const { data = {}, loading } = useLoadQuestionList({ isDeleted: true })
  const { list = [], total = 0 } = data

  const isOptionDisabled = selectedIds.length === 0

  const del = () => {
    confirm({
      title: '确认彻底删除该问卷？',
      icon: <ExclamationCircleFilled />,
      content: '删除以后不可以找回',
      onOk() {
        console.log('OK')
      },
    })
  }

  const tableColumn: TableProps<PropsType>['columns'] = [
    {
      title: '标题',
      dataIndex: 'title',
    },
    {
      title: '是否发布',
      dataIndex: 'isPublished',
      render: (isPublished: boolean) => (
        <>
          {isPublished ? (
            <Tag color="processing">已发布</Tag>
          ) : (
            <Tag>未发布</Tag>
          )}
        </>
      ),
    },
    {
      title: '答卷',
      dataIndex: 'answerCount',
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
    },
  ]

  const TableEle = (
    <>
      <Space>
        <Button type="primary" disabled={isOptionDisabled}>
          恢复
        </Button>
        <Button danger disabled={isOptionDisabled} onClick={del}>
          彻底删除
        </Button>
      </Space>
      <Spin spinning={loading}>
        <Table
          columns={tableColumn}
          dataSource={list}
          pagination={false}
          rowKey={(row) => row._id} // 或 rowKey="_id"
          rowSelection={{
            type: 'checkbox',
            onChange: (selectedRowKeys: React.Key[]) => {
              setSelectedIds(selectedRowKeys)
            },
          }}
        />
      </Spin>
    </>
  )

  return (
    <div className={styles.wrapper}>
      <div className={styles.head}>
        <h3>回收站</h3>
        <div>
          <ListSearch />
        </div>
      </div>
      <div className={styles.content}>
        <Spin spinning={loading}>
          {list.length > 0
            ? TableEle
            : !loading && <Empty description="暂无数据" />}
        </Spin>
      </div>
      {list.length > 0 && (
        <div className={styles.footer}>
          <ListPagination total={total} />
        </div>
      )}
    </div>
  )
}

export default Trash
