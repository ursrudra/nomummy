import React from "react";
import PropTypes from "prop-types";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MailIcon from "@material-ui/icons/Mail";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import NavBar from "../components/NavBar/NavBar";
import { useRouteMatch, NavLink, Switch, Route } from "react-router-dom";
import AddProduct from "../pages/AddProduct";
import MyStore from "../pages/MyStore";
import {
  Add,
  Dashboard,
  Money,
  Store,
  LocalGroceryStoreRounded,
} from "@material-ui/icons";
import Profile from "./Profile";
import { Container } from "@material-ui/core";
import Footer from "../components/Footer/Footer";
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  active: {
    background: "#22bbff",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  title: {
    ...theme.mixins.toolbar,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    letterSpacing: "1px",
  },

  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    width: "100%",
    padding: theme.spacing(3),
    [theme.breakpoints.down("md")]: {
      padding: theme.spacing(1),
    },
  },
  navLink: { ...theme.mixins.anchor, textDecoration: "none", color: "inherit" },
}));

const menuItems = [
  {
    text: "Dashboard",
    icon: <Dashboard />,
    route: "/dashboard",
    main: () => <h1 style={{ fontSize: "30px" }}>Dashboard</h1>,
  },
  {
    text: "Add Product",
    icon: <Add />,
    route: "/add-product",
    main: () => <AddProduct />,
  },
  {
    text: "My Store",
    icon: <Store />,
    route: "/my-store",
    main: () => <MyStore />,
  },
  {
    text: "Transactions",
    icon: <Money />,
    route: "/transactions",
    main: () => <h1 style={{ fontSize: "30px" }}>Transactions</h1>,
  },
];

function ResponsiveDrawer(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  let { path, url } = useRouteMatch();
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div className={classes.title}>
        <LocalGroceryStoreRounded />
        <Typography variant="h6" noWrap>
          noMummy
        </Typography>
      </div>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <NavLink
            to={`${url}${item.route}`}
            className={classes.navLink}
            activeClassName={classes.active}
            key={item.text}
          >
            <ListItem button key={item.text}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text}></ListItemText>
            </ListItem>
          </NavLink>
        ))}
      </List>
      <Divider />
      <List>
        {["Promote", "Contact", "Help & Support"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <React.Fragment>
      <div className={classes.root}>
        <CssBaseline />
        <NavBar toggleDrawer={handleDrawerToggle} />

        <nav className={classes.drawer} aria-label="mailbox folders">
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Hidden smUp implementation="css">
            <Drawer
              container={container}
              variant="temporary"
              anchor={theme.direction === "rtl" ? "right" : "left"}
              open={mobileOpen}
              onClose={handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
        <Container>
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <Switch>
              {menuItems.map((item, index) => (
                // Render more <Route>s with the same paths as
                // above, but different components this time.
                <Route
                  key={index}
                  path={path + item.route}
                  exact={item.exact}
                  children={<item.main />}
                />
              ))}
              <Route
                key={6}
                path={"/seller/profile"}
                exact
                children={<Profile />}
              />
              <Route
                key={7}
                path={"/seller/profile/edit"}
                exact
                children={<Profile edit />}
              />
            </Switch>
          </main>
        </Container>
      </div>
      <Footer />
    </React.Fragment>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;
