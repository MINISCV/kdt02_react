import { useAtom } from "jotai"
import { isLogIn } from "../atoms/IsLoginAtom"
import Login from "../components/Login"

export default function Home() {
  const [logIn] = useAtom(isLogIn);

  return (
    <div className="w-full flex-grow flex flex-col justify-center items-center">
      {logIn ? "로그아웃하세" : <Login />}
    </div>
  )
}
