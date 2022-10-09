import React from 'react';
import { Pie, measureTextWidth } from '@ant-design/plots';
interface IDonutChartPackage {
  data: any;
  isNoLegend?: boolean;
  isSpiderLabel?: boolean;
}
function DonutChartPackage({
  data,
  isNoLegend = false,
  isSpiderLabel = false,
}: IDonutChartPackage) {
  function renderStatistic(containerWidth: any, text: string, style: any) {
    const { width: textWidth, height: textHeight } = measureTextWidth(text, style);
    const R = containerWidth / 2; // r^2 = (w / 2)^2 + (h - offsetY)^2

    let scale = 1;

    if (containerWidth < textWidth) {
      scale = Math.min(
        Math.sqrt(
          Math.abs(Math.pow(R, 2) / (Math.pow(textWidth / 2, 2) + Math.pow(textHeight, 2)))
        ),
        1
      );
    }

    const textStyleStr = `width:${containerWidth}px;`;
    return `<div style="${textStyleStr};font-size:${scale}em;line-height:${
      scale < 1 ? 1 : 'inherit'
    };">${text}</div>`;
  }
  let config = {
    appendPadding: 10,
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 1,
    innerRadius: 0.64,
    meta: {
      value: {
        formatter: (v: any) => `${v}`,
      },
    },
    label: {
      type: 'inner',
      offset: '-50%',
      style: {
        textAlign: 'center',
      },
      autoRotate: false,
      content: '{value}',
    },
    statistic: {
      title: {
        offsetY: -4,
        customHtml: (container: any, view: any, datum: any) => {
          const { width, height } = container.getBoundingClientRect();
          const d = Math.sqrt(Math.pow(width / 2, 2) + Math.pow(height / 2, 2));
          const text = datum ? datum.type : 'Đã chọn';
          return renderStatistic(d, text, {
            fontSize: 24,
          });
        },
      },
      content: {
        offsetY: 4,
        style: {
          fontSize: '32px',
        },
        customHtml: (container: any, view: any, datum: any, data: any) => {
          const { width } = container.getBoundingClientRect();
          const text = datum ? `${datum.value}%` : `${data.length} Quỹ`;
          return renderStatistic(width, text, {
            fontSize: 32,
          });
        },
      },
    },
    interactions: [
      {
        type: 'element-selected',
      },
      {
        type: 'element-active',
      },
      {
        type: 'pie-statistic-active',
      },
    ],
  };
  if (isNoLegend) {
    // @ts-ignore
    config = { ...config, legend: false };
  }
  if (isSpiderLabel) {
    config = {
      ...config,
      appendPadding: 20,
      label: {
        type: 'spider',
        // @ts-ignore
        labelHeight: 28,
        content: '{name}\n{percentage}',
        autoHide: false
      },
    };
  }
  return <Pie {...config} style={{ width: '100%', height: '100%' }} />;
}

export default React.memo(DonutChartPackage);
