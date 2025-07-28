import { useRef } from "react";
import TailButton from "../ui/TailButton";

export default function TodoForm({ addTodo }) {
    const iRef = useRef();
    const sRef = useRef();

    const handleOk = async (e) => {
        e.preventDefault();
        if (iRef.current.value == "") {
            iRef.current.focus();
            return;
        }
        addTodo(iRef.current.value, sRef.current.value);
        handleCancel();
    }

    const handleCancel = () => {
        iRef.current.value = "";
        iRef.current.focus();
        sRef.current.value = "X";
    }

    return (
        <div className="w-full bg-amber-50 flex flex-col justify-center items-center my-4">
            <h1 className="text-2xl font-bold my-4">Todo List</h1>
            <div className="flex justify-between mb-4">
                <select ref={sRef} className="w-20 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 mx-2">
                    <option value="X">X</option>
                    <option value="O">O</option>
                </select>
                <input ref={iRef} type="text" className="w-150 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 mx-2" />
                <TailButton caption="확인" color="blue" onClick={handleOk} />
                <TailButton caption="취소" color="red" onClick={handleCancel} />
            </div>
        </div>
    )
}
