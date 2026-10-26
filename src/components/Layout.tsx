
import { NavLink, Outlet } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  BarChart3,
  Settings,
  GraduationCap,
} from "lucide-react";
import "../styles/Layout.css";


const navigationItems = [
  {
    label: "Dashboard",
    path: "/",
    icon: LayoutDashboard,
    end: true,
  },
  {
    label: "Resources",
    path: "/resources",
    icon: BookOpen,
    end: false,
  },
  {
    label: "Reports",
    path: "/reports",
    icon: BarChart3,
    end: false,
  },
  {
    label: "Settings",
    path: "/settings",
    icon: Settings,
    end: false,
  },
];

export default function Layout() {
  return (
    <div className="app-layout">
      <aside className="sidebar">
        <div className="sidebar-brand">
          <div className="brand-icon">
            <GraduationCap size={25} />
          </div>

          <div>
            <h2 className="brand">StudySpace</h2>
            <span className="brand-subtitle">
              Student Workspace
            </span>
          </div>
        </div>

        <div className="sidebar-section">
          <p className="sidebar-heading">WORKSPACE</p>

          <nav className="sidebar-nav" aria-label="Main navigation">
            {navigationItems.map(
              ({ label, path, icon: Icon, end }) => (
                <NavLink
                  key={path}
                  to={path}
                  end={end}
                  className={({ isActive }) =>
                    `sidebar-link ${isActive ? "active" : ""}`
                  }
                >
                  <Icon size={19} aria-hidden="true" />
                  <span>{label}</span>
                </NavLink>
              )
            )}
          </nav>
        </div>

        <div className="sidebar-footer">
          <div className="footer-icon">
            <GraduationCap size={20} />
          </div>

          <div>
            <p>Student Resource Management</p>
            <span>Learn. Track. Grow.</span>
          </div>
        </div>
      </aside>

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}
