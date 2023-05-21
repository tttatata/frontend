import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./create.scss";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import { Link, useFetcher, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { Button, Checkbox, Container, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import Popup from "reactjs-popup";
import Adduser from "../../components/content/adduser";
import { ListCreate } from "../list/listcreate";
import { Dialog } from 'primereact/dialog';
import Popups from "../../components/popup/Popup";
import { SearchBar } from "../../components/search/SearchBar";
import ChecklistRtlIcon from '@mui/icons-material/ChecklistRtl';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import TransgenderIcon from '@mui/icons-material/Transgender';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import CancelIcon from '@mui/icons-material/Cancel';
import axios from "axios";

const Create = () => {











    const navigate = useNavigate();

    const [selectedSevicer, setselectedSevicer] = useState([null]);

    const [results, setResults] = useState([]);

    const [selectedCustomer, setselectedCustomere] = useState("");
    const { data, loading, error } = useFetch(`/rooms`);
    const [openPopup, setOpenPopup] = useState(false)
    const location = useLocation();
    const path = location.pathname.split("/")[1];
    const [list, setList] = useState([]);
    const [list1, setList1] = useState([]);
    const [listContract, setListContract] = useState([null]);
    const [selectedRoom, setselectedRoom] = useState("");
    const [info, setInfo] = useState({});


    useEffect(() => {

        setList(data.filter((item) => item.isDelete == false));
    }, [data]);

    return (
        <>
            <div className="list">
                <Sidebar />
                <div className="listContainer">
                    <Navbar />
                    <div className="datatable">
                        <div className="datatableTitle">
                            Danh sách phòng

                        </div>
                        <div className="widgets">

                            {list.map((element, id) => (

                                <ListCreate
                                    id={element._id}
                                    key={element.id}
                                    name={element.roomNumbers}
                                    price={element.price}
                                    status={element.status}
                                    timeLeft={element.title}
                                    rating={element.rating}
                                    userid={element.userid}
                                    title={element.title}
                                    contractid={element.contractid}
                                />

                            ))}
                        </div>
                    </div>
                </div >

            </div >

        </>
    );
};

export default Create;
