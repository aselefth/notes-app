import { useSelector, useDispatch } from "react-redux";
import { setActive, removeNote, toggleReadOnly } from "../store/notesSlice";

export default function Navigation() {
  const notes = useSelector((state) => state.notes.notes);
  const dispatch = useDispatch();
  return (
    <nav className="flex flex-col fixed left-0 top-0 bottom-0 w-[10rem] items-center">
      {notes.map((note) => (
        <div
          className={`w-full flex gap-2 px-1 justify-between items-center hover:bg-gray-500 ${
            note.active ? "bg-gray-400" : ""
          } h-10`}
          key={note.id}
        >
          <p
            className={`cursor-pointer w-full text-center py-2 text-sm`}
            onClick={() => dispatch(setActive({ id: note.id }))}
          >
            {note.name.length > 8 ? note.name.slice(0, 9) + "..." : note.name}
          </p>
          <div
            className="bg-gray-600 w-8 h-8 flex items-center justify-center rounded-[25%] cursor-pointer hover:bg-gray-700 text-white"
            onClick={() => dispatch(removeNote({ id: note.id }))}
          >
            🗑
          </div>
          <div
            className={`${
              note.readOnly ? "bg-red-600" : "bg-gray-600"
            } w-8 h-8 flex items-center justify-center rounded-[25%] cursor-pointer hover:${
              note.readOnly ? "bg-red-700" : "bg-gray-700"
            } text-white`}
            onClick={() => dispatch(toggleReadOnly({ id: note.id }))}
          >
            🖊
          </div>
        </div>
      ))}
    </nav>
  );
}
