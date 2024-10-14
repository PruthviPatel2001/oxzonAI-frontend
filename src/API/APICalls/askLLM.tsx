import axiosClient from "../axiosClient";
import APIendpoints from "../apiEndpoints";

export const askLLM = async (query: string, documentId: string) => {
  try {
    const response = await axiosClient.post(APIendpoints.askLLM, {
      question: query,
      document_id: documentId,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching response from LLM:", error);
    throw error;
  }
};
