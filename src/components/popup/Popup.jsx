import { Button, Dialog, DialogContent, DialogTitle, Typography, makeStyles } from '@mui/material';
import { GridCloseIcon } from '@mui/x-data-grid';
import React, { useState } from 'react'
import { SearchBar } from '../search/SearchBar';
import RoomView from '../../pages/view/roomview';
import UserView from '../../pages/view/userView';

import SevicerTable from "../../components/table/sevicertablee";



export default function Popup(props) {

    const { title, children, openPopup, setOpenPopup, results, setResults, roomid, value } = props;
    const [selectedCustomer, setselectedCustomere] = useState("");




    const [selectedSevicer, setselectedSevicer] = useState([""]);
    const callbackFunction = (childData) => {
        setselectedSevicer(childData)

    }

    async function handleClick(e) {
        e.preventDefault();

        try {

            const res = await fetch(`/contracts/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({

                    roomid: roomid,
                    userid: selectedCustomer._id,
                    sevicers: selectedSevicer

                })
            });
            const data = await res.json();

            var id = data._id
            alert("thành công");
            setResults("");
            setselectedCustomere("")

            await fetch(`/rooms/${roomid}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    status: "Đang thuê",
                    contractid: id,
                    userid: selectedCustomer._id

                })
            });
            setselectedSevicer(null)
            window.location.reload(true);

        } catch (err) {
            console.log(err);

        }
    }

    return (
        <Dialog open={openPopup} maxWidth="lg" >
            <DialogTitle >
                <div style={{ display: 'flex' }}>
                    <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
                        {title}
                    </Typography>
                    <Button
                        color="secondary"
                        onClick={() => {
                            setResults("")
                            setselectedCustomere("")
                            setOpenPopup(false)
                        }}>
                        <GridCloseIcon />
                    </Button>
                </div>
            </DialogTitle>
            <DialogContent dividers>
                {children}
            </DialogContent>
        </Dialog>
    )
}