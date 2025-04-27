function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8">
  <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
    <div className="mb-4 md:mb-0 text-center md:text-left">
      <h2 className="text-lg font-semibold">FrancisCejas</h2>
      <p className="text-sm">&copy; 2025 FrancisCejas. All rights reserved.</p>
    </div>

    <div className="flex space-x-6">
      <a href="https://github.com/fransheeshco" target="_blank" className="hover:text-white">
        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.263.82-.582v-2.04c-3.338.725-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.73.083-.73 1.205.084 1.84 1.24 1.84 1.24 1.07 1.835 2.807 1.305 3.495.997.108-.775.418-1.305.76-1.605-2.665-.305-5.467-1.332-5.467-5.933 0-1.31.47-2.382 1.235-3.222-.123-.303-.535-1.527.117-3.176 0 0 1.005-.322 3.3 1.23a11.5 11.5 0 013.003-.404c1.018.005 2.043.138 3.003.404 2.28-1.552 3.285-1.23 3.285-1.23.655 1.65.243 2.873.12 3.176.77.84 1.23 1.912 1.23 3.222 0 4.61-2.807 5.625-5.48 5.922.43.372.823 1.102.823 2.222v3.293c0 .322.216.7.825.58C20.565 21.796 24 17.296 24 12c0-6.63-5.37-12-12-12z"
          />
        </svg>
      </a>
      <a href="/about" className="text-sm hover:text-white">About</a>
      <a href="/contact" className="text-sm hover:text-white">Contact</a>
      <a href="/privacy" className="text-sm hover:text-white">Privacy</a>
    </div>
  </div>
</footer>

  )
}

export default Footer