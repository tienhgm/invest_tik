import { Progress, Spin } from 'antd';
import AuthLayout from 'components/Layout/AuthLayout';
import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import IMG_FRONT from 'assets/images/front_img.png';
import IMG_BACK from 'assets/images/back_img.png';
import './index.scss';
import { errorMes, successMes } from 'helper/notify';
import authApi from 'apis/auth';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { CheckCircleOutlined } from '@ant-design/icons';
import { setIsGetMe } from 'app/slices/userSlice';
function Ekyc() {
  const history = useHistory();
  const dispatch = useAppDispatch();
  let userInfo = useAppSelector((state) => state.user.userInfo);
  const [formUpload, setFormUpload] = useState<any>({ imgFront: null, imgBack: null });
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [imgFront, setImgFront] = useState<any>(null);
  const [imgBack, setImgBack] = useState<any>(null);
  const refImgFront = useRef<any>(null);
  const refImgBack = useRef<any>(null);
  const onUploadFile = () => {
    refImgFront.current.click();
  };
  const onUploadFileBack = () => {
    refImgBack.current.click();
  };

  const setImage = (e: any) => {
    const file = e.target.files[0];
    const whiteList = ['image/png', 'image/jpeg', 'image/jpg'];
    if (file) {
      if (!whiteList.includes(file.type)) {
        errorMes('Hãy tải tệp dạng JPG、JPEG、PNG');
        return;
      }
      // check file > 5MB
      if (file.size / 1024 / 1024 > 5) {
        errorMes('File cần nhỏ hơn 5MB');
        return;
      }
      linkToShowFile(file);
      setFormUpload((prev: any) => ({
        ...prev,
        imgFront: file,
      }));
    }
  };
  const setImageBack = (e: any) => {
    const file = e.target.files[0];
    const whiteList = ['image/png', 'image/jpeg', 'image/jpg'];
    if (file) {
      if (!whiteList.includes(file.type)) {
        errorMes('Hãy tải tệp dạng JPG、JPEG、PNG');
        return;
      }
      // check file > 5MB
      if (file.size / 1024 / 1024 > 5) {
        errorMes('File cần nhỏ hơn 5MB');
        return;
      }
      linkToShowFileBack(file);
      setFormUpload((prev: any) => ({
        ...prev,
        imgBack: file,
      }));
    }
  };
  const linkToShowFile = (file: any) => {
    let reader = new FileReader();
    reader.onload = (e: any) => {
      setImgFront(e.target.result);
    };
    reader.readAsDataURL(file);
  };
  const linkToShowFileBack = (file: any) => {
    let reader = new FileReader();
    reader.onload = (e: any) => {
      setImgBack(e.target.result);
    };
    reader.readAsDataURL(file);
  };
  const onBackProgress0 = async() => {
    if(progress === 0){
      await authApi.logout();
      window.location.reload();
    }
    if (progress === 50) {
      setProgress(0);
    }
  };
  const onUploadImg = async () => {
    try {
      if (!progress) {
        await authApi.uploadFrontImg(formUpload.imgFront);
        setProgress(50);
      } else {
        await authApi.uploadBackImg(formUpload.imgBack);
        try {
          setLoading(true);
          await authApi.verifyImgUpload();
          setProgress(100);
          successMes('Bạn đã xác thực thành công!');
          setLoading(false);
          dispatch(setIsGetMe(true));
          history.push('/dashboard');
        } catch (error) {
          setLoading(false);
          errorMes('Bạn đã xác thực thất bại');
        }
      }
    } catch (error) {
      errorMes('Tải ảnh lên thất bại!');
    }
  };
  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    }
    return () => {};
  }, []);
  return (
    <AuthLayout>
      <div className="title">Xác minh danh tính của bạn bằng cách tải lên ảnh CCCD</div>
      <Progress percent={progress} />
      {progress === 0 ? (
        <div className="front">
          <div className="front__title">Mặt trước</div>
          <img
            src={!imgFront ? IMG_FRONT : imgFront}
            alt="front_card"
            className="img_card"
            onClick={onUploadFile}
          />
          <input
            type="file"
            id="imgFront"
            className="front__upload_file"
            ref={refImgFront}
            onChange={setImage}
          />
        </div>
      ) : progress === 50 ? (
        <div className="front">
          <div className="front__title">Mặt sau</div>
          <img
            src={!imgBack ? IMG_BACK : imgBack}
            alt="front_card"
            className="img_card"
            onClick={onUploadFileBack}
          />
          <input
            type="file"
            id="imgBack"
            className="front__upload_file"
            ref={refImgBack}
            onChange={setImageBack}
          />
        </div>
      ) : (
        <div className="circle_success">
          {!loading ? <CheckCircleOutlined /> : <Spin size="large" />}
        </div>
      )}
      <div className="bottom">
        <div className="bottom__prev" onClick={onBackProgress0}>
          {progress === 50 ? 'Trở về' : 'Đăng xuất'}
        </div>
        <div
          className={!formUpload.imgFront ? 'bottom__next disabled' : 'bottom__next'}
          onClick={onUploadImg}
        >
          {!progress ? 'Tiếp tục' : progress === 50 ? 'Hoàn tất' : ''}
        </div>
      </div>
    </AuthLayout>
  );
}

export default Ekyc;
