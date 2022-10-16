import mongoose from "mongoose";

const findDocuments = async (
  Model: mongoose.Model<any>,
  params: Object = {}
) => {
  try {
    console.log(params);
    const docs = await Model.find(params);
    return docs;
  } catch (error) {
    throw error;
  }
};

export { findDocuments };
