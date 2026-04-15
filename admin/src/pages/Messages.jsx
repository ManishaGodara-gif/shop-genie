import React, { useEffect, useState } from "react";
import axios from "axios";
const backendUrl = import.meta.env.VITE_BACKEND_URL;
import { toast } from "react-toastify";

const Messages = ({ token }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/contact/messages`, {
        headers: { token },
      });
      if (res.data.success) setMessages(res.data.messages);
      else toast.error(res.data.message);
    } catch {
      toast.error("Failed to load messages.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchMessages(); }, []);

  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold mb-4">Contact Messages</h2>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : messages.length === 0 ? (
        <p className="text-gray-500">No messages yet.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {messages.map((msg) => (
            <div key={msg._id} className="border rounded-lg p-4 bg-white shadow-sm">
              <div className="flex justify-between items-center mb-1">
                <p className="font-semibold text-gray-800">{msg.name}
                  <span className="text-gray-400 font-normal text-sm ml-2">&lt;{msg.email}&gt;</span>
                </p>
                <p className="text-xs text-gray-400">
                  {new Date(msg.createdAt).toLocaleString()}
                </p>
              </div>
              <p className="text-sm font-medium text-indigo-600 mb-1">{msg.subject}</p>
              <p className="text-sm text-gray-600">{msg.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Messages;