import "../styles/pages/messages.css";

export default function Messages() {
  return (
    <div className="messages-page">
      <div className="chat">
        <p className="incoming">Hey, what's up?</p>
        <p className="outgoing">All good! You?</p>
      </div>
    </div>
  );
}