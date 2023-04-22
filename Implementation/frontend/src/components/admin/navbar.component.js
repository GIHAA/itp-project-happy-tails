function navbar() {
  return (
    <div>
      <nav className="flex flex-col w-full px-6 py-4 bg-[#2E4960] shadow sm:flex-row sm:text-left sm:justify-between sm:items-baseline">
        <div className="mb-2 sm:mb-0">
          <a
            href="/employee"
            className="text-xl no-underline duration-300 text-grey-darkest hover:text-blue-dark hover:font-bold"
          >
            Home
          </a>
        </div>
        <div className="text-lg font-light hover:text-blue-dark">
          <div class="flex flex-col sm:flex-row sm:text-left sm:justify-between">
            <button class="flex text-white bg-[#FF9F00] hover:bg-[#b3740f] focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
              Logout
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default navbar;
