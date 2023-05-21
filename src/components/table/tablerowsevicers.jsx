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
import { Checkbox, TableCell, TableRow } from "@mui/material";
const TableRowSevicer = (props) => {
    const [rememberUser, setRememberUser] = useState();


    const [list, setList] = useState([]);

    const { contractsid } = props;


    useEffect(() => {

        fetch(`/contracts/${contractsid}`, {
            method: 'GET',
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json'
            }
        })
            .then(response => { return response.json(); })
            .then(responseData => { console.log(responseData); return responseData; })
            .then(data => { setList(data.sevicers) })

            .catch(err => {
                console.log("fetch error" + err);
            });
    }, []);



    return (
        <TableRow TableRow


            key={props.sevicer}
            className="table-row"
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
            <TableCell component="th" scope="row">
                {/* {.map((row) => (
                    <Checkbox name="check" value={props.sevicer._id}

                        checked={rememberUser}

                    />
                ))} */}
            </TableCell>
            <TableCell component="th" scope="row">
                {props.sevicer.sevicerName}
            </TableCell>
            <TableCell component="th" scope="row">
                {props.sevicer.price}
            </TableCell>
        </TableRow>
    );
};

export default TableRowSevicer;    
