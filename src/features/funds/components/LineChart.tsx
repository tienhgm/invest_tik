import { Datum } from '@ant-design/charts';
import { Line } from '@ant-design/plots';
import React, { useEffect, useMemo, useState } from 'react';

interface ILineChart {
  data: any;
}
function LineChart({ data }: ILineChart) {
  const [maxPercent, setMaxPercent] = useState<any>(0);
  const [minPercent, setMinPercent] = useState<any>(0);

  useEffect(() => {
    setMaxPercent(Math.max(...data.map((item: any) => item.percent)));
    setMinPercent(Math.min(...data.map((item: any) => item.percent)));
  }, [data]);

  const config = {
    data,
    xField: 'matchedDate',
    yField: 'percent',
    smooth: true,
    autoFit: 'height',
    xAxis: {
      // type: 'timeCat',
      tickCount: 10,
    },
    tooltip: {
        fields: ['navCurrent', 'percent'],
    },
    yAxis: {
      // type: 'timeCat',
      label: {
        formatter: (v:any) => `${v}%`,
      },
      tickCount: 5,
      max: Math.ceil(maxPercent),
      min: Math.floor(minPercent),
    },
  };

  //   @ts-ignore
  return data && <Line {...config} />;
}

export default LineChart;
