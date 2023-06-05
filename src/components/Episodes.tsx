import { Link } from "react-router-dom";
import { Table, Typography } from "antd";
import { useGetEpisodesQuery } from "../api/api";
import { Episode } from "../api/models";
import { ColumnsType } from "antd/es/table";
import { useState } from "react";

export function Episodes() {
  const [page, setPage] = useState<number>(1);
  const { data } = useGetEpisodesQuery({ page });

  const episodes = data?.results;
  const paginationInfo = data?.info;

  const columns: ColumnsType<Episode> = [
    {
      title: "Episode",
      dataIndex: "episode",
    },
    {
      title: "Name",
      dataIndex: "name",
      render: (_, episode) => (
        <Link to={`/episode/${encodeURIComponent(episode.name)}/${episode.id}`}>
          {episode.name}
        </Link>
      ),
    },
    { title: "Air date", dataIndex: "air_date" },
  ];

  return (
    <div>
      <Typography.Title level={2}>Episodes</Typography.Title>
      <Table<Episode>
        bordered
        columns={columns}
        dataSource={episodes}
        rowKey="episode"
        pagination={{
          showSizeChanger: false,
          showQuickJumper: true,
          total: paginationInfo?.count,
          showTotal: total => `Episodes number: ${total}`,
          pageSize: 20,
          onChange: page => setPage(page),
        }}
      />
    </div>
  );
}
