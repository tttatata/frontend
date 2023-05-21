
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import { roomInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { validprice, validroom } from "../../regex";

const NewRoom = () => {

  const navigate = useNavigate();
  const [info, setInfo] = useState({});


  const [roomnumber, setRoomnumber] = useState("");

  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [maxPeople, setMaxPeople] = useState("");
  const [desc, setDesc] = useState("");

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    if (roomnumber.length <= 0) {
      alert("Số phòng không được trống")
    } else {
      if (!validroom.test(roomnumber)) {
        alert("Số Phòng bắt đầu bằng RM'số tầng'.'số phòng'")
      }
    }

    if (category.length <= 0) {
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
    const newroom = {
      roomNumbers: roomnumber,
      title: category,
      price: price,
      maxPeople: maxPeople,
      desc: desc

    };
    console.log(newroom)
    // const roomNumbers = rooms.split(",").map((room) => ({ number: room }));
    try {
      await axios.post(`/rooms/`, newroom);
      alert("thành công");
      navigate('/rooms')
    } catch (error) {
      alert(error + "số phòng đã có");

    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add New Room</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form>
              <div className="formInput" >
                <label>IdentityId</label>
                <input
                  id="roomNumbers"
                  value={roomnumber}
                  name="identityId"
                  onChange={(e) => setRoomnumber(e.target.value)}
                  type="text"
                  placeholder="Vui lòng nhập số phòng cần tạo"

                />
              </div>

              <div className="formInput" >
                <label>Price</label>
                <input
                  id="price"
                  value={price}
                  name="price"
                  onChange={(e) => setPrice(e.target.value)}
                  type="text"
                  placeholder="Please enter tenant identityId"

                />
              </div>
              <div className="formInput" >
                <label>Số người</label>
                <input
                  id="maxPeople"
                  value={maxPeople}
                  name="maxPeople"
                  onChange={(e) => setMaxPeople(e.target.value)}
                  type="number"
                  placeholder="Sức chứa tối đa"

                />
              </div>

              <div className="formInput">
                <label>Loại phòng</label>
                <select className="inputboder" id="cate" onChange={(e) => setCategory(e.target.value)} placeholder='Select option'>
                  <option >Chọn Loại </option>
                  <option value='Popular' >Phổ thông</option>
                  <option value='High' >cao cấp</option>

                </select>

              </div>
              <div className="formInput" >
                <label>Miêu tả</label>
                <input
                  id="description"
                  value={desc}
                  name="identityId"
                  onChange={(e) => setDesc(e.target.value)}
                  type="textarea"
                  placeholder="Miêu tả phòng"

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

export default NewRoom;