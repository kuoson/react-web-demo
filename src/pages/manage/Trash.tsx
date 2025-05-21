import { useState, type FC } from 'react'
import { ExclamationCircleFilled } from '@ant-design/icons'
import { Table, Empty, Tag, Button, Space, Modal } from 'antd'
import type { TableProps } from 'antd'
import { type PropsType } from '@/components/QuestionCard'
import styles from './common.module.scss'

const { confirm } = Modal

const listMock: PropsType[] = [
  {
    _id: '1',
    title: '问卷一',
    createdAt: '2025-05-20',
    answerCount: 10,
    isPublished: true,
    isStar: false,
  },
  {
    _id: '2',
    title: '问卷二',
    createdAt: '2025-05-18',
    answerCount: 5,
    isPublished: false,
    isStar: true,
  },
  {
    _id: '3',
    title: '用户满意度调查',
    createdAt: '2025-04-30',
    answerCount: 25,
    isPublished: true,
    isStar: true,
  },
  {
    _id: '4',
    title: '产品反馈问卷',
    createdAt: '2025-03-15',
    answerCount: 8,
    isPublished: false,
    isStar: false,
  },
  {
    _id: '5',
    title: '市场调研',
    createdAt: '2025-02-10',
    answerCount: 12,
    isPublished: true,
    isStar: false,
  },
  {
    _id: '6',
    title: '员工满意度调查',
    createdAt: '2025-01-22',
    answerCount: 18,
    isPublished: true,
    isStar: true,
  },
  {
    _id: '7',
    title: '活动报名表',
    createdAt: '2024-12-05',
    answerCount: 30,
    isPublished: false,
    isStar: false,
  },
  {
    _id: '8',
    title: '客户需求调研',
    createdAt: '2024-11-18',
    answerCount: 20,
    isPublished: true,
    isStar: true,
  },
]

const Trash: FC = () => {
  const [selectedIds, setSelectedIds] = useState<React.Key[]>([])

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
      <Table
        columns={tableColumn}
        dataSource={listMock}
        pagination={false}
        rowKey={(row) => row._id} // 或 rowKey="_id"
        rowSelection={{
          type: 'checkbox',
          onChange: (selectedRowKeys: React.Key[]) => {
            setSelectedIds(selectedRowKeys)
          },
        }}
      />
    </>
  )

  return (
    <div className={styles.wrapper}>
      <div className={styles.head}>
        <h3>回收站</h3>
        <div>（搜索）</div>
      </div>
      <div className={styles.content}>
        {listMock.length > 0 ? TableEle : <Empty description="暂无数据" />}
      </div>
      {listMock.length > 0 && <div className={styles.footer}>分页</div>}
    </div>
  )
}

export default Trash
