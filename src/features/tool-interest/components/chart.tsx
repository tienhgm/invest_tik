import React from 'react';
import { Line } from '@ant-design/plots';
function Chart({ data }: any) {
  const config = {
    data,
    xField: 'year',
    yField: 'data',
    xAxis: {
      // type: 'timeCat',
      label: {
        style: {
          fill: 'black',
          opacity: 0.9,
          fontSize: 12,
          content: 'Năm'
        },
      }
    },
    tooltip: {
      customContent: (title: any, data: any) => {
        return `<div style="background: '#fff'; padding: 0.5rem; font-size: 0.9rem">
            <div style="font-weight: 600;">Năm ${title}</div><br/>
            <div>Tổng số tiền: <span style="font-weight: 600;">${data[0]?.value}đ</span></div>
          </div>`;
      },
    },
  };
  //   @ts-ignore
  return <Line {...config} />;
}

export default React.memo(Chart);
