import { GlobalOutlined } from '@ant-design/icons';
import { Select } from 'antd';
import { useTranslation } from 'react-i18next';

const { Option } = Select;

export default function SelectLanguage() {
  const { i18n } = useTranslation();

  const handleChange = (value: string) => {
   i18n.changeLanguage(value)
  };
  return (
    <Select
      placeholder="Language"
      style={{ width: 120 }}
      onChange={handleChange}
      suffixIcon={<GlobalOutlined />}
    >
      <Option value="vi">Tiếng Việt</Option>
      <Option value="en">English</Option>
    </Select>
  );
}
