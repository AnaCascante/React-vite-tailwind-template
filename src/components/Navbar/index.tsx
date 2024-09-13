import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-slate-400 p-4">
      <ul className="flex space-x-4">
        <li>
          <NavLink to="/" className="text-yellow-200">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/login" className="text-yellow-200">
            Login
          </NavLink>
        </li>
        <li>
          <NavLink to="/register" className="text-yellow-200">
            Register
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
