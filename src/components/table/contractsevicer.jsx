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
import { Checkbox, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import TableRowContract from "./tablerowcontract";
const ContractSevicer = (props) => {

    const { contractid } = props;
    console.log(contractid)
    const [selectedSevicer, setselectedSevicer] = useState([]);

    const [loadContract, setloadContract] = useState([]);


    const handleChange = (e) => {

        const value = e.target.value
        const checked = e.target.checked

        console.log(value, checked)
        if (checked) {
            setselectedSevicer([
                ...selectedSevicer, value
            ])

        }
        else {
            setselectedSevicer(selectedSevicer.filter((e) => (e !== value)))
        }


    }

    props.parentCallback(selectedSevicer);
    useEffect(() => {





        fetch(`/contracts/${contractid}`, {
            method: 'GET',
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json'
            }
        })
            .then(response => { return response.json(); })
            .then(responseData => {
                console.log(responseData);
                return responseData;
            })
            .then(data => { setloadContract(data.sevicers) })

            .catch(err => {
                console.log("fetch error" + err);
            });







    }, []);


    console.log(loadContract)
    return (
        <div className="expense-item">
            <p>Sevicer </p>
            <Table aria-label="simple table" size="small" className="table" >
                <TableHead>
                    <TableRow>
                        <TableCell>Check</TableCell>
                        <TableCell>Sevicer name</TableCell>
                        <TableCell align="right">Price</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody className="table-body" >
                    {loadContract.map((row,id) => (

                        <TableRowContract
                            key={row}
                           sevicersid={row}
                           
                       />

        
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default ContractSevicer;    
