import React, { useState } from "react";
import SearchBar from "./SearchBar";
import UploadDocument from "../UploadDocument";
import SearchResult from "./SearchResult";
import ChatMessages from "./ChatMessages";
import { askLLM, searchDocument } from "../../API/APICalls";
import ModeSwitch from "../common/ModeSwitch";
import SummaryDisplay from "../ChatModule/SummaryDisplay"; // Import the new component

const Chat: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messages, setMessages] = useState<
    Array<{ id: string; type: "user" | "bot"; text: string | JSX.Element }>
  >([]);
  const [documentInfo, setDocumentInfo] = useState<{
    id: string;
    name: string;
    pages: number | null;
  } | null>(null);
  const [mode, setMode] = useState<"base" | "pro">("base");

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleToggleMode = () => {
    setMode((prevMode) => (prevMode === "base" ? "pro" : "base"));
  };

  const handleSearch = async (searchTerm: string) => {
    if (!documentInfo) {
      alert("Document ID not set. Upload or select a document first.");
      return;
    }

    const userMessageId = Date.now().toString();
    setMessages((prevMessages) => [
      ...prevMessages,
      { id: userMessageId, type: "user", text: searchTerm },
    ]);

    const tempMessageId = Date.now().toString() + "-bot";
    setMessages((prevMessages) => [
      ...prevMessages,
      { id: tempMessageId, type: "bot", text: "Generating..." },
    ]);

    try {
      let botResponse: any = "";

      if (mode === "base") {
        const searchResult = await searchDocument(searchTerm, documentInfo.id);
        const { total_occurrences, occurrences_by_page, highlighted_file } =
          searchResult;

        const result = {
          total_occurrences,
          occurrences_by_page,
          highlighted_file,
        };

        botResponse = <SearchResult result={result} />;
      } else {
        if (
          (documentInfo?.pages !== null &&
            documentInfo?.pages >= 2 &&
            searchTerm.toLowerCase().includes("summary")) ||
          searchTerm.toLowerCase().includes("summarize")
        ) {
          const summaryData = await askLLM(searchTerm, documentInfo.id);

          // Check if summaryData and summaries are valid
          if (summaryData && summaryData.summaries) {
            const summaryMessage = (
              <SummaryDisplay
                abstractiveSummary={
                  summaryData.summaries.abstractive ||
                  "No abstractive summary available."
                }
                extractiveSummary={
                  summaryData.summaries.extractive ||
                  "No extractive summary available."
                }
              />
            );

            // Add the summary message to messages
            botResponse = summaryMessage;
          } else {
            botResponse = "No summary data returned from the API.";
          }
        } else {
          const llmResponse = await askLLM(searchTerm, documentInfo.id);
          botResponse = llmResponse.answer;
        }
      }

      // Update messages, replacing the tempMessageId with the actual response
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.id === tempMessageId ? { ...msg, text: botResponse } : msg
        )
      );
    } catch (error) {
      console.error("Error fetching search results:", error);
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.id === tempMessageId
            ? { ...msg, text: "Error generating a response." }
            : msg
        )
      );
    }
  };

  const handleDocumentInfoChange = (
    id: string,
    name: string,
    pages: number | null
  ) => {
    setDocumentInfo({ id, name, pages });

    const uploadMessage = `Document uploaded: ${name}`;
    const promptMessage =
      mode === "base"
        ? `You can search for any keyword in this document: ${name}.`
        : "";

    setMessages((prevMessages) => [
      ...prevMessages,
      {
        id: Date.now().toString(),
        type: "bot",
        text: uploadMessage,
      },
      {
        id: Date.now().toString() + "-prompt",
        type: "bot",
        text: promptMessage,
      },
    ]);
  };

  return (
    <div className="flex flex-col w-screen h-screen bg-gray-100">
      <ModeSwitch mode={mode} onToggle={handleToggleMode} />

      <div className="flex-1 p-6 overflow-y-scroll">
        <ChatMessages messages={messages} />
      </div>

      <div className="p-4 shadow-md rounded-lg">
        <SearchBar onAttachClick={openModal} onSearch={handleSearch} />
      </div>

      <UploadDocument
        open={isModalOpen}
        handleClose={closeModal}
        handleDocumentInfoChange={handleDocumentInfoChange}
      />
    </div>
  );
};

export default Chat;
