import React from 'react';

import { Table, Pagination } from 'antd'

function TableUser({ rowSelection, columns, data, loading, perPage, page, total, onChangePage }: any) {
    return (
        <>
            <Table rowSelection={rowSelection} columns={columns} dataSource={data} loading={loading} pagination={false} />
            <br/>
            <Pagination current={page} total={total} onChange={onChangePage} pageSize={perPage}  hideOnSinglePage/>
        </>


    );
}

export default TableUser;