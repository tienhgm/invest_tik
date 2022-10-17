import { Form, Button, Card, InputNumber } from 'antd';
import { useState } from 'react';
export default function InterestTool() {
  const [isComputed, setIsComputed] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [initInput, setInitInput] = useState<any>(null);
  const onFinish = (values: any) => {
    setInitInput(values);
    let { p, n, m, i } = values;
    let currency = compoundInterest(p, i / 100, m, n);
    // @ts-ignore
    currency = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
      currency
    );
    console.log(currency);

    setResult(currency);
    setIsComputed(true);

    console.log('Success:', values);
  };
  const compoundInterest = (p: any, i: any, m: any, n: any) => {
    return p * Math.pow(1 + i / m, n * m);
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <Card title="Công cụ tính lãi kép" bordered={false}>
      <Form
        name="basic"
        wrapperCol={{ span: 6 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        layout="vertical"
      >
        <Form.Item
          label="Số tiền vốn ban đầu"
          name="p"
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
          rules={[{ required: true, message: 'Hãy nhập số năm gửi' }]}
        >
          <InputNumber max={999} min={0} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          label="Lãi suất (%)"
          name="i"
          rules={[{ required: true, message: 'Hãy nhập lãi suất (%)' }]}
        >
          <InputNumber
            max={100}
            min={0}
            formatter={(value) => `${value}%`}
            style={{ width: '100%' }}
          />
        </Form.Item>
        <Form.Item
          label="Số lần ghép lãi trong năm"
          name="m"
          rules={[{ required: true, message: 'Hãy nhập số lần ghép lãi trong năm' }]}
        >
          <InputNumber max={999} min={0} style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item style={{ marginTop: '2rem' }}>
          <Button type="primary" htmlType="submit">
            Tính toán
          </Button>
        </Form.Item>
      </Form>
      {isComputed && (
        <div>
          Với số tiền ban đầu{' '}
          <b>
            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
              initInput.p
            )}
          </b>
          <br />
          Lãi suất hàng năm: <b>{initInput.i}</b>, Mỗi năm ghép lãi <b>{initInput.m}</b> lần.
          <br />
          Kết quả bạn sẽ có <b>{result}</b> (vnd) sau <b>{initInput.n}</b> năm.
        </div>
      )}
    </Card>
  );
}
