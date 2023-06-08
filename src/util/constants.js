export const baseUrl = "http://localhost:5000/invoices";
export const DATE_FORMAT = "DD/MM/YYYY";
export const DATE_FORMAT_TIME = "DD/MM/YYYY HH:mm";
export const INVOICE_STATUS_COLORS = {
  SENT: "processing",
  PAID: "green",
  OVERDUE: "red",
};
export const VALIDATE_FORM_MESSAGES_TEMPLATE = {
  required: "${label} is required!",
  types: {
    email: "Enter a valid email!",
    number: "${label} is not a validate number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
  string: {
    max: "cannot be longer then ${max} characters",
  },
};
export const INVOICE_STATUS = [
  { key: "PAID", value: "Paid" },
  { key: "OVERDUE", value: "Overdue" },
  { key: "SENT", value: "Sent" },
];
