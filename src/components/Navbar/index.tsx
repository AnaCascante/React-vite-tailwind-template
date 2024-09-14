import { NavLink } from 'react-router-dom';
import { IoPersonCircle } from 'react-icons/io5';
import { BiSolidHomeAlt2 } from 'react-icons/bi';
import Logo from '../../assets/logo.png';

const Navbar = () => {
  return (
    <nav className="bg-slate-400 p-4">
      <ul className="flex space-x-4">
        <li>
          <NavLink to="/" className="border-spacing-20">
            <img src={Logo} alt="Logo" className="w-20" />
          </NavLink>
        </li>
        <li>
          <NavLink to="/" className="text-black">
            <BiSolidHomeAlt2 />
          </NavLink>
        </li>
        <IoPersonCircle />
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
