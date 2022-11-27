import React from 'react';

import { Table } from 'antd'

function TableUser({ rowSelection, columns, data, loading, perPage, total, onChangePage }: any) {
    return (
        <Table rowSelection={rowSelection} columns={columns} dataSource={data} loading={loading} pagination={{ pageSize: perPage, total: total }} />

    );
}

export default TableUser;