import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { uploadDocument } from "../API/APICalls";
import { PDFDocument } from "pdf-lib";
import { fetchReportTypes } from "../API/APICalls";

interface UploadModalProps {
  open: boolean;
  handleClose: () => void;
  handleDocumentInfoChange: (
    id: string,
    name: string,
    pages: number | null
  ) => void;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  maxWidth: "900px",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "8px",
};

const UploadModal: React.FC<UploadModalProps> = ({
  open,
  handleClose,
  handleDocumentInfoChange,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [name, setName] = useState<string>("");
  const [reportId, setReportId] = useState<string>("");
  const [additionalNotes, setAdditionalNotes] = useState<string>("");
  const [pageCount, setPageCount] = useState<number | null>(null);
  const [reportTypes, setReportTypes] = useState<
    { report_id: string; report_type: string }[]
  >([]);

  useEffect(() => {
    const getReportTypes = async () => {
      if (open) {
        try {
          const types = await fetchReportTypes();
          setReportTypes(types);
        } catch (error) {
          console.error("Error fetching report types:", error);
        }
      }
    };

    getReportTypes();
  }, [open]);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);

    if (file && file.type === "application/pdf") {
      const fileReader = new FileReader();
      fileReader.onload = async (e) => {
        const pdfData = new Uint8Array(e.target?.result as ArrayBuffer);
        const pdfDoc = await PDFDocument.load(pdfData);

        setPageCount(pdfDoc.getPageCount());
      };
      fileReader.readAsArrayBuffer(file);
    } else {
      setPageCount(null);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file");
      return;
    }

    const documentData = {
      name,
      report_id: reportId,
      additional_notes: additionalNotes,
      file: selectedFile,
      pages: pageCount,
    };

    try {
      const response = await uploadDocument(documentData);

      handleDocumentInfoChange(response.document_id, name, pageCount);

      handleClose();
      resetForm();
    } catch (error) {
      console.error("Error uploading document:", error);
    }
  };

  const resetForm = () => {
    setSelectedFile(null);
    setName("");
    setReportId(""); // Reset report ID
    setAdditionalNotes("");
    setPageCount(null);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography variant="h6" component="h2" gutterBottom>
          Upload Document
        </Typography>

        {/* Form Fields */}
        <TextField
          fullWidth
          margin="normal"
          label="Name of the Report"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Type of Report"
          variant="outlined"
          select
          value={reportId}
          onChange={(e) => setReportId(e.target.value)}
        >
          {reportTypes.map((option) => (
            <MenuItem key={option.report_id} value={option.report_id}>
              {option.report_type}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          fullWidth
          margin="normal"
          label="Additional Notes"
          variant="outlined"
          multiline
          rows={3}
          value={additionalNotes}
          onChange={(e) => setAdditionalNotes(e.target.value)}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Pages of Document"
          variant="outlined"
          disabled
          value={pageCount !== null ? pageCount.toString() : "Auto-detected"}
        />

        {/* File Upload Input */}
        <Box mt={2} display="flex" alignItems="center">
          <Button
            variant="outlined"
            component="label"
            startIcon={<AttachFileIcon />}
            sx={{ mr: 2 }}
          >
            Upload File
            <input
              type="file"
              hidden
              onChange={handleFileChange}
              accept="application/pdf"
            />
          </Button>
          <Typography variant="body2">
            {selectedFile ? selectedFile.name : "No file selected"}
          </Typography>
        </Box>

        {/* Submit Button */}
        <Box sx={{ mt: 2, textAlign: "right" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpload} // Handle form submission
          >
            Upload
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default UploadModal;
