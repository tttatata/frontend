import React, { useEffect, useState } from "react";
import "./view.scss";
import ChecklistRtlIcon from '@mui/icons-material/ChecklistRtl';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import TransgenderIcon from '@mui/icons-material/Transgender';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import CancelIcon from '@mui/icons-material/Cancel';
import HomeIcon from '@mui/icons-material/Home';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

import useFetch from "../../hooks/useFetch";
const UserView = (props) => {


    const { value, selectedCustomer, userid } = props;


    const [load, setload] = useState([]);
    useEffect(() => {
        fetch(`/users/${userid}`, {
            method: 'GET',
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json'
            }
        })
            .then(response => { return response.json(); })
            .then(responseData => {
                // console.log(responseData); 
                return responseData;
            })
            .then(data2 => { setload(data2) })

            .catch(err => {
                console.log("fetch error" + err);
            });








    }, []);









    return (
        <div className="expense-item">

            <h3 >Thông tin khách thuê</h3>
            <div className="right-row1">
                <p className="view-1" > <AssignmentIndIcon />Name:{value == "UPDATE" ? load.username : selectedCustomer.username}</p>
                <p className="view-2" > <CreditCardIcon />ID card:{value == "UPDATE" ? load.identityId : selectedCustomer.identityId}</p>
                <p className="view-3"> <TransgenderIcon />sex:{value == "UPDATE" ? load.sex : selectedCustomer.sex}</p>
            </div>
            <div className="right-row2">
                <p className="view-1"> <AlternateEmailIcon />email:{value == "UPDATE" ? load.email : selectedCustomer.email}</p>
                <p className="view-2"> <ContactPhoneIcon />phone:{value == "UPDATE" ? load.phone : selectedCustomer.phone}</p>

            </div>
        </div>
    );
};

export default UserView;    
