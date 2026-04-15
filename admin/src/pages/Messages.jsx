import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const Messages = ({ token }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    try {
      const res = await axios.get(
        `${backendUrl}/api/contact/messages`,
        { headers: { token } }
      );

      if (res.data.success && res.data.messages) {
        setMessages([...res.data.messages].reverse()); // safe reverse
      } else {
        setMessages([]);
        toast.error(res.data.message || "No messages found");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to load messages");
      setMessages([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div style={{ padding: "20px" }}>

      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h2 style={{ fontSize: "20px", color: "#1a2b4a" }}>
          Messages ({messages.length})
        </h2>

        <button
          onClick={fetchMessages}
          style={{
            background: "#f1f5f9",
            border: "1px solid #e2e8f0",
            padding: "6px 12px",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          🔄 Refresh
        </button>
      </div>

      {/* Loading */}
      {loading ? (
        <p style={{ color: "#64748b" }}>Loading...</p>
      ) : messages.length === 0 ? (
        <p style={{ textAlign: "center", color: "#94a3b8" }}>
          No messages yet.
        </p>
      ) : (

        <div>
          {messages.map((msg) => (
            <div
              key={msg._id}
              style={{
                background: "#fff",
                border: "1px solid #e2e8f0",
                borderRadius: "10px",
                padding: "16px",
                marginBottom: "12px",
                borderLeft: "4px solid #3b82f6",
              }}
            >

              {/* Top Row */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                }}
              >
                <p style={{ fontSize: "12px", color: "#94a3b8" }}>
                  #{msg._id?.toString().slice(-6).toUpperCase()} ·{" "}
                  {msg.createdAt
                    ? new Date(msg.createdAt).toLocaleDateString()
                    : ""}
                </p>

                <span
                  style={{
                    background: "#dcfce7",
                    color: "#16a34a",
                    padding: "2px 8px",
                    borderRadius: "20px",
                    fontSize: "11px",
                  }}
                >
                  New
                </span>
              </div>

              {/* Subject */}
              <p
                style={{
                  fontWeight: "600",
                  marginBottom: "6px",
                  color: "#334155",
                }}
              >
                {msg.subject || "No Subject"}
              </p>

              {/* From Section */}
              <div
                style={{
                  background: "#f9fafb",
                  padding: "8px",
                  borderRadius: "6px",
                  marginBottom: "8px",
                }}
              >
                <p style={{ fontSize: "12px", color: "#64748b" }}>From</p>
                <p style={{ fontSize: "14px" }}>
                  {msg.name || "Unknown"}
                </p>
                <p style={{ fontSize: "12px", color: "#64748b" }}>
                  {msg.email || "No Email"}
                </p>
              </div>

              {/* Message */}
              <p style={{ fontSize: "14px", color: "#475569" }}>
                {msg.message || "No Message"}
              </p>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Messages;