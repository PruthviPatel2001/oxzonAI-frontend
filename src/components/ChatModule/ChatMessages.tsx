import React from "react";

interface Message {
  id: string;
  type: "user" | "bot";
  text: string | React.ReactNode;
}

interface ChatMessagesProps {
  messages: Message[];
}

const ChatMessages: React.FC<ChatMessagesProps> = ({ messages }) => {
  return (
    <div className="flex-1 p-4 overflow-y-auto">
      {messages.length === 0 ? (
        <div className="text-center text-gray-400">
          No messages yet. Start a conversation!
        </div>
      ) : (
        messages.map((msg, index) => (
          <div
            key={index}
            className={`flex w-full my-2 ${
              msg.type === "bot" ? "justify-start" : "justify-end"
            }`}
          >
            <div
              className={`p-3 rounded-lg shadow-md ${
                msg.type === "bot"
                  ? "bg-gradient-to-r from-[#4d7eb5] to-[#2C5E94] text-white text-left font-medium" // Bot message styling
                  : "bg-gradient-to-r from-white to-gray-200 text-gray-800 text-right font-medium" // User message styling
              }`}
              style={{
                maxWidth: msg.type === "bot" ? "80%" : "75%",
                width: msg.type === "bot" ? "auto" : "auto",
              }}
            >
              {msg.text}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ChatMessages;
