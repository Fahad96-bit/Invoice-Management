import React, { useRef, useEffect, useState } from "react";
import groupBy from "lodash/groupBy";
import map from "lodash/map";
import { Layout, Menu } from "antd";
import { NavLink } from "react-router-dom";
import { ellipsis } from "../../util/utils";
import "./AppMenu.scss";
import CustomIcon from "../CustomIcon";
const AppMenu = (props) => {
  const [currentPath, setCurrentPath] = useState("/home");
  let prevLocation = usePrevious(props.location);
  function usePrevious(value) {
    let ref = useRef();
    useEffect(() => {
      ref.current = value;
    }, [value]);
    return ref.current;
  }

  useEffect(() => {
    console.log("prevProps", prevLocation);
    if (props.location !== prevLocation) {
      onRouteChanged();
    }
  }, [props.location]);

  useEffect(() => {
    setCurrentPaths();
  }, []);

  const onRouteChanged = (fn) => {
    setCurrentPaths();
    if (fn) fn();
  };

  const setCurrentPaths = () => {
    let { location } = props;
    let currentPath = location.pathname
      .replace("/add", "")
      .replace(/\b\/edit\/[0-9]+\b/, "");
    setCurrentPath(currentPath);
  };

  const groupByModule = () => {
    let navGroups = groupBy(props.allowedRoutes, "module");
    delete navGroups.undefined;

    return map(Object.keys(navGroups), (k) => {
      return map(navGroups[k], (obj) => {
        return (
          <Menu.Item key={obj.path} disabled={obj.isDisabled}>
            <NavLink to={`${obj.path}`} activeClassName="active">
              <CustomIcon name={obj.icon} />
              <span className="nav-text">{ellipsis(obj.displayName, 17)}</span>
            </NavLink>
          </Menu.Item>
        );
      });
    });
  };

  const getMenuClass = (isFixed) => {
    let className = `app-sidebar ${isFixed ? " app-sidebar__fixed" : ""}`;

    return className;
  };

  let { isFixedLayout, onBreakPoint } = props;
  let menuClasses = getMenuClass(isFixedLayout);
  return (
    <Layout.Sider
      breakpoint="lg"
      width={350}
      className={menuClasses}
      onBreakpoint={onBreakPoint}
      onCollapse={onBreakPoint}
      collapsible
    >
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={[currentPath]}
        inlineIndent={12}
        onSelect={() => {}}
      >
        {groupByModule()}
      </Menu>
    </Layout.Sider>
  );
};
export default AppMenu;
