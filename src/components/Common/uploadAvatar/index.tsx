import { Upload } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { notify } from 'helper/notify';
interface IUploadAvatar {
  disabled: boolean;
  previewImg: string;
  loading: boolean;
  onUpdateAvatar: (file: any) => any;
}
export default function UploadAvatar({
  loading,
  previewImg,
  disabled,
  onUpdateAvatar,
}: IUploadAvatar) {
  const [imageUrl, setImageUrl] = useState('');
  function beforeUpload(file: any) {
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      notify('error', 'Image must smaller than 2MB!', null);
    }
    return isLt2M;
  }
  // const previewImg = useAppSelector((state) => state.auth.user.avatar);
  const handleUploadImg = async (info: any) => {
    if (info && info.file) {
      onUpdateAvatar(info.file)
    }
  };
  useEffect(() => {
    setImageUrl(previewImg);
  }, [previewImg]);
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  return (
    <div>
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        accept=".png, .jpg"
        showUploadList={false}
        customRequest={handleUploadImg}
        beforeUpload={beforeUpload}
        disabled={disabled}
      >
        {imageUrl ? (
          <img src={`http://${imageUrl}`} alt="avatar" style={{ width: '100%' }} />
        ) : (
          uploadButton
        )}
      </Upload>
    </div>
  );
}
