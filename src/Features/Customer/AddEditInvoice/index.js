import React, { useState, useEffect } from "react";

import {
  Form,
  Input,
  Button,
  Row,
  Col,
  Divider,
  Spin,
  Select,
  DatePicker,
  message,
  InputNumber,
} from "antd";
import PageTitle from "../../../components/PageTitle";
import {
  VALIDATE_FORM_MESSAGES_TEMPLATE,
  DATE_FORMAT,
  INVOICE_STATUS,
} from "../../../util/constants";
import _map from "lodash/map";
import { useNavigate, useParams } from "react-router";
import { addInvoice, editInvoice, fetchInvoiceById } from "../service";
import * as moment from "dayjs";
import _isEmpty from "lodash/isEmpty";
import "./AddEditInvoice.scss";
const { Option } = Select;

const AddEditInvoice = () => {
  const [form] = Form.useForm();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const isEditView = !!id;
  const [messageApi, contextHolder] = message.useMessage();
  const [invoice, setInvoice] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          setLoading(true);
          const data = await fetchInvoiceById(id);
          setInvoice(data);
          messageApi.open({
            type: "success",
            content: "Invoice fetched successfully",
          });
        } catch (error) {
          messageApi.open({
            type: "error",
            content: "Failed to fetch invoice",
          });
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    if (!_isEmpty(invoice)) {
      setFormValues();
    }
  }, [invoice]);

  const setFormValues = () => {
    form.setFieldsValue({
      id: invoice.id,
      customerName: invoice.customerName,
      amount: invoice.amount,
      dueDate: invoice.dueDate ? moment(invoice.dueDate) : moment(),
      status: invoice.status,
    });
  };

  const onFormFinish = async (fieldsValue) => {
    const values = {
      ...fieldsValue,
      dueDate: fieldsValue.dueDate.valueOf(),
    };
    try {
      setLoading(true);
      isEditView
        ? await editInvoice(invoice.id, values)
        : await addInvoice(values);
      messageApi.open({
        type: "success",
        content: `Invoice ${isEditView ? "updated" : "added"} successfully`,
      });
      await new Promise((resolve) => setTimeout(resolve, 1000));
      navigate(-1);
    } catch (error) {
      messageApi.open({
        type: "error",
        content: `Failed to ${isEditView ? "update" : "add"} invoice`,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {contextHolder}
      <PageTitle title={isEditView ? "Edit Invoice" : "Add Invoice"} />
      <Form
        form={form}
        layout="vertical"
        name="nest-messages"
        onFinish={onFormFinish}
        validateMessages={VALIDATE_FORM_MESSAGES_TEMPLATE}
      >
        <div style={{ position: "relative" }}>
          <Spin spinning={loading} tip="Loading..." size="large">
            <Row gutter={[20, 26]}>
              {isEditView && (
                <Col xs={24} sm={12} lg={12}>
                  <Form.Item label="Invoice Id" name="id">
                    <Input readOnly placeholder="Invoice Code" />
                  </Form.Item>
                </Col>
              )}
              <Col xs={24} sm={12} lg={12}>
                <Form.Item
                  label="Customer Name"
                  name="customerName"
                  rules={[{ required: true }]}
                >
                  <Input placeholder="Customer Name" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} lg={12}>
                <Form.Item
                  label="Amount"
                  name="amount"
                  rules={[{ required: true }]}
                >
                  <InputNumber
                    className="invoice-form-control"
                    min="0"
                    placeholder="Amount"
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} lg={12}>
                <Form.Item
                  label="Due Date"
                  name="dueDate"
                  rules={[{ required: true }]}
                >
                  <DatePicker
                    className="invoice-form-control"
                    format={DATE_FORMAT}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} lg={12}>
                <Form.Item
                  label="Status"
                  name="status"
                  rules={[{ required: true }]}
                >
                  <Select showSearch placeholder="Select Invoice Status">
                    {_map(INVOICE_STATUS, (status) => (
                      <Option key={status.key} value={status.key}>
                        {status.value}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Divider />
            <Row className="fields-row" justify="end" type="flex">
              <Col>
                <Button
                  className="action-btn mg-right-50"
                  onClick={() => {
                    navigate(-1);
                  }}
                >
                  Cancel
                </Button>

                <Button className="action-btn" type="primary" htmlType="submit">
                  {isEditView ? "Update" : "Create"}
                </Button>
              </Col>
            </Row>
          </Spin>
        </div>
      </Form>
    </>
  );
};

export default AddEditInvoice;
