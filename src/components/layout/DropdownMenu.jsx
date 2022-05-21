function DropdownMenu({ children }) {
  return (
    <div className='dropdown'>
      <label tabIndex='0' className='btn btn-square btn-ghost lg:hidden'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          className='inline-block w-8 h-8 stroke-current'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M4 6h16M4 12h16M4 18h16'
          ></path>
        </svg>
      </label>
      <div
        tabIndex='0'
        className='menu dropdown-content p-2 shadow bg-neutral rounded-box w-52 mt-4'
      >
        {children}
      </div>
    </div>
  );
}
export default DropdownMenu;
