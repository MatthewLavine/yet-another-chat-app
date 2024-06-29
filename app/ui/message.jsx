export default function Message({ message }) {
  return (
    <div class="hyphens-auto text-wrap break-normal">
      <span className="text-stone-600 dark:text-stone-400">
        [{message.time}]&nbsp;
      </span>
      <span className="text-green-700 dark:text-green-400">
        &lt;{message.sender}&gt;
      </span>
      <span className="text-slate-950 dark:text-slate-50">
        {message.content}
      </span>
    </div>
  );
}
