import mongoose from "mongoose";
import BankScrawler from "./Scrawler/BankScrawler.js";
import CarVersionScrawler from "./Scrawler/CarVersionScrawler.js";
import CarScrawler from "./Scrawler/CarScrawler.js";
import insert from "./Scrawler/ExpandData.js";
const uri = "mongodb+srv://thanhtkcb2004:ksiuOWOBVmMF6sP5@cluster0.uuuqs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

let isConnected = false;

export const handler = async (event) => {
    try {
        // Kết nối MongoDB chỉ khi chưa kết nối
        if (!isConnected) {
            await mongoose.connect(uri);
            isConnected = true;
            console.log("Successfully connected to MongoDB server");
        }

        // await CarVersionScrawler();
        // await BankScrawler();
        // await CarScrawler();
        await insert();
        console.log("Updated successfully");
    } catch (err) {
        console.error("Error during execution:", err.message);
    } finally {
        // Không cần đóng kết nối nếu Lambda vẫn còn tồn tại
        if (isConnected) {
            await mongoose.disconnect();
            isConnected = false;
        }
    }
};
handler();
