import { Line } from '@ant-design/plots';
import React, { useEffect, useState } from 'react';

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
    height: 300,
    color: '#2b906d',
    xAxis: {
      // type: 'timeCat',
      tickCount: 8,
    },
    // tooltip: {
    //   fields: ['navCurrent', 'percent'],
    // },
    tooltip: {
      customContent: (title: any, data: any) => {

        return `<div style="background: '#fff'; padding: 0.5rem; font-size: 0.9rem">
            <div style="font-weight: 600;">${title}</div><br/>
            <div>Giá hiện tại: <span style="font-weight: 600;">${data[0]?.data.navCurrent}</span></div>
            <br/>
            <div>Tỉ lệ tăng trưởng: <span style="font-weight: 600;">${data[0]?.data.percent}%</span></div>
          </div>`;
      },
    },
    yAxis: {
      // type: 'timeCat',
      label: {
        formatter: (v: any) => `${v}%`,
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
