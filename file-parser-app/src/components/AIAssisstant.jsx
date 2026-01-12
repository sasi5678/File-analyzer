import { useState } from "react";
import axios from "axios";

const AIAssisstant = () => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [chat, setChat] = useState([]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMsg = { role: "user", text: message };
    setChat(prev => [...prev, userMsg]);
    setMessage("");
    setLoading(true);

    try {
           const token = localStorage.getItem("token");

          const res = await axios.post("http://localhost:8080/api/chat", {
  message: message
});

      const aiMsg = { role: "ai", text: res.data.reply };
      setChat(prev => [...prev, aiMsg]);

    } catch (err) {
      setChat(prev => [...prev, { role: "ai", text: "Error connecting to AI" }]);
    }

    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <h2>AI Assistant</h2>

      <div style={styles.chatBox}>
        {chat.map((msg, index) => (
          <div
            key={index}
            style={{
              ...styles.message,
              alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
              backgroundColor: msg.role === "user" ? "#DCF8C6" : "#ECECEC"
            }}
          >
            {msg.text}
          </div>
        ))}

        {loading && <div style={styles.typing}>AI is typing...</div>}
      </div>

      <div style={styles.inputBox}>
        <input
          type="text"
          value={message}
          placeholder="Ask something..."
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          style={styles.input}
        />
        <button onClick={sendMessage} style={styles.button}>
          Send
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: "400px",
    margin: "40px auto",
    fontFamily: "Arial"
  },
  chatBox: {
    height: "400px",
    border: "1px solid #ccc",
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    overflowY: "auto"
  },
  message: {
    padding: "8px 12px",
    borderRadius: "8px",
    margin: "4px 0",
    maxWidth: "70%"
  },
  typing: {
    fontStyle: "italic",
    fontSize: "12px"
  },
  inputBox: {
    display: "flex",
    marginTop: "10px"
  },
  input: {
    flex: 1,
    padding: "8px"
  },
  button: {
    padding: "8px 12px",
    marginLeft: "5px"
  }
};

export default AIAssisstant;
