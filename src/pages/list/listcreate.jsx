
import HomeIcon from '@mui/icons-material/Home';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import useFetch from '../../hooks/useFetch';
import { useEffect, useRef, useState } from 'react';

import { SearchBar } from '../../components/search/SearchBar';
import { Button, Checkbox, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { Dialog } from 'primereact/dialog';
import PopupUpdate from "../../components/popup/PopupUpdate";
import Popups from "../../components/popup/Popup";
import ChecklistRtlIcon from '@mui/icons-material/ChecklistRtl';
import RoomView from "../view/roomview";
import SevicerTable from "../../components/table/sevicertablee";
import ContractSevicer from "../../components/table/contractsevicer";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import TransgenderIcon from '@mui/icons-material/Transgender';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import UserView from '../view/userView';
import axios from 'axios';
export function ListCreate(props) {
    console.log(props)

    const { data } = useFetch(`/users/${props.userid}`);
    const [openPopup, setOpenPopup] = useState(false)
    const [openPopupUpdate, setOpenPopupUpdate] = useState(false)

    const [openPopupBill, setOpenPopupBill] = useState(false)

    const [selectedSevicer, setselectedSevicer] = useState([]);
    const [selectedRoom, setselectedRoom] = useState("");
    const [selectedContract, setselectedContract] = useState("");

    const [results, setResults] = useState([]);
    const [selectedCustomer, setselectedCustomere] = useState("");
    const [status, setStatus] = useState("");



    console.log(selectedSevicer)

    const handleChangesevicer = (e) => {

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

    async function handleClick(e) {
        e.preventDefault();
        try {

            const res = await fetch(`/contracts/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({

                    roomid: props.id,
                    userid: selectedCustomer._id,
                    sevicers: selectedSevicer

                })
            });
            const data = await res.json();
            console.log(data._id)
            var id = data._id
            alert("thành công");
            setResults("");
            setselectedCustomere("")

            await fetch(`/rooms/${props.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    status: "Busy",
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
    const [load, setload] = useState([]);
    const [load2, setload2] = useState([]);
    const [load3, setload3] = useState([]);
    const [loadSevicer, setloadSevicer] = useState([]);
    var returnedTarget = Object.assign(load3, load);
    console.log(returnedTarget)
    useEffect(() => {
        fetch(`/rooms/${props.id}`, {
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




        fetch(`/users/${props.userid}`, {
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
            .then(data2 => { setload2(data2) })

            .catch(err => {
                console.log("fetch error" + err);
            });



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


        // fetch(`/contracts/${props.contractid}`, {
        //     method: 'GET',
        //     headers: {
        //         "Accept": "application/json",
        //         'Content-Type': 'application/json'
        //     }
        // })
        //     .then(response => { return response.json(); })
        //     .then(responseData => { console.log(responseData); return responseData; })
        //     .then(data => { setload3(data.sevicers) })

        //     .catch(err => {
        //         console.log("fetch error" + err);
        //     });
    }, []);

    const handleClickDelete = async (props) => {
        try {
            await fetch(`/contracts/${props.contractid
                }`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    isDelete: true
                })
            });

            const res = await fetch(`/rooms/${props.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    contractid: "",
                    userid: "",
                    status: "Empty",

                })
            });

            const data = await res.json();
            console.log(data);

            alert("cập nhật thành công");
            window.location.reload(true);
        } catch (err) { }
    };

    return (
        <>

            <div className='productList'>
                <div key={props.id} className='productCard'
                >

                    <p className="row">
                        <h2 className="number">
                            <HomeIcon />
                            {props.name}
                        </h2>
                        <span
                            className="dot">
                            {props.status}

                        </span>
                    </p>
                    <p className="row">{props.title}</p>


                    <span className="row">
                        <MonetizationOnIcon />
                        {props.price}

                    </span>
                    <br />
                    <span className="row"><AccountCircleIcon />{data.username}</span>
                    <br />
                    <div>

                        {props.status == "Busy" ?
                            <div className="row-active">
                                <div className="row-active-top">
                                    <button className="btn-update" onClick={() => {
                                        setselectedContract(props.contractid)
                                        setOpenPopupUpdate(true)
                                  

                                    }}><EditIcon />Updater </button>

                                    <button className='btn-delete'
                                        onClick={() => {
                                            handleClickDelete(props)
                                        }}
                                    ><DeleteIcon />Remove    </button>

                                </div>
                                <div className="row-active-bottom">
                                    <button className='btn-bill'
                                        onClick={() => {
                                            setselectedContract(props.contractid)
                                            setOpenPopupBill(true)

                                        }}
                                    ><ReceiptLongIcon />  Bill</button>
                                </div>
                            </div>

                            :
                            <div className="row-active">
                                <div className="row-active-bottom-add">
                                    <button
                                        onClick={() => {
                                            setselectedRoom(props.id)
                                            setOpenPopup(true)
                                        }}><NoteAddIcon />New Contracts</button>
                                </div>
                            </div>
                        }


                        <Popups
                            value="CREATE"
                            title="Create"
                            openPopup={openPopup}
                            results={results}
                            setOpenPopup={setOpenPopup}
                            setResults={setResults}
                            roomid={props.id}
                            setselectedCustomere={setselectedCustomere}>
                            <div className="modal">
                                <div className="search-bar-container">

                                    <SearchBar setResults={setResults} />
                                    {results && results.length > 0 &&

                                        (
                                            <div className="results-list">
                                                {results.map((result, id) => {
                                                    return (
                                                        <div onClick={() => setselectedCustomere(result)}>
                                                            {result.phone}
                                                        </div>)

                                                })}
                                            </div>
                                        )}
                                </div>

                                <div className="top">
                                    <div className="form-create">
                                        <h2 className="form-title">Create contract</h2>
                                        <br />
                                        <div className="form-top">
                                            <div className="left">

                                                <h3>Thông tin phòng trọ</h3>
                                                <div className="inforoom">
                                                    <p> <HomeIcon />Room:<span>{load.roomNumbers}</span></p>
                                                    <p><ChecklistRtlIcon /> Type:  <span>{load.title}</span></p>
                                                    <p><MonetizationOnIcon />Price:  <span >{load.price}</span></p>
                                                </div>


                                            </div>



                                            <div className="right">
                                                <h3 >Thông tin khách thuê</h3>
                                                <div className="right-row1">
                                                    <p className="view-1" > <AssignmentIndIcon />Name:{props.value == "UPDATE" ? load2.username : selectedCustomer.username}</p>
                                                    <p className="view-2" > <CreditCardIcon />ID card:{props.value == "UPDATE" ? load2.identityId : selectedCustomer.identityId}</p>
                                                    <p className="view-3"> <TransgenderIcon />sex:{props.value == "UPDATE" ? load2.sex : selectedCustomer.sex}</p>
                                                </div>
                                                <div className="right-row2">
                                                    <p className="view-1"> <AlternateEmailIcon />email:{props.value == "UPDATE" ? load2.email : selectedCustomer.email}</p>
                                                    <p className="view-2"> <ContactPhoneIcon />phone:{props.value == "UPDATE" ? load2.phone : selectedCustomer.phone}</p>

                                                </div>


                                            </div>
                                        </div>
                                        <div className="form-bottom">
                                            <div className="form-table" >
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


                                                                key={row._id}
                                                                className="table-row"
                                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                            >
                                                                <TableCell component="th" scope="row">
                                                                    <Checkbox name="check" value={row._id}
                                                                        onChange={handleChangesevicer}
                                                                    // checked={rememberUser}

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
                        </Popups>

                        <PopupUpdate

                            title="Update"
                            openPopupUpdate={openPopupUpdate}
                            setOpenPopupUpdate={setOpenPopupUpdate}
                            selectedContract={selectedContract}
                            roomid={props.id}
                            userid={props.userid}
                            contractid={props.contractid}
                        >



                        </PopupUpdate>
                        {/* <PopBill

                            title="Update"
                            openPopupBill={openPopupBill}
                            setOpenPopupBill={setOpenPopupBill}
                            selectedContract={selectedContract}
                            roomid={props.id}
                            userid={props.userid}
                            contractid={props.contractid}
                        >
                        </PopBill> */}
                    </div>

                </div>

            </div >






        </>
    )
}