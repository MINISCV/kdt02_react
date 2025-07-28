import reactLogo from '../assets/react.svg'
import viteLogo from '../assets/vite.svg'
import { Link } from 'react-router-dom'
import { useAtom } from 'jotai'
import { isLogIn } from '../atoms/IsLoginAtom'

export default function Nav() {
    const [logIn, setLogIn] = useAtom(isLogIn);

    const handleLogOut = () => {
        setLogIn(false);
        localStorage.removeItem('email');
    }
    
    return (
        <header className="w-full min-h-20 flex justify-between items-center bg-emerald-600 px-10">
            <div className="flex text-xl font-bold">
                <img src={reactLogo} alt="react" /> + <img src={viteLogo} alt="vite" />
            </div>
            <ul className='flex gap-5'>
                <Link to='/'>
                    <li className='text-white text-xl font-bold p-2 rounded-xl hover:bg-emerald-700'>
                        홈으로
                    </li>
                </Link>
                {logIn && <Link to='/subway'>
                    <li className='text-white text-xl font-bold p-2 rounded-xl hover:bg-emerald-700'>
                        지하철 대기정보
                    </li>
                </Link>}
                {logIn && <Link to='/rest'>
                    <li className='text-white text-xl font-bold p-2 rounded-xl hover:bg-emerald-700'>
                        Rest
                    </li>
                </Link>}
            </ul>
            <Link to='/login'>
                <div className='text-white text-xl font-bold border p-2 rounded-xl hover:bg-emerald-700'>
                    { logIn ? <span onClick={handleLogOut}>로그아웃</span> : "로그인" }
                </div>
            </Link>
        </header>
    )
}
