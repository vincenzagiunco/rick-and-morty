import { Link, useParams } from "react-router-dom";
import { useGetLocationQuery, useGetMultipleCharactersQuery } from "../api/api";
import { Alert, Descriptions, Skeleton, Table, Typography } from "antd";

import { Character } from "../api/models";
import { ColumnsType } from "antd/es/table";
import { getResourceIdByUrl } from "../utils/getResourceIdByUrl";

const { Paragraph, Title } = Typography;

import styles from "./Location.module.scss";

export function Location() {
  const { id } = useParams<{ id: string }>();
  const {
    data: location,
    isFetching: isFetchingLocation,
    error: locationQueryError,
  } = useGetLocationQuery({ id: id ? id : "" }, { skip: id === undefined });

  const { data: residents, isFetching: isFetchingResidents } =
    useGetMultipleCharactersQuery(
      {
        ids: location
          ? location.residents.map(url => getResourceIdByUrl(url))
          : [],
      },
      { skip: !location }
    );

  if (isFetchingLocation || isFetchingResidents) {
    return <Skeleton active />;
  }

  if (locationQueryError) {
    return <Alert description="Something went wrong" type="error" />;
  }

  const residentsTableColumns: ColumnsType<Character> = [
    {
      title: "Name",
      dataIndex: "name",
      render: (_, record) => (
        <Link
          to={`/character/${encodeURIComponent(
            record.name
          )}/${getResourceIdByUrl(record.url)}`}>
          {record.name}
        </Link>
      ),
    },
  ];

  return (
    <div>
      <div className={styles.description}>
        <Descriptions
          title={
            <>
              <Title level={1}>{`Location - ${location?.name}`}</Title>
            </>
          }>
          <Descriptions.Item label="Type" span={3}>
            {location?.type}
          </Descriptions.Item>
          <Descriptions.Item label="Dimension" span={3}>
            {location?.dimension}
          </Descriptions.Item>
        </Descriptions>
      </div>
      <Paragraph className={styles.residentsParagraph}>
        <Title level={2}>Residents</Title>

        <Table<Character>
          bordered
          columns={residentsTableColumns}
          dataSource={residents}
          rowKey="id"
        />
      </Paragraph>
    </div>
  );
}
