import PropTypes from "prop-types";
import { Drawer } from "antd";

const DrawerSlide = (props) => {
  const { openDrawer, children, drawerWidth = "95%", title = "" } = props;

  if (!openDrawer) return null;

  return (
    <Drawer
      width={drawerWidth}
      title={title}
      placement={"right"}
      closable={false}
      // onClose={onClose}
      open={true}
      key={"right"}
      bodyStyle={{ overflow: "hidden" }}
      style={{ zIndex: 1000 }}
    >
      {children}
    </Drawer>
  );

};

export default DrawerSlide;

DrawerSlide.propTypes = {
    openDrawer: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
    drawerWidth : PropTypes.string,
    title : PropTypes.string
};

DrawerSlide.defaultProps = {
    drawerWidth : "95%",
    title : ""
};
