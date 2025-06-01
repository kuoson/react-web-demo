import { useState, type FC } from 'react'
import { ExclamationCircleFilled } from '@ant-design/icons'
import { Table, Empty, Tag, Button, Space, Modal, Spin, message } from 'antd'
import type { TableProps } from 'antd'
import { useRequest } from 'ahooks'
import { reqUpdateQuestion, reqDeleteQuestion } from '@/api/question'
import { useLoadQuestionList } from '@/hooks/useLoadQuestionList'
import { type PropsType } from '@/components/QuestionCard'
import ListSearch from '@/components/ListSearch'
import ListPagination from '@/components/ListPagination'
import styles from './common.module.scss'

const { confirm } = Modal

const Trash: FC = () => {
  const [selectedIds, setSelectedIds] = useState<React.Key[]>([])
  const {
    data = {},
    loading,
    refresh: refreshList,
  } = useLoadQuestionList({ isDeleted: true })
  const { list = [], total = 0 } = data

  const isOptionDisabled = selectedIds.length === 0

  const { loading: recoverLoading, run: handleRecover } = useRequest(
    async () => {
      for await (const id of selectedIds) {
        await reqUpdateQuestion(id.toString(), { isDeleted: false })
      }
    },
    {
      manual: true,
      onSuccess: () => {
        message.success('恢复成功')
        setSelectedIds([])
        refreshList()
      },
    },
  )

  const { loading: deleteLoading, run: handleConfirmDel } = useRequest(
    async () => {
      await reqDeleteQuestion(selectedIds as string[])
    },
    {
      manual: true,
      onSuccess: () => {
        message.success('删除成功')
        setSelectedIds([])
        refreshList()
      },
    },
  )

  const handleDel = () => {
    confirm({
      title: '确认彻底删除该问卷？',
      icon: <ExclamationCircleFilled />,
      content: '删除以后不可以找回',
      onOk: handleConfirmDel,
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
      <Space style={{ marginBottom: '10px' }}>
        <Button
          type="primary"
          disabled={isOptionDisabled}
          loading={recoverLoading}
          onClick={handleRecover}
        >
          恢复
        </Button>
        <Button
          danger
          disabled={isOptionDisabled}
          loading={deleteLoading}
          onClick={handleDel}
        >
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
