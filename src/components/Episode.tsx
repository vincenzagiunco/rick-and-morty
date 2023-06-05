import { Link, useParams } from "react-router-dom";
import { useGetEpisodeQuery, useGetMultipleCharactersQuery } from "../api/api";
import { Alert, Descriptions, Skeleton, Table, Typography } from "antd";

import { Character } from "../api/models";
import { ColumnsType } from "antd/es/table";
import { getResourceIdByUrl } from "../utils/getResourceIdByUrl";

const { Paragraph, Title } = Typography;

import styles from "./Episode.module.scss";

export function Episode() {
  const { id } = useParams<{ id: string }>();
  const {
    data: episode,
    isFetching,
    error: episodeError,
  } = useGetEpisodeQuery({ id: id ? id : "" });

  const { data: characters } = useGetMultipleCharactersQuery(
    {
      ids: episode
        ? episode.characters.map(characterUrl =>
            getResourceIdByUrl(characterUrl)
          )
        : [],
    },
    { skip: !episode }
  );

  if (isFetching) {
    return <Skeleton active />;
  }

  if (episodeError) {
    return <Alert description="Something went wrong" type="error" />;
  }

  const charactersTableColumns: ColumnsType<Character> = [
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
              <Title level={2}>{`Episode - ${episode?.name}`}</Title>
            </>
          }>
          <Descriptions.Item label="Episode" span={3}>
            {episode?.episode}
          </Descriptions.Item>
          <Descriptions.Item label="Air Date" span={3}>
            {episode?.air_date}
          </Descriptions.Item>
        </Descriptions>
      </div>
      <Paragraph className={styles.charactersParagraph}>
        <Title level={2}>Characters</Title>

        <Table<Character>
          bordered
          columns={charactersTableColumns}
          dataSource={characters}
          rowKey="id"
        />
      </Paragraph>
    </div>
  );
}
