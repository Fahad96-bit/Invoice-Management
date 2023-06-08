import axios from "axios";
import { baseUrl } from "../../util/constants";
const fetchInvoices = async (pagination, sorter, searchValue) => {
  const { current, pageSize } = pagination;
  const { field, order } = sorter;
  let url = `${baseUrl}?_page=${current}&_limit=${pageSize}`;

  if (field && order) {
    url += `&_sort=${field}&_order=${order === "descend" ? "desc" : "asc"}`;
  }

  if (searchValue) {
    url += `&q=${encodeURIComponent(searchValue)}`;
  }

  try {
    const response = await axios.get(url);
    const totalCount = parseInt(response.headers["x-total-count"], 10);
    const data = response.data;

    return { totalCount, data };
  } catch (error) {
    throw new Error("Error fetching invoices: " + error.message);
  }
};

const fetchInvoiceById = async (invoiceId) => {
  const url = `${baseUrl}/${invoiceId}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error("Error fetching invoice by ID: " + error.message);
  }
};

const deleteInvoice = async (invoiceId) => {
  const url = `${baseUrl}/${invoiceId}`;
  try {
    await axios.delete(url);
  } catch (error) {
    throw new Error("Error deleting invoice: " + error.message);
  }
};
const addInvoice = async (invoiceData) => {
  const url = `${baseUrl}`;
  try {
    const response = await axios.post(url, invoiceData);
    return response.data;
  } catch (error) {
    throw new Error("Error adding invoice: " + error.message);
  }
};

const editInvoice = async (invoiceId, invoiceData) => {
  const url = `${baseUrl}/${invoiceId}`;
  try {
    const response = await axios.put(url, invoiceData);
    return response.data;
  } catch (error) {
    throw new Error("Error editing invoice: " + error.message);
  }
};

export {
  fetchInvoices,
  deleteInvoice,
  addInvoice,
  editInvoice,
  fetchInvoiceById,
};
