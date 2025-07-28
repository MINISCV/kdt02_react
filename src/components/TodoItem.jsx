import TailButton from "../ui/TailButton";

export default function TodoItem({ item, toggleTodo, deleteTodo }) {
    return (
        <div key={item.id} className="w-full my-2 p-4 text-xl border border-gray-300 rounded-lg flex justify-between items-center">
            <div className="flex items-center">
                <input id={item.id} type="checkbox" defaultChecked={item.completed == "O"} className="w-4 h-4 accent-emerald-600" onChange={() => { toggleTodo(item.id, item.completed) }} />
                <label htmlFor={item.id} className={`ms-2 ${item.completed == "O" ? "line-through text-red-600" : ""}`}>{item.text}</label>
            </div>
            <TailButton caption="삭제" color="blue" onClick={() => { deleteTodo(item.id) }} />
        </div>
    )

}
