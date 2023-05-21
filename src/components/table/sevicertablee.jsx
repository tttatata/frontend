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
const TableSevicer = (props) => {
    const { contractid } = props;

    const { data } = useFetch(`/contracts/${contractid}`);


    const [selectedSevicer, setselectedSevicer] = useState([]);
    const [loadSevicer, setloadSevicer] = useState([]);
    const [rememberUser, setRememberUser] = useState();

    const [load1, setload1] = useState();
    const [load, setload] = useState([]);
    // console.log(loadIdSevicer)
    // console.log(load._id)


    const handleChange = (e) => {

        const value = e.target.value
        const checked = e.target.checked

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
    useEffect((data) => {


        fetch(`/sevicers/`, {
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
            .then(data2 => {
                setloadSevicer(data2)
            })

            .catch(err => {
                console.log("fetch error" + err);
            });



        fetch(`/contracts/${contractid}`, {
            method: 'GET',
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json'
            }
        })
            .then(response => { return response.json(); })
            .then(responseData => { console.log(responseData); return responseData; })
            .then(data => { setload(data.sevicers) })

            .catch(err => {
                console.log("fetch error" + err);
            });

    }, []);


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

                    {loadSevicer.map((row) => (

                        <TableRow TableRow

                            onClick={() => {
                                setselectedSevicer(row)
                            }}
                            key={row._id}
                            className="table-row"
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                <Checkbox name="check" value={row._id}
                                    onChange={handleChange}
                                    checked={rememberUser}

                                />
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {row.sevicerName}
                            </TableCell>
                            <TableCell align="right">{row.price}</TableCell>

                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div >
    );
};

export default TableSevicer;    
