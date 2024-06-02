export default function Message({ message }) {
  return (
    <div>
      <span>[{message.time}]&nbsp;</span>
      <span>&lt;{message.sender}&gt;&nbsp;</span>
      <span>{message.content}</span>
    </div>
  );
}
