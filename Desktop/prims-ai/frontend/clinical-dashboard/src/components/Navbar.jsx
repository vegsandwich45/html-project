export default function Navbar() {
  return (
    <header className="border-b border-gray-800 bg-gray-950 px-6 py-4 flex justify-between items-center text-white shadow-md">
      {/* Brand Logo & Version Badge */}
      <div className="flex items-center space-x-3">
        <span className="text-xl font-extrabold tracking-wide bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
          Prims AI
        </span>
        <span className="text-xs font-semibold bg-indigo-950 text-indigo-300 px-2.5 py-0.5 rounded-full border border-indigo-700/50">
          v1.0
        </span>
      </div>

      {/* Navigation Links / Actions */}
      <nav className="hidden md:flex items-center space-x-6 text-sm font-medium text-gray-300">
        <a href="#dashboard" className="hover:text-indigo-400 transition">Dashboard</a>
        <a href="#features" className="hover:text-indigo-400 transition">Features</a>
        <a href="#settings" className="hover:text-indigo-400 transition">Settings</a>
      </nav>

      {/* System Status Indicator */}
      <div className="flex items-center space-x-3 text-sm text-gray-400">
        <div className="flex items-center gap-2 bg-gray-900 px-3 py-1.5 rounded-lg border border-gray-800">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-xs font-medium text-gray-300">Online</span>
        </div>
      </div>
    </header>
  )
}