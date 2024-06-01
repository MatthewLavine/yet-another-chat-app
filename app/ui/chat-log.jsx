'use client';

export default function ChatLog({ socket, messages }) {
    return (
        <div className="w-full min-h-72 bg-slate-600 p-5 rounded-lg">
            {messages.map((message, index) => (
                <div key={index} className="message text-slate-100">
                    <span className="sender">[{message.time}]&nbsp;</span>
                    <span className="sender">&lt;{message.sender}&gt;&nbsp;</span>
                    <span className="content">{message.content}</span>
                </div>
            ))}
        </div>
    );
};