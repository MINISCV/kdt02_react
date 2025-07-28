import { useEffect, useRef, useState } from "react";
import TailButton from "../ui/TailButton"
import axios from "axios";

// npx json-server --watch ../db/db.json --port 3005

const url = "http://localhost:3005/posts";
export default function Rest() {
    const [tData, setTdata] = useState([]);
    const titleRef = useRef();
    const authorRef = useRef();

    const getFetchData = async () => {
        const { data } = await axios.get(url);
        setTdata(data);
    }

    const handleClick = async (e) => {
        e.preventDefault();
        const postData = {
            "title": `${titleRef.current.value}`,
            "author": `${authorRef.current.value}`
        }
        await axios.post(url, postData);
        getFetchData();
    }

    const handleDelete = async (id) => {
        console.log(id)
        await axios.delete(`${url}/${id}`);
        getFetchData();
    }

    useEffect(() => {
        getFetchData();
    }, [])

    return (
        <div className="w-full h-full flex justify-start items-center flex-col">
            <form className="mb-10 ">
                <label htmlFor="title">제목</label>
                <input type="text" id="title" ref={titleRef} className="border border-orange-200" />
                <label htmlFor="author">이름</label>
                <input type="text" id="author" ref={authorRef} className="border border-orange-200" />
                <TailButton caption="전송" color="blue" onClick={handleClick} />
            </form>
            <ul>
                {tData.map(item =>
                    <li key={item.id}  className="text-2xl font-bold">
                        {item.title} ({item.author})
                        <TailButton caption="삭제" color="orange" onClick={() => {handleDelete(item.id)}} />
                    </li>
                )}
            </ul>
        </div>
    )
}
