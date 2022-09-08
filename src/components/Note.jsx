import { useDispatch } from "react-redux";
import { changeNote, changeNoteFontSize, toggleBold, toggleItalic } from "../store/notesSlice";
import { useEffect, useRef } from "react";
import TextareaAutosize from "react-textarea-autosize";

export default function Note({ note }) {
  const ref = useRef();
  const dispatch = useDispatch();
  useEffect(() => {
    ref.current.focus();
  }, [note.readOnly]);

  return (
    <div className="flex flex-col gap-5">
      <div
      className="flex mt-4 gap-4 items-baseline"
      >
        <select
        className="w-12 ml-4 mt-2 outline-0"
        onClick={(e) => 
          dispatch(
            changeNoteFontSize({fontSize: e.target.value, id: note.id})
          )}
        defaultValue={note.fontSize}
        >
          {
            [14, 16, 18, 20, 22, 24, 26, 28, 30, 32].map(size =>
              <option 
                key={size}
              >
                {size}
              </option>)
          }
        </select>

        <div
        onClick={() => dispatch(toggleItalic({id: note.id}))}
        className={`${note.italic ? 'bg-gray-400' : 'bg-transparent'} flex justify-center w-6 italic h-8 rounded-[25%] pt-1 border cursor-pointer`}
        >
          A
        </div>
        <div
        onClick={() => dispatch(toggleBold({id: note.id}))}
        className={`${note.bold ? 'bg-gray-400' : 'bg-transparent'} flex justify-center w-6 font-bold h-8 rounded-[25%] pt-1 border cursor-pointer`}
        >
          B
        </div>
      </div>

      <input
        className="text-2xl bg-transparent font-bold outline-0 p-[1rem]"
        type="text"
        readOnly={note.readOnly}
        value={note.name}
        onChange={(e) =>
          dispatch(
            changeNote({
              name: e.target.value,
              text: note.text,
              id: note.id,
            })
          )
        }
      />

      <TextareaAutosize
        ref={ref}
        readOnly={note.readOnly}
        style={{ 
          resize: "none", 
          overflow: "none",
          fontSize: `${note.fontSize}px` 
        }}
        className={`bg-transparent min-h-full outline-0 px-[1rem] ${note.bold ? 'font-bold' : ''} ${note.italic ? 'italic' : ''}`}
        value={note.text}
        bold={'true'}
        onChange={(e) =>
          dispatch(
            changeNote({
              name: note.name,
              text: e.target.value,
              id: note.id,
            })
          )
        }
      />
    </div>
  );
}
