import React from "react";

import { Col, Layout, Row } from "antd";

import "./Header.scss";

const { Header } = Layout;

const AppHeader = ({ isFixedLayout }) => {
  return (
    <Header className="app-header">
      <Row type="flex" className="fields-row" gutter={0}>
        <Col
          span={20}
          xs={12}
          sm={20}
          md={20}
          lg={20}
          className="left-vertical-split"
        >
          <div
            className={
              isFixedLayout
                ? "app-header__title-fixed text-uppercase"
                : "app-header__title text-uppercase"
            }
          >
            <span className="color-grey-2 font-bold">Invoice Management</span>
          </div>
        </Col>
      </Row>
    </Header>
  );
};

export default AppHeader;
