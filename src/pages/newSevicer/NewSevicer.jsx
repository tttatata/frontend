
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import { homesInputs, sevicerInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { validprice } from "../../regex";

const NewSevicer = ({ title }) => {

    const [info, setInfo] = useState({});

    const [sevicerName, setSevicerName] = useState("");

    const [keyword, setKeyword] = useState("");

    const [price, setPrice] = useState("");
    const navigate = useNavigate();


    const handleChange = (e) => {
        setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };




    const handleClick = async (e) => {
        e.preventDefault();
        if (sevicerName.length <= 0) {
            alert("Tên dịch vụ không được trống")
        }
        if (keyword.length <= 0) {
            alert("Mã  dịch vụ không được trống")
        } else {
            if (!keyword.length < 5) {
                alert("mã phải ít hơn 6 ký tự")
            }
        }
        if (price.length <= 0) {
            alert("Giá phòng không được trống")
        } else {
            if (!validprice.test(price)) {
                alert("Giá thuê phải có dấu phẩy cách ở 3 chữ số")
            }
        }
        try {


            const newsevicers = {
                ...info


            };

            await axios.post("/sevicers", newsevicers);
            alert("thành công");
            navigate('/sevicers')
        } catch (err) { console.log(err) }
    };
    return (
        <div className="new">
            <Sidebar />
            <div className="newContainer">
                <Navbar />
                <div className="top">
                    <h1>Add New Product</h1>
                </div>
                <div className="bottom">

                    <div className="right">
                        <form>
                            <div className="formInput" >
                                <label>tên dịch vụ</label>
                                <input
                                    id="Sevicername"
                                    value={sevicerName}
                                    name="Sevicername"
                                    onChange={(e) => setSevicerName(e.target.value)}
                                    type="text"
                                    placeholder="Nhập tên dịch vụ"

                                />
                            </div>

                            <div className="formInput" >
                                <label>Mã dịch vụ</label>
                                <input
                                    id="keyword"
                                    value={keyword}
                                    name="keyword"
                                    onChange={(e) => setKeyword(e.target.value)}
                                    type="text"
                                    placeholder="Nhập mã dịch vụ"

                                />
                            </div>
                            <div className="formInput" >
                                <label>Giá </label>
                                <input
                                    id="price"
                                    value={price}
                                    name="price"
                                    onChange={(e) => setPrice(e.target.value)}
                                    type="text"
                                    placeholder="Nhập giá dịch vụ"

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

export default NewSevicer;
