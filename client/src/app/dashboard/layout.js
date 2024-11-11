import PrivateRoute from "@/components/PrivateRoute";
const DashboardLayout = ({ children }) => {
  return (
    <>
      <h1>dashboard layout</h1>
      <PrivateRoute>{children}</PrivateRoute>
    </>
  );
};

export default DashboardLayout;
