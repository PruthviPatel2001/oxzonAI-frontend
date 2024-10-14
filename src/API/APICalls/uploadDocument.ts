import axiosClient from "../axiosClient";
import APIendpoints from "../apiEndpoints";
import exp from "constants";

interface DocumentData {
  name: string;
  report_id: string;
  additional_notes: string;
  file: File;
  pages: number | null;
}

const uploadDocument = async (documentData: DocumentData) => {
  try {
    const formData = new FormData();
    formData.append("name", documentData.name);
    formData.append("report_id", documentData.report_id);
    formData.append("additional_notes", documentData.additional_notes);
    formData.append("file", documentData.file);

    if (documentData.pages)
      formData.append("pages", documentData.pages.toString());

    const response = await axiosClient.post(
      APIendpoints.uploadDocument,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error uploading document:", error);
    throw error;
  }
};

export default uploadDocument;
