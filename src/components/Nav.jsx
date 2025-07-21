import reactLogo from '../assets/react.svg'
import viteLogo from '../assets/vite.svg'

export default function Nav() {
    return (
        <header className="w-full min-h-20 flex justify-between items-center bg-emerald-600 px-10">
            <div className="flex text-xl font-bold">
                <img src={reactLogo} alt="react" /> + <img src={viteLogo} alt="vite" />
            </div>
            <div className='text-white text-xl font-bold'>
                홈으로
            </div>
            <div className='text-white text-xl font-bold border p-2 rounded-xl'>
                로그인
            </div>
        </header>
    )
}
