import { Form, Input, Button, Card } from 'antd';
import styles from './style.module.scss';
export default function InterestTool() {
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <Card title="Compound interest tool" bordered={false} className={styles.tool}>
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
          name="initialInvestment"
          rules={[{ required: true, message: 'Please input amount of money!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Length of time in years"
          name="time"
          rules={[{ required: true, message: 'Please input length of time in years!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item style={{marginTop: '2rem'}}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
