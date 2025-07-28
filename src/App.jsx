import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Nav from './components/Nav'
import Home from './components/Home'
import Login from './components/Login'
import Subway from './components/Subway'
import Rest from './components/Rest'
import TodoList from './components/TodoList'

function App() {
  return (
    <BrowserRouter>
      <div className="w-full xl:w-8/10 h-screen flex flex-col">
        <Nav />
        <main className="w-full flex-grow overflow-y-auto flex flex-col justify-start items-center">
          <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/login' element={<Login />}/>
            <Route path='/subway' element={<Subway />}/>
            <Route path='/rest' element={<Rest />}/>
            <Route path='/todo' element={<TodoList />}/>
          </Routes>
        </main>
        <footer className="w-full min-h-15 flex justify-center items-center bg-black text-white">
          K-digital 2025 2기
        </footer>
      </div>
    </BrowserRouter>
  )
}

export default App