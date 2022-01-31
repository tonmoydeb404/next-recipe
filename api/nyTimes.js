import axios from "axios";

const API = process.env.API_KEY;
const nyTimes = axios.create({
  baseURL: "https://api.nytimes.com/svc/",
});

nyTimes.defaults.params = {
  "api-key": API,
};

export default nyTimes;
