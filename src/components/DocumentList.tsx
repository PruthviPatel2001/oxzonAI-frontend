import React from "react";

interface Document {
  id: string;
  name: string;
  type: string;
  pages: number;
  notes: string;
  location: string; // This would be the file path or URL to the uploaded PDF
}

interface DocumentListProps {
  documents: Document[];
}

const DocumentList: React.FC<DocumentListProps> = ({ documents }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Uploaded Documents</h2>
      <ul>
        {documents.map((doc) => (
          <li key={doc.id} className="mb-4 p-2 border rounded-lg">
            <div className="flex justify-between">
              <div>
                <p>
                  <strong>Name:</strong> {doc.name}
                </p>
                <p>
                  <strong>Type:</strong> {doc.type}
                </p>
                <p>
                  <strong>Pages:</strong> {doc.pages}
                </p>
                <p>
                  <strong>Notes:</strong> {doc.notes}
                </p>
              </div>
              <div>
                <a
                  href={doc.location}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  View/Download
                </a>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DocumentList;
