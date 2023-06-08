import { Layout } from "antd";

import React, { useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import AppMenu from "../AppMenu";
import routes from "../../routes/list.route";
import "./MainLayout.scss";
import AppHeader from "../../Header";
import AppFooter from "../Footer";
const MainLayout = () => {
  const [isFixedLayout, setIsFixedLayout] = useState(true);
  const location = useLocation();
  const onBreakPoint = (isBreak) => {
    setIsFixedLayout(!isBreak);
  };
  return (
    <Layout className="main-layout">
      <AppMenu
        allowedRoutes={routes}
        location={location}
        isFixedLayout={isFixedLayout}
        onBreakPoint={onBreakPoint}
      />
      <Layout>
        <AppHeader isFixedLayout={isFixedLayout} />
        <Layout.Content
          className={`layout-content ${
            isFixedLayout ? " layout-content__fixed" : ""
          }`}
        >
          <div className="main-layout__content-wrap">
            <Routes>
              {routes &&
                routes.map(({ component: Component, path }) => (
                  <Route
                    key={`${path}-private-route`}
                    path={`${path}`}
                    element={<Component />}
                  />
                ))}
            </Routes>
          </div>
        </Layout.Content>
        <AppFooter isFixedLayout={isFixedLayout} />
      </Layout>
    </Layout>
  );
};

export default MainLayout;
