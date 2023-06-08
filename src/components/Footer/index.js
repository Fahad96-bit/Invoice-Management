import React from "react";
import { Layout } from "antd";
import "./Footer.scss";
const { Footer } = Layout;

const AppFooter = ({ isFixedLayout }) => (
  <Footer
    className={`app-footer text-center ${
      isFixedLayout ? " app-footer__fixed" : ""
    }`}
  >
    IVM © 2023 - All Rights Reserved
  </Footer>
);

export default AppFooter;
