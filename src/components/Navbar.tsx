import { NavLink } from "react-router-dom";

export const Navbar: React.FC = () => {
  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-blue-600">TaskFlow</h1>
        <div className="flex gap-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-blue-600 font-medium" : "text-gray-700 hover:text-blue-500"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/boards"
            className={({ isActive }) =>
              isActive ? "text-blue-600 font-medium" : "text-gray-700 hover:text-blue-500"
            }
          >
            Boards
          </NavLink>
          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive ? "text-blue-600 font-medium" : "text-gray-700 hover:text-blue-500"
            }
          >
            Login
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
