import React, { useEffect, useState } from "react";

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
import { TableCell, TableRow } from "@mui/material";
function TableRowContract(props) {





    const [selectedSevicer, setselectedSevicer] = useState([]);

    const handleChange = (e) => {



        setselectedSevicer({ ...selectedSevicer, [e.target.name]: e.target.value })



    }
    console.log(selectedSevicer)





    const [load, setload] = useState([]);
    useEffect(() => {
        fetch(`/sevicers/${props.sevicersid}`, {
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
        <TableRow TableRow


            key={props.row}
            className="table-row"
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >

            <TableCell component="th" scope="row">
                {load.sevicerName}
            </TableCell>
            <TableCell component="th" scope="row">
                {load.price}
            </TableCell>
            <TableCell component="th" scope="row">
                <input
                    type="number"

                    onChange={handleChange}
                    name={props.sevicersid}
                    sendData
                />
            </TableCell>
        </TableRow>
    );
};

export default TableRowContract;    
