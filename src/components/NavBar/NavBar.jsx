import {NavLink } from 'react-router-dom'

const NavBar = (props) => {
  return (
    <>
      <header className="App-header">
        <a href="/" className='tag'>SeasonShare</a> 
        <nav>
          <NavLink end to='/users/add' >Add Users</NavLink>
          <NavLink end to='/users'>Users</NavLink>
        </nav>
      </header>
    </>
  )
}

export default NavBar
