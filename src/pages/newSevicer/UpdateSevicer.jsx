import "./NewSevicer";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useState } from "react";
import { homesInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { sevicerInputs } from "../../formSource";
import { validprice } from "../../regex";
const UpdateHome = ({ title }) => {


    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const params = useParams();
    const id = params.sevicerId;
    const [sevicerName, setSevicerName] = useState("");

    const [keyword, setKeyword] = useState("");

    const [price, setPrice] = useState("");

    useEffect(() => {
        fetch(`/sevicers/${id}`, {
            method: 'GET',
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json'
            }
        })
            .then(response => { return response.json(); })
            .then(responseData => { console.log(responseData); return responseData; })
            .then(data => {
                setSevicerName(data.sevicerName)
                setKeyword(data.keyword)
                setPrice(data.price)
            })

            .catch(err => {
                console.log("fetch error" + err);
            });
    }, [])



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

            const updatehomes = {
                sevicerName, keyword, price
            };
            await axios.put(`/homes/${id}`, updatehomes);
            alert("thành công");
            navigate('/homes')
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
                                <label>Sevicer</label>
                                <input
                                    id="sevicername"
                                    name="sevicername"
                                    value={sevicerName}
                                    onChange={(e) => setSevicerName(e.target.value)}

                                    type="text"
                                    placeholder="sevicer name"
                                />
                            </div>
                            <div className="formInput" >
                                <label>Key</label>
                                <input
                                    id="keyword"
                                    name="keyword"
                                    value={keyword}
                                    onChange={(e) => setKeyword(e.target.value)}

                                    type="text"
                                    placeholder="keyword"
                                />
                            </div>
                            <div className="formInput" >
                                <label>Price</label>
                                <input
                                    id="price"
                                    name="price"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    type="number"
                                    placeholder="12.0000"
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

export default UpdateHome;
