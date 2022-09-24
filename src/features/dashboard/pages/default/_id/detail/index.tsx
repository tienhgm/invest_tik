import React from 'react';
import PieChartPackage from '../../../components/PieChartPackage';
import './index.scss';
interface IDefaultPackageIdDetail {
  packageDetail: any;
  dataPieChart: any;
}
function DefaultPackageIdDetail({ packageDetail, dataPieChart }: IDefaultPackageIdDetail) {
  return (
    <>
      {packageDetail && (
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
    </>
  );
}

export default DefaultPackageIdDetail;
