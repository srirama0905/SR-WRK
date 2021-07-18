import React, { useState, useRef } from "react"
import PropTypes from "prop-types";
import { Route, Switch, Redirect, NavLink, HashRouter } from "react-router-dom";

import IconButton from '@material-ui/core/IconButton';
import clsx from "clsx";
import { makeStyles, useTheme, fade } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";

import MailIcon from "@material-ui/icons/Mail"; //Mail
import StorageIcon from '@material-ui/icons/Storage'; //RPMP
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn'; //Timesheet
import Link from '@material-ui/core/Link';
import TimelineRoundedIcon from '@material-ui/icons/TimelineRounded'; //Linecard
import WavesRoundedIcon from '@material-ui/icons/WavesRounded';// Blogs
import WebRoundedIcon from '@material-ui/icons/WebRounded'; //Issues
import SettingsApplicationsRoundedIcon from '@material-ui/icons/SettingsApplicationsRounded'; // Admins
import { useStyles } from "../../utilities/_menustyle";

const SidebarMenu = ({
  hdrID,
  _arrHeaderID,
  handleDrawerClose,
  onlinkclicked,
  onHdrMenuClick,
  clickId,
  open
}) => {

  const classes = useStyles();
  const theme = useTheme();

const GetMainMenuImages = () => {
  console.log("${sidebar}");

  return (
    <div>
      {

        ["All mail", "Trash", "Spam"].map((text, hdrindex) => {
          return (
            <div>
              <div>
                <ListItem button key={text} id={hdrindex} key= {hdrindex} >
                  <ListItemIcon style={{ minWidth: 30 }}>
                    {hdrindex % 2 === 0 ? <StorageIcon /> : <MailIcon />}
                  </ListItemIcon>
                </ListItem>
              </div>
              <Divider />
            </div>
          )
        }
        )
      }
    </div>
 )
}

  const GetMainMenu = () => {
    return (
      <div>
        {
          ["All mail", "Trash", "Spam"].map((text, hdrindex) => {
            return (
              <div>
                <div>
                  <ListItem button key={text} id={hdrindex} onClick={onHdrMenuClick} key= {hdrindex} >
                    <ListItemIcon style={{ minWidth: 30 }}>
                      {hdrindex % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                    </ListItemIcon>
                    <Link component="button" variant="body1"  >
                      {"User Module"}
                    </Link>
                  </ListItem>
                </div>
                <div>
                  {GetSubmenu(hdrindex)}
                </div>
                <Divider />
              </div>
            )
          }
          )
        }
      </div>
   )
  }
  function GetSubmenu(hdrIndex) {
    return (
      <div >
        {
          _arrHeaderID.map(ObjMenu => {
            return ObjMenu.ObjectID === hdrIndex && ObjMenu.isShow === true ?
              <div>
                {
                  [11].map((text, index) => (
                    <ListItem button key={text} id={index} className={classes.itemlistpros} key ={index}
                      id={index} onClick={onlinkclicked} className={clickId === index ? classes.itemlistbgcolor : ""}>
                      <NavLink to="/usrsch" variant="body5" style={{ paddingLeft: 35, textDecoration: "none" }}
                      >
                        Search User
                     </NavLink>
                     <NavLink to="/usrs" variant="body5" style={{ paddingLeft: 35, textDecoration: "none" }}
                      >
                        Create User
                     </NavLink>
                    </ListItem>
                  ))}
              </div>
              : ""
          }
          )}
      </div>
    );
  }
  return (
    <div className={classes.root}>
      <CssBaseline />
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open
          })
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose} >
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
                <ChevronLeftIcon />
              )}
          </IconButton>
        </div>
        <Divider />
        <List>
          {open === false ? GetMainMenuImages() : GetMainMenu()}
        </List>
      </Drawer>
    </div>
  );
}

SidebarMenu.propTypes = {
  handleDrawerClose: PropTypes.func.isRequired,
  _arrHeaderID: PropTypes.array.isRequired,
  onlinkclicked: PropTypes.func.isRequired,
  onHdrMenuClick: PropTypes.func.isRequired,
  hdrID: PropTypes.number,
  clickId: PropTypes.number,
  open: PropTypes.bool
};

export default SidebarMenu;
