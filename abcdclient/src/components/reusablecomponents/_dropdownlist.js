import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from "prop-types";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(0),
        minWidth: 120,

    },
    labelRoot: {
        fontSize: 22
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
      
    },
}));

function GetSubmenu(_data, _displaytext, _bindvaluetext, currentId) {

    return _data.map((obj, index) => {
        //console.log(obj);
        return (

            <MenuItem id ={currentId}  key={obj[_bindvaluetext]} value={obj[_bindvaluetext]}>{obj[_displaytext]}</MenuItem>
         );
       });
}

const CustomDropdown = (
    {
        Label,
        Error,
        value,
        _data,
        isrequired,
        _displaytext,
        _bindvaluetext,
        handleChange,
        TDID
    }
) => {
    
    const classes = useStyles();
    return (
        <div>
            <FormControl className={classes.formControl} fullWidth  error ={isrequired === 1 ? true:false}>
                <InputLabel  
                 className={classes.labelRoot} id= {5}
                    >
                    {Label}
                </InputLabel>
                <Select
                    
                    id={TDID}
                    value={value} onChange={handleChange} displayEmpty className={classes.selectEmpty}
                    inputProps={{
                        name: 'ddlname',
                        id: 'ddl-val'
                      }}
                >
                  
                    {
                        GetSubmenu(_data, _displaytext, _bindvaluetext, TDID)
                    }
                </Select>
                <FormHelperText className={isrequired === 1 ? "Mui - error" : ""}>{isrequired === 1 ? Error : ""}</FormHelperText>
            </FormControl>
        </div>
    );
}
CustomDropdown.propTypes = {
    TDID:PropTypes.number,
    Label: PropTypes.string.isRequired,
    Error: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    _data: PropTypes.array,
    isrequired: PropTypes.number,
    _displaytext: PropTypes.string.isRequired,
    _bindvaluetext: PropTypes.string.isRequired,
    handleChange:PropTypes.func.isRequired
};
export default CustomDropdown;