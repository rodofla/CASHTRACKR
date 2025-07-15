import { db } from "../config/db";
import { exit } from "node:process";

const clearData = async () => {
  try {
    //await db.sync({ force: true });
    console.log("Database cleared successfully");
    exit(0);
  } catch (error) {
    // console.log('Error clearing data:', error);
    exit(1);
  }
};

if (process.argv.includes("--clear")) {
  clearData();
}
