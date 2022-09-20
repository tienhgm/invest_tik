import { Breadcrumb, Card } from 'antd';
import packageApi from 'apis/packages';
import React, { useEffect, useState } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import './index.scss';
function DefaultPackageId() {
  const match = useRouteMatch<any>();
  const history = useHistory();
  const [packageDetail, setPackageDetail] = useState<any>(null);
  const onGetDefaultById = async (id: string) => {
    try {
      const { data } = await packageApi.getDetailPackageById(id);
      if (data) {
        setPackageDetail(data);
      }
    } catch (error) {
      history.push('/dashboard/default');
    }
  };
  const onGoBack = (link: string) => {
    history.push(link);
  };
  useEffect(() => {
    onGetDefaultById(match.params.id);
    return () => {
      setPackageDetail(null);
    };
  }, [match.params.id]);

  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item>
          <span className="link" onClick={() => onGoBack('/dashboard')}>
            Dashboard
          </span>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <span className="link" onClick={() => onGoBack('/dashboard/default')}>
            Default
          </span>
        </Breadcrumb.Item>
        <Breadcrumb.Item>{match.params.id}</Breadcrumb.Item>
      </Breadcrumb>
      <br />
      {packageDetail && (
        <div className="package">
          <div className="package__block">
            <img src={packageDetail.avatar} className="package__block--img" alt="avatar_package" />
            <br />
            <div className="package__block--title">{packageDetail.name}</div>
            <div className="package__block--repair">Sửa tên gói</div>
            <br />
            <div className="package__block--content">
              Phù hợp với những nhà đầu tư muốn thêm kênh sinh lời ổn định, với mức độ rủi ro thấp
              nhất.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DefaultPackageId;
