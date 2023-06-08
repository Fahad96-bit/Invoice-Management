import MainLayout from "./components/MainLayout";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Layout } from "antd";
import "./styles/App.scss";
function App() {
  return (
    <Router>
      <Layout className="app-layout-wrap">
        <Routes>
          <Route path="/*" element={<MainLayout></MainLayout>} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
