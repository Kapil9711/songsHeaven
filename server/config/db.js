import mongoose from "mongoose";
import colors from "colors/safe.js";

const connectDB = async (connectionStr) => {
  try {
    const { connection: connObj } = await mongoose.connect(connectionStr);
    console.log(
      colors.bgCyan(
        `connected to DB ${connObj.name} with ${connObj.host} on port ${connObj.port}`
      )
    );
  } catch (error) {
    console.log(colors.red({ error }));
    throw new Error();
  }
};
export default connectDB;
