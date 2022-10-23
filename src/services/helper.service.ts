import mongoose from "mongoose";

const findDocuments = async (
  Model: mongoose.Model<any>,
  params: Object = {}
) => {
  try {
    const docs = await Model.find(params);
    return docs;
  } catch (error) {
    throw error;
  }
};

const createDocument = async (
  Model: mongoose.Model<any>,
  params: Object = {}
) => {
  try {
    return await Model.create(params);
  } catch (error) {
    throw error;
  }
};

const selectFields = async (
  query: mongoose.Query<any, any, {}, any>,
  fields: string[]
) => {
  query.select(fields.join(" "));
};

export { findDocuments, createDocument, selectFields };
