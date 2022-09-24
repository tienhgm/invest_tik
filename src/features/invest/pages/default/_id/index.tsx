import React, { useEffect, useMemo, useState } from 'react';
import { Breadcrumb } from 'antd';
import packageApi from 'apis/packages';
import { useHistory, useRouteMatch } from 'react-router-dom';
import PieChartPackage from '../../../components/PieChartPackage';
import './index.scss';
function DefaultPackageId() {
  const match = useRouteMatch<any>();
  const history = useHistory();
  const [isDetail, setIsDetail] = useState<boolean>(false);
  const [packageDetail, setPackageDetail] = useState<any>(null);
  const onGetDefaultById = async (id: string) => {
    try {
      const { data } = await packageApi.getDetailPackageById(id);
      if (data) {
        setPackageDetail(data);
      }
    } catch (error) {
      history.push('/invest/default');
    }
  };
  const onGoBack = (link: string) => {
    history.push(link);
  };
  const computedDataPieChart = (data: any) => {
    if (data) {
      return data.map((item: any) => {
        return { ...item, value: item.percentage, type: item.code };
      });
    }
  };
  let dataPieChart = useMemo(
    () => computedDataPieChart(packageDetail?.allocation),
    [packageDetail?.allocation]
  );
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
          <span className="link" onClick={() => onGoBack('/invest')}>
            Invest
          </span>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <span className="link" onClick={() => onGoBack('/invest/payment')}>
            Payment
          </span>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <span className="link" onClick={() => onGoBack('/invest/payment/default')}>
            Default
          </span>
        </Breadcrumb.Item>
        <Breadcrumb.Item>{match.params.id}</Breadcrumb.Item>
      </Breadcrumb>
      <br />
      {!isDetail && packageDetail && (
        <>
          <div className="package">
            <div className="package__block">
              <img
                src={packageDetail.avatar}
                className="package__block--img"
                alt="avatar_package"
              />
              <br />
              <div className="package__block--title">{packageDetail.name}</div>
              <div className="package__block--repair">Sửa tên gói</div>
              <br />
              <div className="package__block--content">
                Phù hợp với những nhà đầu tư muốn thêm kênh sinh lời ổn định, với mức độ rủi ro thấp
                nhất.
              </div>
            </div>
            <div className="package__block">
              <div className="package__block--title">Chi tiết phân bổ</div>
              {dataPieChart && <PieChartPackage data={dataPieChart} />}
            </div>
          </div>
        </>
      )}
      {isDetail && packageDetail && (
        <>
          <div className="package">
            <div className="package__block">
              <img
                src={packageDetail.avatar}
                className="package__block--img"
                alt="avatar_package"
              />
              <br />
              <div className="package__block--title">{packageDetail.name}</div>
              <div className="package__block--repair">Sửa tên gói</div>
              <br />
              <div className="package__block--content">
                Phù hợp với những nhà đầu tư muốn thêm kênh sinh lời ổn định, với mức độ rủi ro thấp
                nhất.
              </div>
            </div>
            <div className="package__block">
              <div className="package__block--title">Chi tiết phân bổ</div>
              {dataPieChart && <PieChartPackage data={dataPieChart} />}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default DefaultPackageId;
