import axios from "axios";

export const API = axios.create({
  //change this after deployment to production
  baseURL: "http://localhost:8080/api",
});

