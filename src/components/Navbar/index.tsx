import { NavLink } from 'react-router-dom';
import { IoPersonCircle } from 'react-icons/io5';
import { BiSolidHomeAlt2 } from 'react-icons/bi';
import Logo from '../../assets/Logo.png';
import { meLocalStorage } from '../../services/localStorage';

const Navbar = () => {
  const token = meLocalStorage('token');
  const isAuth = !!token;

  return (
    <nav className="bg-tertiary p-4">
      <ul className="flex flex-wrap items-center justify-between">
        {/* Logo on the left */}
        <li className="flex-shrink-0">
          <NavLink to="/">
            <img src={Logo} alt="Logo" className="w-20 rounded-full" />
          </NavLink>
        </li>

        {/* Navigation items centered */}
        <div className="flex space-x-4">
          <li>
            <NavLink to="/" className="text-2xl text-secondary">
              <BiSolidHomeAlt2 />
            </NavLink>
          </li>
          {isAuth ? (
            <li>
              <NavLink to="/profile" className="text-2xl text-secondary">
                <IoPersonCircle />
              </NavLink>
            </li>
          ) : (
            // Add logout button here
            <>
              <li>
                <NavLink to="/login" className="text-secondary">
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink to="/register" className="text-secondary">
                  Register
                </NavLink>
              </li>
            </>
          )}
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;
