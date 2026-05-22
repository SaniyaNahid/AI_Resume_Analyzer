import axios from "axios";

const API_URL = "http://127.0.0.1:8000/analyze";

export const analyzeResume = async (formData) => {
  const response = await axios.post(API_URL, formData);

  return response.data;
};