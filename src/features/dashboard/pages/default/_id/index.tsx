import { Breadcrumb } from 'antd';
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
    </div>
  );
}

export default DefaultPackageId;
