import React, { useEffect, useMemo, useState } from 'react';
import { Breadcrumb } from 'antd';
import packageApi from 'apis/packages';
import { useHistory, useRouteMatch } from 'react-router-dom';
import PieChartPackage from '../../../components/PieChartPackage';
import { useTranslation } from 'react-i18next';
import './index.scss';
import DonutChartPackage from 'features/invest/components/DonutChartPackage';
import { PlusOutlined } from '@ant-design/icons';
function DefaultPackageId() {
  const { t } = useTranslation();
  const match = useRouteMatch<any>();
  const history = useHistory();
  const [isDetail] = useState<boolean>(false);
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
  const onCreatePackage = async () => {
    try {
      const { data } = await packageApi.cloneDefaultToCustomize(match.params.id);
      if (data) {
        history.push(`/invest/recharge/customize/${match.params.id}`);
      }
    } catch (error) {}
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
            {t('common.invest')}
          </span>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <span className="link" onClick={() => onGoBack('/invest/recharge')}>
            {t('common.recharge')}
          </span>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <span className="link" onClick={() => onGoBack('/invest/recharge/default')}>
            {t('common.default')}
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
              <div className="package__btn" onClick={onCreatePackage}>
                <PlusOutlined
                  className="package__btn"
                  style={{
                    padding: '0.8rem',
                    fontSize: '1.2rem',
                    borderRadius: '50%',
                    backgroundColor: '#32c610',
                    border: '1.5px solid #32c610',
                    color: '#fff',
                    cursor: 'pointer',
                  }}
                />
              </div>
              <div className="text-medium">Tạo gói</div>
            </div>
            <div className="package__block">
              <div className="package__block--title">Chi tiết phân bổ</div>
              {dataPieChart && <DonutChartPackage isNoLegend data={dataPieChart} />}
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
