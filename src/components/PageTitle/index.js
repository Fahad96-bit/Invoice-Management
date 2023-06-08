import React from "react";
import { Divider } from "antd";

const PageTitle = ({ title }) => (
  <Divider orientation="left" className="form-divider first">
    <span className="page-title">{title}</span>
  </Divider>
);

export default PageTitle;
