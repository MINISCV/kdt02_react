import { useRef } from "react"
import { isLogIn } from "../atoms/IsLoginAtom";
import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [_logIn, setLogIn] = useAtom(isLogIn);
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();

    if(emailRef.current.value !== "example@example.com" || passwordRef.current.value !== "1234") {
      alert("로그인 실패: 이메일 또는 비밀번호가 올바르지 않습니다.");
      return;
    }

    setLogIn(true);
    localStorage.setItem('email', emailRef.current.value);
    navigate('/');
  }
  return (
    <div className="w-full flex min-h-full flex-col justify-center">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="text-center text-2xl/9 font-bold tracking-tight text-gray-900">Sign in to your account</h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form method="POST" className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">Email address</label>
            <div className="mt-2">
              <input ref={emailRef} id="email" type="email" name="email" required autoComplete="email" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">Password</label>
            </div>
            <div className="mt-2">
              <input ref={passwordRef} id="password" type="password" name="password" required autoComplete="current-password" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
            </div>
          </div>

          <div>
            <button onClick={handleLogin} className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
          </div>
        </form>
      </div>
    </div>
  )
}
