/*Error Messgaes */
const ErrorObject = Object.freeze({
    ERROR_500: "There is an application erro.Please contact Admin.",
    ERROR_402: "There is an application erro.Please contact Admin.",
    ERROR_401: "Session expired.Please login again in to appliction.",
    ERROR_403: "Don't have access to operate this action.Please contact Admin.",
    SUCCESS_200: "Record saved successfully in to the system.",
    CONNECTION_ERROR: "Server connection issue,Please contact Admin."

});
export const DeleteLocalStorage = (storageName) => {
    localStorage.removeItem(storageName);
}
export const ReturnMessage = (ErrCode, Msg) => {

    switch (ErrCode) {
        case 500:
            return ErrorObject.ERROR_500;
        case 402:
            return ErrorObject.ERROR_402;
        case 401:
            return ErrorObject.ERROR_401;
        case 403:
            return ErrorObject.ERROR_403;
        case 200:
            return ErrorObject.ERROR_200;
        case 700:
            return Msg;

        default:
            return ErrorObject.CONNECTION_ERROR
    }
}



