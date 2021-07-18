import React, { useState, useRef } from "react";
import PropTypes from "prop-types";

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';
import clsx from "clsx";


import { useStyles } from "../../utilities/_menustyle";
/*Import Appplication Labels */
import * as Constants from "../../utilities/_labelinfo";

const HeaderMenu = ({
    anchorEl,
    mobileMoreAnchorEl,
    isMenuOpen,
    isMobileMenuOpen,
    onLogout,
    handleProfileMenuOpen,
    handleMobileMenuClose,
    handleMenuClose,
    handleMobileMenuOpen,
    handleDrawerOpen,
    open
}) => {
    const classes = useStyles();
    const menuId = 'primary-search-account-menu';
    
    const renderMenu = (
        <Menu
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            anchorEl={anchorEl}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}open={isMenuOpen}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>{Constants.LABEL_MYACCOUNT}</MenuItem>
            <MenuItem onClick={handleMenuClose}>{Constants.LABEL_PROFILE}</MenuItem>
            <MenuItem onClick={onLogout}>{Constants.LABLE_LOGOUT}</MenuItem>
          </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
          anchorEl={mobileMoreAnchorEl}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          id={mobileMenuId}
          keepMounted
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={isMobileMenuOpen}
          onClose={handleMobileMenuClose}
        >
          <MenuItem onClick={handleProfileMenuOpen}>
            <IconButton
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </MenuItem>
        </Menu>
      );
    
    return (
        <div className={classes.root}>
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open
                })}
            >
                <Toolbar>
                  
                    <Typography className={classes.title} variant="h6"nowrap   >
                        {Constants.LABEL_HOME_PAGE}
                    </Typography>
                    

                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
        </div>
    )
}
HeaderMenu.propTypes = {
    anchorEl: PropTypes.object.isRequired,
    mobileMoreAnchorEl: PropTypes.object.isRequired,
    isMenuOpen: PropTypes.bool,
    isMobileMenuOpen: PropTypes.bool,
    onLogout: PropTypes.func.isRequired,
    handleProfileMenuOpen: PropTypes.func.isRequired,
    handleMobileMenuClose: PropTypes.func.isRequired,
    handleMenuClose: PropTypes.func.isRequired,
    handleMobileMenuOpen: PropTypes.func.isRequired,
    handleDrawerOpen: PropTypes.func.isRequired,
    open: PropTypes.bool
  };
  
export default HeaderMenu;