import DashboardSideBar from "@/components/DashboardSideBar";
import PrivateRoute from "@/components/PrivateRoute";
const DashboardLayout = ({ children }) => {
  return (
    <div className="max-w-[1800px] mx-auto flex ">
      <div>
        <DashboardSideBar />
      </div>
      <div className="flex-1" style={{ maxWidth: "calc(100vw - 288px)" }}>
        <PrivateRoute>{children}</PrivateRoute>
      </div>
    </div>
  );
};

export default DashboardLayout;
