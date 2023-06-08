import ROUTES from "./constant.route";
import Dashboard from "../Features/Customer/Dashboard";
import Invoice from "../Features/Customer/Invoice";
import AddEditInvoice from "../Features/Customer/AddEditInvoice";

const routes = [
  {
    path: ROUTES.DASHBOARD.path,
    name: ROUTES.DASHBOARD.name,
    displayName: ROUTES.DASHBOARD.title,
    component: Dashboard,
    icon: "HomeOutlined",
    module: 0,
  },
  {
    path: ROUTES.INVOICE_MANAGEMENT.path,
    name: ROUTES.INVOICE_MANAGEMENT.name,
    displayName: ROUTES.INVOICE_MANAGEMENT.title,
    component: Invoice,
    icon: "AccountBookOutlined",
    module: 1,
  },
  {
    path: ROUTES.ADD_INVOICE.path,
    name: ROUTES.ADD_INVOICE.name,
    displayName: ROUTES.ADD_INVOICE.title,
    component: AddEditInvoice,
  },
  {
    path: `${ROUTES.EDIT_INVOICE.path}/:id`,
    name: ROUTES.EDIT_INVOICE.name,
    displayName: ROUTES.EDIT_INVOICE.title,
    component: AddEditInvoice,
  },
];
export default routes;
