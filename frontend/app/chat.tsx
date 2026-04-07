"use client";

import { useState } from "react";

export default function Chat() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState<string[]>([]);

  const sendMessage = async () => {
    const res = await fetch("http://localhost:5000/agent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: "user1",
        message,
      }),
    });

    const data = await res.json();

    setChat((prev) => [...prev, "You: " + message, "AI: " + data.response]);
    setMessage("");
  };

  return (
    <div className="flex justify-center flex-col py-32 px-16 gap-6">
      <h1 className="text-3xl">GEN ARC Agent</h1>

      <div className="flex flex-col items-start gap-2">
        {chat.map((msg, i) => (
          <div key={i}>{msg}</div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          className="input"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter message"
        />

        <button className="button" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
}
