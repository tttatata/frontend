import React, { useEffect, useState } from "react";


import HomeIcon from '@mui/icons-material/Home';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import ChecklistRtlIcon from '@mui/icons-material/ChecklistRtl';
import useFetch from "../../hooks/useFetch";
const RoomView = (props) => {


    const [load, setload] = useState([]);
    useEffect(() => {
        fetch(`/rooms/${props.roomid}`, {
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

            <h3>Thông tin phòng trọ</h3>
            <div className="inforoom">
                <p> <HomeIcon />Room:<span>{load.roomNumbers}</span></p>
                <p><ChecklistRtlIcon /> Type:  <span>{load.title}</span></p>
                <p><MonetizationOnIcon />Price:  <span >{load.price}</span></p>
            </div>
        </div>
    );
};

export default RoomView;
