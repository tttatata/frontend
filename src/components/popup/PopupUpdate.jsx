import { Button, Dialog, DialogContent, DialogTitle, Typography, makeStyles } from '@mui/material';
import { GridCloseIcon } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react'
import RoomView from '../../pages/view/roomview';
import UserView from '../../pages/view/userView';
import useFetch from '../../hooks/useFetch';


import SevicerTable from "../../components/table/sevicertablee";



export default function PopupUpdate(props) {

    const { title, openPopupUpdate, setOpenPopupUpdate, selectedContract, contractid, roomid, userid } = props;

    const [selectedSevicer, setselectedSevicer] = useState([""]);
    const callbackFunction = (childData) => {
        setselectedSevicer(childData)

    }


   








    return (
        <Dialog open={openPopupUpdate} maxWidth="lg" >
            <DialogTitle >
                <div style={{ display: 'flex' }}>
                    <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
                        {title}
                    </Typography>
                    <Button
                        color="secondary"
                        onClick={() => {

                            setOpenPopupUpdate(false)
                        }}>
                        <GridCloseIcon />
                    </Button>
                </div>
            </DialogTitle>
            <DialogContent dividers>
                <div className="modal">


                    <div className="top">
                        <div className="form-create">
                            <h2 className="form-title">Create contract</h2>
                            <br />
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
                                    <SevicerTable
                                        parentCallback={callbackFunction}
                                        contractid={contractid}
                                    />

                                </div>


                            </div>



                        </div>
                    </div>
                    <br />
                    <div className="wrapper-button">
                        <button
                            // onClick={handleClick}
                            className="send-button">Send</button></div>

                </div>
            </DialogContent>
        </Dialog>
    )
}