"use client";

export default function ChatLog({ socket, connected, messages }) {
  return (
    <div className="min-h-72 flex-grow rounded-lg bg-slate-600 p-5 text-slate-100">
      <h2 className="text-lg">#general</h2>
      {messages.map((message, index) => (
        <div key={index}>
          <span className="sender">[{message.time}]&nbsp;</span>
          <span className="sender">&lt;{message.sender}&gt;&nbsp;</span>
          <span className="content">{message.content}</span>
        </div>
      ))}
    </div>
  );
}
