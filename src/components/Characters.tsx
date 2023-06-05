import { useState } from "react";
import { useGetCharactersQuery } from "../api/api";
import {
  Alert,
  Card,
  Descriptions,
  Pagination,
  Skeleton,
  Typography,
} from "antd";
import { Link } from "react-router-dom";
import { getResourceIdByUrl } from "../utils/getResourceIdByUrl";

import styles from "./Characters.module.scss";
import { StatusBadge } from "./StatusBagde";
import { UNKNOWN } from "../api/models";

const { Title } = Typography;

export function Characters() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const {
    data,
    isFetching: isFetchingCharacters,
    error: charactersError,
  } = useGetCharactersQuery({ page: currentPage });

  if (isFetchingCharacters) {
    return <Skeleton active />;
  }

  if (charactersError) {
    return (
      <Alert
        description="Something went wrong while fecthing the characters"
        type="error"
      />
    );
  }

  const characters = data?.results;
  const info = data?.info;

  if (characters?.length) {
    return (
      <div>
        <ul className={styles.list}>
          {characters.map(character => (
            <li key={character.id} className={styles.listItem}>
              <Link
                to={`/character/${encodeURIComponent(
                  character.name
                )}/${getResourceIdByUrl(character.url)}`}>
                <Card cover={<img alt="example" src={character.image} />}>
                  <Descriptions
                    title={
                      <>
                        <Title level={3}>{character.name}</Title>
                        <div>
                          <StatusBadge status={character.status} /> -{" "}
                          {character.species}
                        </div>
                      </>
                    }>
                    <Descriptions.Item label="Last known location" span={3}>
                      {character.location.name.toLocaleLowerCase() !==
                      UNKNOWN ? (
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
                    <Descriptions.Item label="Gender" span={3}>
                      {character.gender}
                    </Descriptions.Item>
                    <Descriptions.Item label="Type" span={3}>
                      {character.type}
                    </Descriptions.Item>
                  </Descriptions>
                </Card>
              </Link>
            </li>
          ))}
        </ul>
        {info ? (
          <Pagination
            onChange={(page: number) => setCurrentPage(page)}
            total={info.count}
            showTotal={total => `Characters number: ${total}`}
            showQuickJumper
            showSizeChanger={false}
            pageSize={20}
          />
        ) : null}
      </div>
    );
  }

  return null;
}
