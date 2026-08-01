import axios from "axios";

const API_URL = "https://ai-resume-analyzer-backend-3d0d.onrender.com/analyze";

export const analyzeResume = async (formData) => {
  const response = await axios.post(API_URL, formData);

  return response.data;
};