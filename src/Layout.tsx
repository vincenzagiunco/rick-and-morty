import { Layout as AntdLayout, Image, Menu } from "antd";
import { Link, Outlet, useLocation } from "react-router-dom";

const { Content, Header } = AntdLayout;

import styles from "./Layout.module.scss";

export function Layout() {
  const { pathname } = useLocation();
  return (
    <AntdLayout className={styles.layout}>
      <Header className={styles.header}>
        <Link to="/">
          <Image
            src="/rick-and-morty.png"
            preview={false}
            width={48}
            height={48}
          />
        </Link>

        <Menu
          className={styles.menu}
          mode="horizontal"
          selectedKeys={
            pathname === "/episodes"
              ? ["1"]
              : pathname === "/locations"
              ? ["2"]
              : undefined
          }
          items={[
            { key: "1", label: <Link to="/episodes">Episodes</Link> },

            { key: "2", label: <Link to="/locations">Locations</Link> },
          ]}
        />
      </Header>
      <Content className={styles.content}>
        <Outlet />
      </Content>
    </AntdLayout>
  );
}
