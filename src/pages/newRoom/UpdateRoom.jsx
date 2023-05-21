
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useState } from "react";
import { roomInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { validprice, validroom } from "../../regex";

const UpdateRoom = ({ title }) => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const params = useParams();
    const id = params.roomsId;
    const [roomNumbers, setRoomNumbers] = useState("");
    const [titles, setTitles] = useState("");
    const [price, setPrice] = useState("");
    const [maxPeople, setMaxPeople] = useState("");
    const [desc, setDesc] = useState("");




    useEffect(() => {
        fetch(`/rooms/${id}`, {
            method: 'GET',
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json'
            }
        })
            .then(response => { return response.json(); })
            .then(responseData => { console.log(responseData); return responseData; })
            .then(data => {
                setPrice(data.price)
                setRoomNumbers(data.roomNumbers)
                setTitles(data.title)
                setMaxPeople(data.price)
                setDesc(data.desc)

            })

            .catch(err => {
                console.log("fetch error" + err);
            });
    }, [])






    const handleClick = async (e) => {
        e.preventDefault();
        if (roomNumbers.length <= 0) {
            alert("Số phòng không được trống")
        } else {
            if (!validroom.test(roomNumbers)) {
                alert("Số Phòng bắt đầu bằng RM'số tầng'.'số phòng'")
            }
        }

        if (titles.length <= 0) {
            alert("vui lòng chọn loại phòng")
        }
        if (price.length <= 0) {
            alert("Giá phòng không được trống")
        } else {
            if (!validprice.test(price)) {
                alert("Giá thuê phải có dấu phẩy cách ở 3 chữ số")
            }
        }
        if (maxPeople.length <= 0) {
            alert("Số người tối đa không được trống")
        } else {
            if (!maxPeople <= 6) {
                alert("Số người không được lớn hơn 6")
            }
        }
        if (desc.length <= 0) {
            alert("Mô tả không được trống")
        }
        const data = new FormData();

        data.append("upload_preset", "upload");
        try {


            const res = await fetch(`/rooms/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    roomNumbers,
                    title,
                    price,
                    maxPeople,
                    desc

                })
            });

            const data = await res.json();
            console.log(data);
            alert("cập nhật thành công");
            setLoading(false);
            navigate('/rooms')

            // setUPdata(data2);
        } catch (error) {
            alert("Error Occured!" + error.response.data.message
            );
            setLoading(false);
        }
    };



    return (
        <div className="new">
            <Sidebar />
            <div className="newContainer">
                <Navbar />
                <div className="top">
                    <h1>{title}</h1>
                </div>
                <div className="bottom">

                    <div className="right">
                        <form>


                            <div className="formInput" >
                                <label>Room Number</label>
                                <input
                                    id="roomNumbers"
                                    value={roomNumbers}
                                    name="roomNumbers"
                                    onChange={(e) => setRoomNumbers(e.target.value)}
                                    type="text"
                                    placeholder="Please enter name"

                                />
                            </div>
                            <div className="formInput">
                                <label>Title</label>
                                <select id="titles" name="titles" value={titles} onChange={(e) => setTitles(e.target.value)}>
                                    <option value='Popular'>Phổ thông</option>
                                    <option value='High'>cao cấp</option>
                                </select>
                            </div>



                            <div className="formInput" >
                                <label>Price</label>
                                <input
                                    id="price"
                                    value={price}
                                    name="price"
                                    onChange={(e) => setPrice(e.target.value)}
                                    type="String"
                                    placeholder="Please enter tenant email"

                                />
                            </div>
                            <div className="formInput" >
                                <label>Max People </label>
                                <input
                                    id="maxPeople"
                                    value={maxPeople}
                                    name="maxPeople"
                                    onChange={(e) => setMaxPeople(e.target.value)}
                                    type="number"
                                    placeholder="Please enter tenant birth"

                                />
                            </div>
                            <div className="formInput" >
                                <label>Address</label>
                                <input
                                    id="desc"
                                    value={desc}
                                    name="desc"
                                    onChange={(e) => setDesc(e.target.value)}
                                    type="text"
                                    placeholder="Please enter tenant birth"

                                />
                            </div>


                            <button onClick={handleClick}>Send</button>
                        </form>
                    </div>
                </div>
            </div >
        </div >
    );
};

export default UpdateRoom;