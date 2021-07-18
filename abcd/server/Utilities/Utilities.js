const bcrypt = require('bcrypt');
var dateFormat = require('dateformat');

const setPasswordHashing = (_inputpassword) => {

    return bcrypt.hashSync(_inputpassword, 12);
};
const isPasswordHashing = (_password, _hashingpwd) => {
    if (bcrypt.compareSync(_password, _hashingpwd)) {
        return true;
    } return false;
};
const converStringtoDate = (_data) => {
    let _date = _data.split("&");
    return new Date(_date[0] + "/" + _date[1] + "/" + _date[2]);

};
const isNullorEmpty = (_data) => {
    if (_data != null) {
        if (_data !== -1) {
            if (_data.trim().length > 0)
                return true;
        }

    }
    return false;
};

const isNumberValidation = (data) => {
    if (Number.isNaN(data)) return -1;
    if (data != null && data <= 0) return -1;
    return data;
}
const isNumberValidationForGet = (data) => {
    try{
        if (Number.isNaN(data)) return -1;
        return data;
    }
    catch(ex){
        return -1;
    }
}
const isDate = (data) => {
    if (data != null && data !== -1) {
        if (data.length > 0) {
            return new Date(data);
        }
    }
    return -1;
}

const DateDifference = (stDate,edDate) => {
        timeDifference = new Date(edDate).getTime() - new Date(stDate).getTime();
         if(Math.ceil(timeDifference / (1000 * 3600 * 24)) <=0)
         return -1;
         else return 1;
}
const DateFormat = (date) =>{
    if(date === null || date === undefined)
    return null;
     return dateFormat(date, "yyyy-mm-dd");
}
const IsnullDateCheck = (data) => {
  
    try{    
        if(data === undefined || data === null) return null;    
         return new Date(data);
    }
    catch (ex){
        return null;
    }
       
     
}
module.exports = {
    setPasswordHashing: setPasswordHashing,
    isPasswordHashing: isPasswordHashing,
    converStringtoDate: converStringtoDate,
    NumberValidation: isNumberValidation,
    DateValidation: isDate,
    isNullorEmpty: isNullorEmpty,
    IsnullDateCheck:IsnullDateCheck,
    isNumberValidationForGet:isNumberValidationForGet,
    DateDifference:DateDifference,
    DateFormat:DateFormat
}