import { Link, useParams } from "react-router-dom";
import { Descriptions, Image, Skeleton, Table, Typography } from "antd";
import { StatusBadge } from "./StatusBagde";
import { getResourceIdByUrl } from "../utils/getResourceIdByUrl";
import { ColumnsType } from "antd/es/table";
import { Episode, UNKNOWN } from "../api/models";
import { useGetCharacterQuery, useGetMultipleEpisodesQuery } from "../api/api";

const { Paragraph, Title } = Typography;

import styles from "./Character.module.scss";

interface Params {
  id: string;
}

export function Character() {
  const { id } = useParams<keyof Params>();

  const { data: character, isFetching } = useGetCharacterQuery(
    { id: id ? id : "" },
    { skip: id === undefined }
  );

  const { data: episodes, isFetching: isFetchingEpisodes } =
    useGetMultipleEpisodesQuery(
      {
        ids: character
          ? character.episode.map(url => getResourceIdByUrl(url))
          : [],
      },
      { skip: !character }
    );

  if (isFetching || isFetchingEpisodes) {
    return <Skeleton active />;
  }

  if (character) {
    const episodesTableColumns: ColumnsType<Episode> = [
      {
        title: "Episode",
        dataIndex: "episode",
      },
      {
        title: "Name",
        dataIndex: "name",
        render: (_, episode) => (
          <Link
            to={`/episode/${encodeURIComponent(episode.name)}/${episode.id}`}>
            {episode.name}
          </Link>
        ),
      },
    ];

    return (
      <div>
        <div className={styles.description}>
          <Image alt={character.name} src={character.image} preview={false} />
          <Descriptions
            title={
              <>
                <Title level={1}>{character.name}</Title>
                <StatusBadge status={character.status} />
              </>
            }>
            <Descriptions.Item label="Last known location" span={3}>
              {character.location.name.toLocaleLowerCase() !== UNKNOWN ? (
                <Link
                  to={`/location/${encodeURIComponent(
                    character.location.name
                  )}/${getResourceIdByUrl(character.location.url)}`}>
                  {character.location.name}
                </Link>
              ) : (
                character.location.name
              )}
            </Descriptions.Item>
            <Descriptions.Item label="Origin" span={3}>
              {character.origin.name.toLocaleLowerCase() !== UNKNOWN ? (
                <Link
                  to={`/location/${encodeURIComponent(
                    character.origin.name
                  )}/${getResourceIdByUrl(character.origin.url)}`}>
                  {character.origin.name}
                </Link>
              ) : (
                character.origin.name
              )}
            </Descriptions.Item>
            <Descriptions.Item label="Gender" span={3}>
              {character.gender}
            </Descriptions.Item>
            <Descriptions.Item label="Species" span={3}>
              {character.species}
            </Descriptions.Item>
            <Descriptions.Item label="Type" span={3}>
              {character.type}
            </Descriptions.Item>
          </Descriptions>
        </div>
        <Paragraph className={styles.episodesParagraph}>
          <Title level={2}>Episodes</Title>
          <Table
            bordered
            columns={episodesTableColumns}
            dataSource={episodes}
            rowKey="id"
          />
        </Paragraph>
      </div>
    );
  }

  return null;
}
