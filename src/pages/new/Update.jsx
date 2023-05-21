import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useState } from "react";
import axios from "axios";
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { validEmail, validcccd, validsdt } from "../../regex";


const Update = ({ title }) => {



    const [file, setFile] = useState("");

    // const [image, setImage] = useState("");
    const [username, setUsername] = useState("");
    const [identityId, setIdentityId] = useState("");
    const [email, setEmail] = useState("");
    const [birth, setBirth] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [sex, setSex] = useState("");
    const [imgcccd, setImgcccd] = useState("");
    const [loading, setLoading] = useState(false); // load, xoay vong vong
    const navigate = useNavigate();
    const params = useParams();
    const id = params.userId;

    const handleImage = (e) => {
        const file = e.target.files[0];
        setFileToBase(file);
        console.log(file);
    }

    const setFileToBase = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setImgcccd(reader.result);
        }

    }
    const [info, setInfo] = useState({});


    useEffect(() => {
        fetch(`/users/${id}`, {
            method: 'GET',
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json'
            }
        })
            .then(response => { return response.json(); })
            .then(responseData => { console.log(responseData); return responseData; })
            .then(data => {
                setUsername(data.username);

                setFile(data.img);
                setIdentityId(data.identityId);
                setEmail(data.email);
                setBirth(data.birth);
                setAddress(data.address);
                setPhone(data.phone);
                setSex(data.sex);
                setImgcccd(data.imgcccd);

            })
            .catch(err => {
                console.log("fetch error" + err);
            });
    }, [])

    const handleChange = (e) => {
        setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();
        if (username.length <= 0 && identityId.length <= 0 && email.length <= 0 &&
            birth.length <= 0 && address.length <= 0 && phone.length) {
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


        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "upload");
        try {


            const res = await fetch(`/users/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: username,
                    identityId: identityId,
                    email: email,
                    birth: birth,
                    address: address,
                    phone: phone,
                    sex: sex,


                })
            });

            const data = await res.json();
            console.log(data);
            alert("cập nhật thành công");
            setLoading(false);
            navigate('/users')

            // setUPdata(data2);
        } catch (error) {
            alert("Error Occured!" + error.response.data.message
            );
            setLoading(false);
        }
    };

    console.log(file);


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
                            }
                            alt=""
                        />
                        <p>avatar</p>
                        <br />
                        <br />
                        <img className="img_cccd"
                            src={
                                imgcccd
                                    ? imgcccd
                                    : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                            }
                            alt=""
                        />
                        <p>Căn cước công dân</p>
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
                                <label>Chọn hình CCCD</label>
                                <input
                                    type="file"
                                    id="imgcccd"
                                    // value={imgcccd}
                                    onChange={handleImage}

                                />
                            </div>
                            <button onClick={handleClick}>Send</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Update;
