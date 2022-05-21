import { NavLink } from 'react-router-dom';

function MenuButton({ to, icon, text }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive
          ? 'btn btn-primary normal-case text-lg flex gap-2'
          : 'btn btn-ghost normal-case text-lg flex gap-2'
      }
    >
      {icon}
      {text}
    </NavLink>
  );
}
export default MenuButton;
