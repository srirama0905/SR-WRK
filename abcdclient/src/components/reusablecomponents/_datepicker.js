import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { KeyboardDatePicker } from "@material-ui/pickers";

const Datepick = (
    {
        Label,
        ID,
        selectedDate,
        handleDateChange
    }) => {
    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
                clearable
                id={ID}
                label={Label}
                value={selectedDate}
                placeholder="10/10/2018"
                onChange={date => handleDateChange(date)}
                format="MM/dd/yyyy"
            />
        </MuiPickersUtilsProvider>
    );
}
Datepick.propTypes = {
    Label: PropTypes.string.isRequired,
    SelectedDate: PropTypes.instanceOf(Date).isRequired,
    ID: PropTypes.string.isRequired,
    handleDateChange: PropTypes.func.isRequired
};


export default Datepick;