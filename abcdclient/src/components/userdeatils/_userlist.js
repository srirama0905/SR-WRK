import React from 'react';
import { Form } from 'react-final-form';
import PropTypes from "prop-types";
import { makeStyles } from '@material-ui/core/styles';
import {
    Paper,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TableSortLabel,
    TextField,
    Checkbox,
    FormControlLabel,
    Button

} from '@material-ui/core';

import * as Constants from "../../utilities/_labelinfo";

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 700,
    },
    labelRoot: {
        fontSize: 22
    }
});
const UserList = ({
    data,
    page,
    rowsPerPage,
    pagedata,
    handleChangePage,
    handleChangeRowsPerPage,
    requestSort,
    OrderBy,
    Order,
    resetsearch,
    usrdetails,
    onchange,
    onsearch
}) => {
    const classes = useStyles();
    return (
        <div>

            <form>
                <Paper style={{ padding: 16 }}>
                    <Grid container alignItems="flex-start" spacing={2}>
                        <Grid item xs={3}>
                            <TextField fullWidth id="standard-basic" id="firstName" 
                            label={Constants.LABEL_FIRST_NAME} InputLabelProps={{ shrink: true, classes: { root: classes.labelRoot } }} 
                            onChange ={onchange}
                            value={usrdetails.firstName == -1 ? "" :usrdetails.firstName} />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField fullWidth id="standard-basic" id="lastName" 
                            label={Constants.LABEL_LAST_NAME} InputLabelProps={{ shrink: true, classes: { root: classes.labelRoot } }}
                            onChange ={onchange}
                            value={usrdetails.lastName == -1 ? "" :usrdetails.lastName} />
                             
                        </Grid>
                        <Grid item xs={3}>
                            <TextField fullWidth id="standard-basic" id="email" 
                            label={Constants.LABEL_EMAIL} InputLabelProps={{ shrink: true, classes: { root: classes.labelRoot } }} 
                            onChange ={onchange}
                            value={usrdetails.email == -1 ? "" :usrdetails.email} />
                        </Grid>
                        <Grid item xs={1}>
                            <FormControlLabel
                                control={<Checkbox name="checkedB" color="primary" id="isactive" onChange ={onchange}
                                checked ={usrdetails.isactive === 1 ? true : false}
                                />}
                                label={Constants.LABEL_ACTIVE} style={{ paddingTop: 18 }}
                            />
                        </Grid>
                        <Grid item xs={1}>
                            <FormControlLabel
                                control={<Checkbox name="checkedB" color="primary" id="istrailUser"  onChange ={onchange}
                                checked ={usrdetails.istrailUser === 1 ? true : false} />}
                                label={Constants.LABEL_TRAIL_USER} style={{ paddingTop: 18 }}
                            />
                        </Grid>
                    </Grid>
                    <Grid container alignItems="flex-start" spacing={2}>
                        <Grid item style={{ marginTop: 16 }}>
                            <Button type="button" variant="contained" onClick={resetsearch}>
                                {Constants.LABEL_BTN_RESET}
                            </Button>
                        </Grid>
                        <Grid item style={{ marginTop: 16 }}>
                            <Button variant="contained" color="primary" type="button" onClick={onsearch} >
                                {Constants.LABEL_BTN_SEARCH}
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
            </form>
            <Paper className={classes.root}>
                <TableContainer className={classes.container}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    <TableSortLabel id="userIDPK" active={OrderBy === "userIDPK"} direction={Order} onClick={requestSort}>
                                        {Constants.LABEL_USER_ID}
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell align="center">
                                    <TableSortLabel id="firstName"
                                        active={OrderBy === "firstName"}
                                        direction={Order}
                                        onClick={requestSort}
                                    >
                                        {Constants.LABEL_FIRST_NAME}
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell align="center">
                                    <TableSortLabel id="lastName" active={OrderBy === "lastName"} direction={Order} onClick={requestSort}>
                                        {Constants.LABEL_LAST_NAME}
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell align="center">  <TableSortLabel id="email" active={OrderBy === "email"} direction={Order} onClick={requestSort}>
                                    {Constants.LABEL_EMAIL}
                                </TableSortLabel></TableCell>
                                <TableCell align="center">  <TableSortLabel id="isTrailUser" active={OrderBy === "isTrailUser"} direction={Order} onClick={requestSort}>
                                    {Constants.LABEL_TRAIL_USER}
                                </TableSortLabel></TableCell>
                                <TableCell align="center">  <TableSortLabel id="isActive" active={OrderBy === "isActive"} direction={Order} onClick={requestSort}>
                                    {Constants.LABEL_ACTIVE}
                                </TableSortLabel></TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map(row => {
                                return (
                                    <TableRow >
                                        <TableCell component="th" scope="row" width="5%">
                                            {row.userIDPK}
                                        </TableCell>
                                        <TableCell align="center" width="15%">{row.firstName}</TableCell>
                                        <TableCell align="center" width="15%" >{row.lastName}</TableCell>
                                        <TableCell align="center" width="10%">{row.email}</TableCell>
                                        <TableCell align="center" width="10%">{row.isTrailUser}</TableCell>
                                        <TableCell align="center" width="10%">{row.isActive === false ? "In Active" : "Active"}</TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 15]}
                    component="div"
                    count={pagedata}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
        </div>

    );
}

UserList.propTypes = {
    data: PropTypes.array.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
    pagedata: PropTypes.object.isRequired,
    handleChangePage: PropTypes.func.isRequired,
    handleChangeRowsPerPage: PropTypes.func.isRequired,
    requestSort: PropTypes.func.isRequired,
    OrderBy: PropTypes.string.isRequired,
    Order: PropTypes.string.isRequired,
    usrdetails:PropTypes.object.isRequired,
    onchange:PropTypes.func.isRequired,
    resetsearch:PropTypes.func.isRequired,
    onsearch:PropTypes.func.isRequired,
};

export default UserList;