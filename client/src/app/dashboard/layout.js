import DashboardSideBar from "@/components/DashboardSideBar";
import Player from "@/components/Player/Player";
import PrivateRoute from "@/components/PrivateRoute";
const DashboardLayout = ({ children }) => {
  return (
    <div className="max-w-[1800px] mx-auto flex ">
      <div>
        <DashboardSideBar />
      </div>
      <div
        className="flex-1 relative"
        style={{ maxWidth: "calc(100vw - 288px)" }}
      >
        <PrivateRoute>{children}</PrivateRoute>
        <div className="absolute w-full bottom-0 ">
          <Player />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
