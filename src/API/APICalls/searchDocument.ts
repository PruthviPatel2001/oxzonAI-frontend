import APIendpoints from "../apiEndpoints";
import axiosClient from "../axiosClient";

// Method to search for a term in the document
export const searchDocument = async (
  searchTerm: string,
  documentId: string
) => {
  try {
    const response = await axiosClient.post(APIendpoints.searchTerm, {
      search_term: searchTerm,
      document_id: documentId,
    });
    return response.data;
  } catch (error: any) {
    throw (
      error.response?.data?.error ||
      "An error occurred while searching the document."
    );
  }
};

export const downloadHighlightedPDF = async (filename: string) => {
  try {
    const response = await axiosClient.get(APIendpoints.uploadDocument, {
      params: { filename },
      responseType: "blob",
    });
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (error: any) {
    throw (
      error.response?.data?.error ||
      "An error occurred while downloading the highlighted document."
    );
  }
};
