import React, { useEffect, useState, useCallback } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import UserList from "./_userlist";

import { SearchUserDetails } from "../../redux/actions/_authuseraction";
import CutomAlerts from "../reusablecomponents/_alertmessages";
import { useCookieValid } from "../authentication/_isCookievalid";
import { DeleteLocalStorage } from "../../utilities/_commomfuncs";
const usrdetails = { userIDPK: -1,firstName: -1, lastName: -1, email: -1 ,isactive:-1,istrailUser:-1,
"skip":0,"take":5,"sortcolumn":"userIDPK","sortorder":"asc"};

export function ManageUserList({
    SearchUserDetails,
    
    history,
    ...props
}) {
    const [page, setPage] = React.useState(0);
    const [OrderBy, setOrderBy] = React.useState("userIDPK");
    const [Order, setOrder] = React.useState("asc");
    const [data, setData] = useState({ ...props.UserSchdata });
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const isCookie = useCookieValid();
    const [value, setValue] = useState(0); // integer state
  
    useEffect(() => {
        GetData();
        
    }, []);
  
    useEffect(() => {
      
    }, [value]);
  
    const GetData = async () => {
         await SearchUserDetails(usrdetails);
      }
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        usrdetails.skip =newPage > 0 ? newPage * rowsPerPage : 0;
        usrdetails.take =rowsPerPage;
        GetData();
    };
    const resetsearch = () => {
            usrdetails.userIDPK = -1;
            usrdetails.firstName = -1;
            usrdetails.lastName= -1;
            usrdetails.email= -1;
            usrdetails.isactive = -1;
            usrdetails.istrailUser =-1;
            usrdetails .skip = 0;
            usrdetails.take =5;
            usrdetails.sortcolumn = "userIDPK";
            usrdetails.sortorder = "asc";
            setValue(value => value + 1);
    }
    const onsearch = () => {
        GetData();
    }
    const onchange = (e) => {
        let ischecked = 0;
        ischecked = e.currentTarget.type === "checkbox" && e.currentTarget.checked ? 1 : 0;
        usrdetails[e.currentTarget.id] = e.currentTarget.type === "checkbox" ? ischecked : e.currentTarget.value;
        setValue(value => value + 1);
    }
    const requestSort = (e) => {
       setOrder(Order === "asc" ? "desc" : "asc");
       setOrderBy(e.currentTarget.id);
       setPage(0);
       usrdetails.sortcolumn=e.currentTarget.id;
       usrdetails.sortorder = Order === "asc" ? "desc" : "asc";
       usrdetails.skip = 0;      
       GetData();

      };
    const handleChangeRowsPerPage = event => {
        setRowsPerPage(+event.target.value);
        setPage(0);
        usrdetails.take =event.target.value;
        GetData();
    };

    function DeleteStorageBySessionOut() {
        if (isCookie === false) {
            DeleteLocalStorage("LoginDetailsStorage");
            window.location = "/login"
        }
        return false;
    }

    return (
        <div>
            {DeleteStorageBySessionOut() === false ? (
                <div>
                   {/* <CutomAlerts alertType={SearchUserDetails[0].errorCode} Messge={SearchUserDetails[0].errMsge} />*/}
                    <UserList
                        data={props.UserSchdata.length > 1 ? props.UserSchdata [0]:[]}
                        page={page}
                        rowsPerPage={rowsPerPage}
                        pagedata={props.UserSchdata.length > 1 ? props.UserSchdata[1].totlapages: 0}
                        handleChangePage={handleChangePage}
                        handleChangeRowsPerPage={handleChangeRowsPerPage}
                        requestSort={requestSort}
                        Order ={Order}
                        OrderBy={OrderBy}
                        resetsearch={resetsearch}
                        usrdetails ={usrdetails}
                        onchange ={onchange}
                        onsearch ={onsearch}
                    />
                </div>
            ) : ""}
        </div>
    );
}

ManageUserList.propTypes = {
    history: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        UserSchdata: state.UserSchdata
    };
}

const mapDispatchToProps = {
    SearchUserDetails
    
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ManageUserList);

