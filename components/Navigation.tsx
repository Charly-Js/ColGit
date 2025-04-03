import Link from "next/link"

export function Navigation() {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <ul className="flex space-x-4">
        <li>
          <Link href="/" className="hover:text-gray-300">
            Home
          </Link>
        </li>
        <li>
          <Link href="/projects" className="hover:text-gray-300">
            Projects
          </Link>
        </li>
        <li>
          <Link href="/calendar" className="hover:text-gray-300">
            Calendar
          </Link>
        </li>
        <li>
          <Link href="/documentation" className="hover:text-gray-300">
            Documentation
          </Link>
        </li>
      </ul>
    </nav>
  )
}

