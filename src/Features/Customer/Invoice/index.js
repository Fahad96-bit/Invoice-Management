import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Row, Table, Input, Col, Tag, Button, message, Spin } from "antd";
import * as moment from "dayjs";
import PageTitle from "../../../components/PageTitle";
import { fetchInvoices, deleteInvoice } from "../service";
import {
  DATE_FORMAT_TIME,
  INVOICE_STATUS_COLORS,
} from "../../../util/constants";
import ROUTES from "../../../routes/constant.route";
const { Search } = Input;

const Invoice = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [invoices, setInvoices] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
    showSizeChanger: true,
    pageSizeOptions: ["10", "20", "30", "50"],
  });
  const [paginationChanged, setPaginationChanged] = useState(true);
  const [sorter, setSorter] = useState({});
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (paginationChanged) {
      setLoading(true);
      fetchInvoices(pagination, sorter, searchValue)
        .then(({ totalCount, data }) => {
          setPagination((prevPagination) => ({
            ...prevPagination,
            total: totalCount,
          }));
          setInvoices(data);
        })
        .catch((error) => {
          console.error("Error fetching invoices:", error);
        })
        .finally(() => {
          setLoading(false);
        });
      setPaginationChanged(false);
    }
  }, [paginationChanged]);

  const handleTableChange = (pagination, filters, sorter) => {
    setPagination(pagination);
    setSorter(sorter);
    setPaginationChanged(true);
  };
  const columns = [
    { title: "Id", dataIndex: "id", key: "id" },
    {
      title: "Customer Name",
      dataIndex: "customerName",
      key: "customerName",
      sorter: true,
    },
    {
      title: "Due Date",
      dataIndex: "dueDate",
      key: "dueDate",
      sorter: true,
      render: (date) => moment(date).format(DATE_FORMAT_TIME),
    },
    { title: "Amount", dataIndex: "amount", key: "amount", sorter: true },
    {
      title: "Status",
      key: "status",
      render: (data) => (
        <Tag color={INVOICE_STATUS_COLORS[data.status]}> {data.status}</Tag>
      ),
    },

    {
      title: "Action",
      key: "action ",
      align: "center",

      render: (invoice) => (
        <Row className="fields-row">
          <Col xs={24} sm={8} md={8} lg={12}>
            <Button
              type="link"
              onClick={() => {
                navigate(`${ROUTES.EDIT_INVOICE.path}/${invoice.id}`);
              }}
            >
              Edit
            </Button>
          </Col>
          <Col xs={24} sm={8} lg={12}>
            <Button type="link" onClick={() => onDeleteInvoice(invoice.id)}>
              Delete
            </Button>
          </Col>
        </Row>
      ),
    },
  ];

  const onDeleteInvoice = async (invoiceId) => {
    try {
      setLoading(true);
      await deleteInvoice(invoiceId);
      messageApi.open({
        type: "success",
        content: "Invoice deleted successfully",
      });
      setPaginationChanged(true);
    } catch (error) {
      messageApi.open({
        type: "error",
        content: "Failed to delete invoice",
      });
    } finally {
      setLoading(false);
    }
  };

  const onSearch = (value) => {
    setSearchValue(value);
    setPagination((prevPagination) => ({
      ...prevPagination,
      current: 1,
    }));
    setPaginationChanged(true);
  };
  const onAddInvoice = () => {
    navigate(ROUTES.ADD_INVOICE.path);
  };
  return (
    <>
      {contextHolder}
      <PageTitle title="Invoice" />
      <Row className="mg-bottom-8" gutter={[12, 10]}>
        <Col xs={24} sm={24} md={12} lg={12}>
          <Search
            placeholder="Search by customer name"
            allowClear
            enterButton="Search"
            size="medium"
            onSearch={onSearch}
          />
        </Col>
      </Row>
      <div style={{ position: "relative" }}>
        <Spin spinning={loading} tip="Loading..." size="large">
          <Table
            dataSource={invoices}
            columns={columns}
            pagination={pagination}
            onChange={handleTableChange}
            onShowSizeChange={(current, pageSize) =>
              setPagination((prevPagination) => ({
                ...prevPagination,
                current,
                pageSize,
              }))
            }
          />
        </Spin>
      </div>

      <Row className="mg-top-8" justify="end">
        <Col>
          <Button onClick={onAddInvoice} type="primary">
            Add
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default Invoice;
