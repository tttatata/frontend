import { Button, Dialog, DialogContent, DialogTitle, Table, TableBody, TableCell, TableHead, TableRow, Typography, makeStyles } from '@mui/material';
import { GridCloseIcon, gridRowIdsSelector } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react'
import RoomView from '../../pages/view/roomview';
import UserView from '../../pages/view/userView';



import ContractSevicers from "../../components/table/contractsevicer";


export default function PopBill(props) {

    const date = new Date();
    const defaultValue = date.toLocaleDateString('en-CA');
    const [loadSevicer, setloadSevicer] = useState([]);

    const { title, openPopupBill, setOpenPopupBill, contractid, roomid, userid } = props;

    const [load, setload] = useState([]);



    async function handleClick(e) {
        e.preventDefault();


        try {



        } catch (err) {
            console.log(err);

        }
    }




    console.log(contractid)
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
                // console.log(responseData); 
                return responseData;
            })
            .then(data2 => { setloadSevicer(data2) })

            .catch(err => {
                console.log("fetch error" + err);
            });









    }, []);

    console.log(load)


    return (
        <Dialog open={openPopupBill} maxWidth="lg" >
            <DialogTitle >
                <div style={{ display: 'flex' }}>
                    <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
                        {title}
                    </Typography>
                    <Button
                        color="secondary"
                        onClick={() => {

                            setOpenPopupBill(false)
                        }}>
                        <GridCloseIcon />
                    </Button>
                </div>
            </DialogTitle>
            <DialogContent dividers>
                <div className="modal">


                    <div className="top">
                        <div className="form-create">

                            <div className="form-top">
                                <div className="left">
                                    <RoomView roomid={roomid}

                                    />

                                </div>



                                <div className="right">

                                    <UserView
                                        value="UPDATE"

                                        userid={userid}
                                    />

                                </div>
                            </div>
                            <div className="form-bottom">
                                <div className="form-table" >

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

                                                    // onClick={() => {
                                                    //     setselectedSevicer(row)
                                                    // }}
                                                    key={row._id}
                                                    className="table-row"
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    <TableCell component="th" scope="row">
                                                        {/* <Checkbox name="check" value={row._id}
                                                            onChange={handleChange}
                                                            checked={rememberUser}

                                                        /> */}
                                                    </TableCell>
                                                    <TableCell component="th" scope="row">
                                                        {row.sevicerName}
                                                    </TableCell>
                                                    <TableCell align="right">{row.price}</TableCell>

                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>


                            </div>



                        </div>
                    </div>
                    <br />
                    <div className="wrapper-button">
                        <button
                            onClick={handleClick}
                            className="send-button">Send</button></div>

                </div>
            </DialogContent>
        </Dialog>
    )
}