import { Form, Button, Card, InputNumber } from 'antd';
import { useState } from 'react';
import Chart from '../components/chart';
import './index.scss';
export default function InterestTool() {
  const [isComputed, setIsComputed] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [initInput, setInitInput] = useState<any>(null);
  const [dataChart, setDataChart] = useState<any>([]);
  const onFinish = (values: any) => {
    setInitInput(values);
    setDataChart([]);
    let { p, n, m, i } = values;
    let currency = compoundInterest(p, i / 100, m, n);
    // @ts-ignore
    setResult(currency);
    setIsComputed(true);
    let dataForChart = [];
    if (n >= 1) {
      for (let idx = 0; idx < Math.floor(n); idx++) {
        dataForChart.push({ data: compoundInterest(p, i / 100, m, idx), year: idx });
      }
    }
    dataForChart.push({
      data: currency,
      year: n,
    });
    setDataChart(dataForChart);
  };
  const compoundInterest = (p: any, i: any, m: any, n: any) => {
    return (p * Math.pow(1 + i / m, n * m))
      .toFixed(0)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <Card title="Công cụ tính lãi kép" bordered={false}>
      <div className="tool">
        <Form
          className="tool__interest"
          name="basic"
          wrapperCol={{ span: 12 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
        >
          <div style={{ display: 'flex', width: '70%' }}>
            <Form.Item
              label="Số tiền vốn ban đầu"
              name="p"
              style={{ width: '100%' }}
              rules={[{ required: true, message: 'Nhập số tiền gửi' }]}
            >
              <InputNumber
                style={{ width: '100%' }}
                formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              />
            </Form.Item>

            <Form.Item
              label="Thời gian gửi (năm)"
              name="n"
              style={{ width: '100%' }}
              rules={[{ required: true, message: 'Hãy nhập số năm gửi' }]}
            >
              <InputNumber max={999} min={0} style={{ width: '100%' }} />
            </Form.Item>
          </div>
          <div style={{ display: 'flex', width: '70%' }}>
            <Form.Item
              label="Lãi suất (%)"
              name="i"
              style={{ width: '100%' }}
              rules={[{ required: true, message: 'Hãy nhập lãi suất (%)' }]}
            >
              <InputNumber
                min={0}
                formatter={(value) => `${value}%`}
                style={{ width: '100%' }}
              />
            </Form.Item>
            <Form.Item
              label="Số lần ghép lãi trong năm"
              name="m"
              style={{ width: '100%' }}
              rules={[{ required: true, message: 'Hãy nhập số lần ghép lãi trong năm' }]}
            >
              <InputNumber max={999} min={0} style={{ width: '100%' }} />
            </Form.Item>
          </div>
          <br />
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Tính toán
            </Button>
          </Form.Item>
        </Form>
        {isComputed && (
          <div>
            Với số tiền ban đầu{' '}
            <b>{initInput.p.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} (đ)</b>
            <br />
            Lãi suất hàng năm: <b>{initInput.i}%</b>, Mỗi năm ghép lãi <b>{initInput.m}</b> lần.
            <br />
            Kết quả bạn sẽ có <b>{result} (đ)</b> sau <b>{initInput.n}</b> năm.
            <br />
            <br />
            <br />
            <div style={{ width: '50%' }}>{dataChart && <Chart data={dataChart} />}</div>
          </div>
        )}
      </div>
    </Card>
  );
}
