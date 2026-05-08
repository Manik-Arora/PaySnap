export function Button({ label, onClick, color = "gray" }) {
  const bgColor =
    color === "green"
      ? "bg-green-500 hover:bg-green-600"
      : "bg-gray-800 hover:bg-gray-900";
  return (
    <button
      onClick={onClick}
      type="button"
      className={`w-full text-white ${bgColor} focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2`}
    >
      {label}
    </button>
  );
}
