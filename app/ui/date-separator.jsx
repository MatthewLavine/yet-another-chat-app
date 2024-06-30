export default function DateSeparator({ date }) {
  return (
    <>
      <div className="flex flex-row">
        <hr className="my-2 mr-2 h-px flex-grow border-0 bg-gray-300 dark:bg-gray-700" />
        <div className="cursor-default text-center text-xs text-stone-600 dark:text-stone-400">
          {date}
        </div>
        <hr className="my-2 ml-2 h-px flex-grow border-0 bg-gray-300 dark:bg-gray-700" />
      </div>
    </>
  );
}
