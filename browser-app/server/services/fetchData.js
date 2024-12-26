import CarVersion from "../models/CarVersion.js";
import InterestRate from "../models/InterestRate.js";
import Car from "../models/Car.js";
/**
 * Lấy dữ liệu từ bảng CarVersion
 */
export const fetchCar = async () => {
  try {
    const car = await Car.find();
    console.log("Fetched car data from database:", Car);
    return car;
  } catch (error) {
    console.error("Error fetching car data:", error);
    throw new Error("Cannot fetch car data from database");
  }
};

/**
 * Lấy dữ liệu từ bảng CarVersion
 */
export const fetchCarData = async () => {
  try {
    const carVersions = await CarVersion.find();
    console.log("Fetched car data from database:", carVersions);
    return carVersions;
  } catch (error) {
    console.error("Error fetching car data:", error);
    throw new Error("Cannot fetch car data from database");
  }
};

/**
 * Lấy dữ liệu từ bảng InterestRate
 */
export const fetchRateData = async () => {
  try {
    const rates = await InterestRate.find();
    console.log("Fetched rate data from database:", rates);
    return rates;
  } catch (error) {
    console.error("Error fetching rate data:", error);
    throw new Error("Cannot fetch rate data from database");
  }
};
