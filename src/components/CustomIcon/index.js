import React from "react";
import {
  HomeOutlined,
  ProfileOutlined,
  BookOutlined, //
  HeartOutlined,
  AccountBookOutlined,
  SmileOutlined,
  BarChartOutlined,
  RocketOutlined,
  StarOutlined,
  MoneyCollectOutlined,
  MobileOutlined,
  PushpinOutlined,
  UserOutlined,
  LockOutlined,
  BarcodeOutlined,
  SketchOutlined, //
  LaptopOutlined,
  DollarOutlined,
  UsergroupAddOutlined,
  IdcardOutlined,
  CheckCircleTwoTone,
  CloseCircleTwoTone,
  DeleteOutlined,
  EditOutlined,
  LineChartOutlined,
} from "@ant-design/icons";

const CustomIcon = ({ name }) => {
  const MyIcon = (iconName) => {
    switch (iconName) {
      case "UserOutlined": {
        return <UserOutlined />;
      }
      case "CheckCircleTwoTone": {
        return <CheckCircleTwoTone twoToneColor="#52c41a" />;
      }
      case "CloseCircleTwoTone": {
        return <CloseCircleTwoTone twoToneColor="red" />;
      }
      case "IdcardOutlined": {
        return <IdcardOutlined />;
      }
      case "UsergroupAddOutlined": {
        return <UsergroupAddOutlined />;
      }
      case "LockOutlined": {
        return <LockOutlined />;
      }
      case "HomeOutlined": {
        return <HomeOutlined />;
      }
      case "ProfileOutlined": {
        return <ProfileOutlined />;
      }
      case "SmileOutlined": {
        return <SmileOutlined />;
      }
      case "AccountBookOutlined": {
        return <AccountBookOutlined />;
      }
      case "SketchOutlined": {
        return <SketchOutlined style={{ color: "white", fontSize: "18px" }} />;
      }
      case "BarcodeOutlined": {
        return <BarcodeOutlined />;
      }
      case "DollarOutlined": {
        return <DollarOutlined />;
      }
      case "BookOutlined": {
        return <BookOutlined style={{ color: "white", fontSize: "18px" }} />;
      }
      case "RocketOutlined": {
        return <RocketOutlined />;
      }
      case "LaptopOutlined": {
        return <LaptopOutlined />;
      }
      case "StarOutlined": {
        return <StarOutlined />;
      }
      case "BarChartOutlined": {
        return <BarChartOutlined />;
      }
      case "HeartOutlined": {
        return <HeartOutlined />;
      }
      case "MoneyCollectOutlined": {
        return <MoneyCollectOutlined />;
      }
      case "MobileOutlined": {
        return <MobileOutlined />;
      }
      case "PushpinOutlined": {
        return <PushpinOutlined />;
      }
      case "DeleteOutlined": {
        return <DeleteOutlined />;
      }
      case "EditOutlined": {
        return <EditOutlined />;
      }
      case "LineChartOutlined": {
        return (
          <LineChartOutlined style={{ color: "white", fontSize: "18px" }} />
        );
      }
      default: {
        return <HeartOutlined />;
      }
    }
  };

  return MyIcon(name);
};

export default CustomIcon;
