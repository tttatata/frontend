import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";

import { useState } from "react";
import axios from "axios";
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { convertLength } from "@mui/material/styles/cssUtils";
import { validEmail, validcccd, validsdt } from '../../regex.js';
import useFetch from "../../hooks/useFetch";

const New = ({ inputs, title }) => {

  const [file, setFile] = useState("");
  const [image, setImage] = useState("");
  const [info, setInfo] = useState({});
  const [username, setUsername] = useState("");
  const [identityId, setIdentityId] = useState("");
  const [email, setEmail] = useState("");
  const [birth, setBirth] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [sex, setSex] = useState("");
  const [imgcccd, setImgcccd] = useState("");

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {

    e.preventDefault();

    if (username.length <= 0) {
      alert("Tên không được trống")
    }

    if (identityId.length <= 0) {
      alert("CCCD không được trống")
    } else {
      if (!validcccd.test(identityId)) {
        alert("CCCD phải là 12 số")
      }
    }

    if (email.length <= 0) {
      alert("Email không được trống")
    } else {
      if (!validEmail.test(email)) {
        alert("Email phải theo dạng: abc@gmail.com")
      }
    }

    if (birth.length <= 0) {
      alert("Ngày sinh không được trống")
    }
    if (address.length <= 0) {
      alert("Địa chỉ không được trống")
    }
    if (phone.length <= 0) {
      alert("SĐT không được trống")
    } else {
      if (!validsdt.test(phone)) {
        alert("Email phải theo dạng: abc@gmail.com")
      }
    }
    if (file.length <= 0) {
      alert("Avatar không được trống")
    }
    if (image.length <= 0) {
      alert("Ảnh CCCD không được trống")
    }

    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "Upload");
    const data2 = new FormData();
    data2.append("file", image);
    data2.append("upload_preset", "CCCDFile");

    try {
      const uploadRes = await axios.post(

        "https://api.cloudinary.com/v1_1/djdt3mu2j/image/upload",
        data
      );
      const uploadRes2 = await axios.post(

        "https://api.cloudinary.com/v1_1/djdt3mu2j/image/upload",
        data2
      );
      const url = uploadRes.data.url;
      const urlimage = uploadRes2.data.url;

      const newUser = {
        username: username,
        identityId: identityId,
        email: email,
        birth: birth,
        address: address,
        phone: phone,
        sex: sex,
        img: url,
        imgcccd: urlimage,

      };

      await axios.post("/users/", newUser)

      alert("thành công");
      // navigate('/users')
    } catch (err) {

    }
  };

  console.log(info);
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
            <p>avatar</p>
            <br />
            <br />
            <img className="img_cccd"
              src={
                image
                  ? URL.createObjectURL(image)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
            <p>ID Card</p>
          </div>
          <div className="right">
            <form>

              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>
              <div className="formInput" >
                <label>Username</label>
                <input
                  id="username"
                  value={username}
                  name="username"
                  onChange={(e) => setUsername(e.target.value)}
                  type="text"
                  placeholder="Please enter name"

                />
              </div>
              <div className="formInput" >
                <label>IdentityId</label>
                <input
                  id="identityId"
                  value={identityId}
                  name="identityId"
                  onChange={(e) => setIdentityId(e.target.value)}
                  type="text"
                  placeholder="Please enter tenant identityId"

                />
              </div>

              <div className="formInput" >
                <label>Email</label>
                <input
                  id="email"
                  value={email}
                  name="identityId"
                  onChange={(e) => setEmail(e.target.value)}
                  type="text"
                  placeholder="Please enter tenant email"

                />
              </div>
              <div className="formInput" >
                <label>Birth</label>
                <input
                  id="birth"
                  value={birth}
                  name="birth"
                  onChange={(e) => setBirth(e.target.value)}
                  type="date"
                  placeholder="Please enter tenant birth"

                />
              </div>
              <div className="formInput" >
                <label>Address</label>
                <input
                  id="address"
                  value={address}
                  name="address"
                  onChange={(e) => setAddress(e.target.value)}
                  type="text"
                  placeholder="Please enter tenant birth"

                />
              </div>
              <div className="formInput" >
                <label>phone</label>
                <input
                  id="phone"
                  value={phone}
                  name="phone"
                  onChange={(e) => setPhone(e.target.value)}
                  type="text"
                  placeholder="Please enter tenant Phone"

                />
              </div>
              <div className="formInput">
                <label>Sex</label>
                <select id="sex" name="sex" value={sex} onChange={(e) => setSex(e.target.value)} >
                  <option value={true}>nam</option>
                  <option value={false} >nữ</option>
                </select>
              </div>
              <div className="formInput">
                <label>Identity Image</label>
                <input
                  type="file"
                  id="image"
                  onChange={(e) => setImage(e.target.files[0])}

                />
              </div>
              <button onClick={

                handleClick

              }>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
