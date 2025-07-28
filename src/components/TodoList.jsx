import { useEffect, useState } from "react"
import TodoForm from "./TodoForm"
import TodoItem from "./TodoItem"
import axios from "axios";

const url = "http://localhost:3005/todos";
export default function TodoList() {
    const [tData, setTdata] = useState([]);

    const getFetchData = async () => {
        const { data } = await axios.get(url);
        setTdata(data);
    }

    const addTodo = async ( text, completed ) => {
        console.log(text, completed)
        const postData = {
            "text": `${text}`,
            "completed": `${completed}`
        }
        await axios.post(url, postData);
        getFetchData();
    }

    const toggleTodo = async ( id, completed ) => {
        await axios.patch(`${url}/${id}`, { completed: completed == "O" ? "X" : "O" });
        getFetchData();
    }

    const deleteTodo = async ( id ) => {
        await axios.delete(`${url}/${id}`);
        getFetchData();
    }

    useEffect(() => {
        getFetchData();
    }, [])

    return (
        <div className="w-full flex items-center flex-col">
            <TodoForm addTodo={addTodo} />
            {tData && tData.map(item => <TodoItem item={item} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />)}
        </div>
    )
}
