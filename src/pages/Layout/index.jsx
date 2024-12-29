import { Button } from "antd-mobile";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { getBillList } from "@/store/modules/billStore";
import { useEffect } from "react";

const Layout = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBillList());
  }, [dispatch]);
  return (
    <div>
      <Outlet />
      Layout
      {/* 测试全局生效样式 */}
      <Button color="primary">测试全局</Button>
      <div className="purple">
        <Button color="primary">测试局部</Button>
      </div>
    </div>
  );
};
export default Layout;
