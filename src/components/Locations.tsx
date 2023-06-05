import { Link } from "react-router-dom";
import { Table, Typography } from "antd";
import { useGetLocationsQuery } from "../api/api";
import { Location } from "../api/models";
import { ColumnsType } from "antd/es/table";
import { useState } from "react";

export function Locations() {
  const [page, setPage] = useState<number>(1);
  const { data } = useGetLocationsQuery({ page });

  const locations = data?.results;
  const paginationInfo = data?.info;

  const columns: ColumnsType<Location> = [
    {
      title: "Name",
      dataIndex: "name",
      render: (_, location) => (
        <Link
          to={`/location/${encodeURIComponent(location.name)}}/${location.id}`}>
          {location.name}
        </Link>
      ),
    },
    { title: "Type", dataIndex: "type" },
    { title: "Dimension", dataIndex: "dimension" },
  ];

  return (
    <div>
      <Typography.Title level={2}>Locations</Typography.Title>
      <Table<Location>
        bordered
        columns={columns}
        dataSource={locations}
        rowKey="id"
        pagination={{
          showSizeChanger: false,
          showQuickJumper: true,
          total: paginationInfo?.count,
          showTotal: total => `Locations number: ${total}`,
          pageSize: 20,
          onChange: page => setPage(page),
        }}
      />
    </div>
  );
}
