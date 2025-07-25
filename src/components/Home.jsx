import { useAtom } from "jotai"
import { isLogIn } from "../atoms/IsLoginAtom"
import Login from "../components/Login"

export default function Home() {
  const [logIn] = useAtom(isLogIn);

  return (
    <div className="w-full flex-grow flex flex-col justify-center items-center">
      {logIn ? <div>{localStorage.getItem('email')}ㅎㅇ</div> : <Login />}
    </div>
  )
}
