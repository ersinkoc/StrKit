import { Link, useLocation } from 'react-router-dom'

interface SidebarLink {
  to: string
  label: string
  color?: string
}

interface SidebarSection {
  title: string
  links: SidebarLink[]
}

interface SidebarProps {
  sections: SidebarSection[]
  tocLinks?: { id: string; label: string }[]
}

export default function Sidebar({ sections, tocLinks }: SidebarProps) {
  const location = useLocation()

  return (
    <aside className="hidden lg:block w-72 fixed left-0 top-16 bottom-0 overflow-y-auto border-r border-gray-800/50 bg-gray-900/30">
      <div className="p-6">
        <nav className="space-y-8">
          {sections.map((section) => (
            <div key={section.title}>
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-3">
                {section.title}
              </h3>
              <ul className="space-y-1">
                {section.links.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className={`sidebar-link ${
                        location.pathname === link.to ? 'active' : ''
                      }`}
                    >
                      {link.color && (
                        <span
                          className="w-2 h-2 rounded-full mr-3"
                          style={{ backgroundColor: link.color }}
                        />
                      )}
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {tocLinks && tocLinks.length > 0 && (
            <div>
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-3">
                On This Page
              </h3>
              <ul className="space-y-1 border-l-2 border-gray-800 ml-3">
                {tocLinks.map((link) => (
                  <li key={link.id}>
                    <a href={`#${link.id}`} className="toc-link">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </nav>
      </div>
    </aside>
  )
}
