import React from "react";
import ChatInterface from "../components/ChatModule/ChatInterface";

const Home: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <ChatInterface />
    </div>
  );
};

export default Home;
