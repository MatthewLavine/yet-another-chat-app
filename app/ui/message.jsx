export default function Message({ message }) {
  const date = new Date(message.time);
  const prettyDate = date.toLocaleTimeString();

  return (
    <div className="hyphens-auto text-wrap break-normal">
      <span className="hidden cursor-default text-stone-600 dark:text-stone-400 md:inline">
        [{prettyDate}]&nbsp;
      </span>
      <span className="cursor-pointer text-green-700 dark:text-green-400">
        &lt;{message.sender}&gt;&nbsp;
      </span>
      <span className="text-slate-950 dark:text-slate-50">
        {message.content}
      </span>
    </div>
  );
}
