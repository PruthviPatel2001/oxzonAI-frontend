import APIendpoints from "../apiEndpoints";
import axiosClient from "../axiosClient";

export const fetchReportTypes = async () => {
  try {
    const response = await axiosClient.get(APIendpoints.getreportTypes);
    return response.data;
  } catch (error: any) {
    throw (
      error.response?.data?.error ||
      "An error occurred while fetching report types."
    );
  }
};
