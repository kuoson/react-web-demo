import { useState, type FC } from 'react'
import { useParams } from 'react-router-dom'
import { Typography, Spin } from 'antd'
import { useRequest } from 'ahooks'
import { reqGetComponentStat } from '@/api/stat'
import { getComponentConfByType } from '@/components/question'

const { Title } = Typography

type PropsType = {
  selectedComponentId: string
  selectedComponentType: string
}

const StatChart: FC<PropsType> = (props: PropsType) => {
  const { selectedComponentId, selectedComponentType } = props
  const { id } = useParams()
  const [stat, setStat] = useState([])

  const { loading } = useRequest(
    async () => {
      if (!id) throw '问卷id为空！'

      if (!selectedComponentId) return
      return await reqGetComponentStat(id, selectedComponentId)
    },
    {
      refreshDeps: [id, selectedComponentId],
      onSuccess: (resData) => {
        setStat(resData?.stat)
      },
    },
  )

  const genChartElem = () => {
    if (!selectedComponentId) return <div>未选中组件</div>

    const { StatComponent } =
      getComponentConfByType(selectedComponentType) || {}
    if (!StatComponent) return <div>该组件无统计列表</div>

    return <StatComponent stat={stat} />
  }

  return (
    <>
      <Title level={5} style={{ margin: '0px' }}>
        图表统计
      </Title>
      <div style={{ textAlign: 'center' }}>
        {loading && <Spin spinning={loading}></Spin>}
        {!loading && <div>{genChartElem()}</div>}
      </div>
    </>
  )
}

export default StatChart
