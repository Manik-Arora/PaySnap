export function Appbar({ name = "" }) {
  return (
    <div className="flex justify-between items-center text-xl h-14 border-y border-slate-300">
      <div className="font-bold">PaySnap</div>
      <div className="flex space-x-2  items-center">
        <div>Hello, {name.split(" ")[0]}</div>
        <div className="bg-slate-100 rounded-full h-10 w-10 flex justify-center items-center">
          {name[0].toUpperCase()}
        </div>
      </div>
    </div>
  );
}
