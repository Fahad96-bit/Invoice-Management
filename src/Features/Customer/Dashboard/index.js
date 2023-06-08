import React from "react";
import { Row, Col, Card } from "antd";
import PageTitle from "../../../components/PageTitle";
import CustomIcon from "../../../components/CustomIcon";
import { Chart as ChartJS, registerables, LinearScale } from "chart.js";
import { Line, Pie } from "react-chartjs-2";
import "./Dashboard.scss";

ChartJS.register(...registerables, LinearScale);

const Dashboard = () => {
  const salesData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "Sales",
        data: [1200, 1500, 1800, 2000],
        fill: false,
        borderColor: "#1890ff",
      },
    ],
  };

  const redemptionData = {
    labels: ["COD", "Home Delivery"],
    datasets: [
      {
        data: [15, 25],
        backgroundColor: ["#f64f59", "#c471ed", "#ffca4b", "#20c997"],
      },
    ],
  };
  const options = {
    maintainAspectRatio: false,
  };

  return (
    <>
      <PageTitle title="Dashboard" />
      <Row gutter={[16, 16]} style={{ marginBottom: "20px" }}>
        <Col xs={24} sm={12} md={8} lg={8}>
          <Card className="sales-card">
            <div className="card-item">
              <h2>Weekly Sales</h2>
              <CustomIcon name="LineChartOutlined" />
            </div>
            <h3>$ 15,0000</h3>
            <h4>Increased by 60%</h4>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={8}>
          <Card className="order-card">
            <div className="card-item ">
              <h2>Weekly Orders</h2>
              <CustomIcon name="BookOutlined" />
            </div>
            <h3>45,6334</h3>
            <h4>Decreased by 10%</h4>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={8}>
          <Card className="redemption-card">
            <div className="card-item ">
              <h2>Deal Redemption</h2>
              <CustomIcon name="SketchOutlined" />
            </div>
            <h3>95,5741</h3>
            <h4>Increased by 5%</h4>
          </Card>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={12} lg={12}>
          <Card title="Visits and Sales Statistics">
            <Line data={salesData} options={options} />
          </Card>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12}>
          <Card title="Sources of Redemption">
            <Pie data={redemptionData} options={options} />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Dashboard;
