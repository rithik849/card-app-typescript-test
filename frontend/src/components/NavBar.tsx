import {NavLink} from 'react-router-dom'
import { DarkModeContext } from '../utilities/darkModeContext'
import { useContext } from 'react'

export default function NavBar(){
   const [dark,setDark]= useContext(DarkModeContext)

    return(
      <div className='items-center'>
      <nav className="flex justify-center gap-5">
        <NavLink className={`m-3 p-4 text-xl ${dark ? "bg-blue-800 hover:bg-blue-900": "bg-blue-400 hover:bg-blue-500"} rounded-md font-medium text-white`} to={'/'}>All Entries</NavLink>
        <NavLink className={`m-3 p-4 text-xl ${dark ? "bg-blue-800 hover:bg-blue-900": "bg-blue-400 hover:bg-blue-500"} rounded-md font-medium text-white`} to={'/create'}>New Entry</NavLink>
      </nav>
      <button className={`m-3 p-4 text-xl ${dark ? "bg-blue-800 hover:bg-blue-900": "bg-blue-400 hover:bg-blue-500"} rounded-md font-medium text-white`} 
      onClick={()=> {setDark(
        (prev)=>{return !prev}
        )}}> {dark?"Light":"Dark"} </button>
      </div>
    )
}