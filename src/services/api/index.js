import axios from "axios";

export default axios.create({
  baseURL: "https://6224e7fa6c0e39662049ddfb.mockapi.io/api/v1/",
  headers: {
    "Content-type": "application/json",
  }
});