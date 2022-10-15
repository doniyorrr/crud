import { useEffect, useState } from "react";
import "./App.css";
import httpClient from "./axios/axios";
import Cookies from "universal-cookie";
import { getData } from "./components/utilits/getData";
import Home from "./components/Home";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { TextField } from "@mui/material";

function App() {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [age, setAge] = useState("");
  const [category, setCategory] = useState();
  const [brand, setBrand] = useState();
  const [measurement, setMeasurement] = useState();

  console.log(`data`, data);
  const [selectedCategory, setSelectedCategory] = useState({});
  const [selectedBrand, setSelectedBrand] = useState({});
  const [selectedMeasurement, setSelectedMeasurement] = useState({});
  const [auth, setAuth] = useState({
    phone: "+99897",
    password: "123",
  });

  let cookie = new Cookies();

  useEffect(() => {
    getData("/category", setCategory);
    getData("/brand", setBrand);
    getData("/measurement", setMeasurement);
  }, []);

  useEffect(() => {
    // addProduct();
    login(auth);
    httpClient
      .get("/product")
      .then((res) => {
        setData(res?.data?.data)
      })
      .catch((err) => {
        console.log(`err`, err);
      });
  }, []);

  const addProduct = () => {
    let data = {
      name: "Apple",
      description: "yaxshi",
      priceList: [{ type: "sale", price: 2000 }],
      categoryId: 1,
      brandId: 1,
      measurementId: 1,
      discount: 12,
      attachmentList: [],
    };
    httpClient
      .post("/product", data)
      .then((res) => {
        console.log(`add`, res);
      })
      .catch((err) => {
        console.log(`err`, err);
      });
  };
  const login = (data) => {
    httpClient
      .post("/auth/login", data)
      .then((res) => {
        // console.log(`res`, res);
        cookie.set("token", res.data.data);
      })
      .catch((err) => {
        console.log(`err`, err);
      });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <div className="App">
      <h1>Crud Application</h1>
      <div>
        <Button onClick={handleClickOpen}>Add Product</Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Mahsulot haqida ma'lumotlar"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <TextField
                  id="standard-basic"
                  label="Name"
                  variant="standard"
                />
                <TextField
                  id="standard-basic"
                  label="Price"
                  variant="standard"
                />
                <TextField
                  id="standard-basic"
                  label="Description"
                  variant="standard"
                />
                <InputLabel id="demo-simple-select-standard-label">Age</InputLabel>
                <Select
                  id="demo-simple-select-standard-label"
                  variant="standard"
                  value={selectedCategory.name}
                  label="Age"
                  onChange={handleChange}
                >
                  {category &&
                    category.map((item, index) => (
                      <MenuItem value={item}>{item.name}</MenuItem>
                    ))}
                </Select>
                <Select
                  id="demo-select-small"
                  value={selectedBrand.name}
                  label="brand"
                  onChange={handleChange}
                >
                  {brand &&
                    brand.map((item, index) => (
                      <MenuItem value={item}>{item.name}</MenuItem>
                    ))}
                </Select>
                <Select
                  id="demo-select-small"
                  value={selectedMeasurement.nameUz}
                  placeholder="measurement"
                  onChange={handleChange}
                >
                  {measurement &&
                    measurement.map((item, index) => (
                      <MenuItem value={item}>{item.nameUz}</MenuItem>
                    ))}
                </Select>
                <TextField
                  id="standard-basic"
                  label="Standard"
                  variant="standard"
                />
              </FormControl>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Disagree</Button>
            <Button onClick={handleClose} autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <Home data={data}/>
    </div>
  );
}

export default App;
