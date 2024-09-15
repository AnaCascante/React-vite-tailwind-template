import Logo from '../../assets/logo.png';
import { FaArrowUp } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="relative bg-tertiary p-6 text-secondary">
      <div className="flex flex-col items-center">
        <img
          src={Logo}
          alt="Logo"
          className="absolut top-[-2rem] w-20 rounded-full md:w-28"
        />
        <p className="mt-12 text-center text-sm text-secondary md:text-base">
          &copy; 2021 All rights reserved by <strong>Ana Cascante</strong>
        </p>
      </div>
      <div className="group relative">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="absolute bottom-4 right-4 rounded-full bg-secondary p-2 text-2xl text-tertiary hover:bg-yellow-500"
        >
          <FaArrowUp />
        </button>
        <span className="text-s absolute bottom-12 right-0 hidden rounded bg-transparent p-1 text-yellow-500 group-hover:block">
          Back to top
        </span>
      </div>
    </footer>
  );
}
