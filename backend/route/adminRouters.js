import express from "express";
import { login } from "../Controller/adminController";

const adminRouters=express.Router();
adminRouters.post('/login',login);
export default adminRouters;