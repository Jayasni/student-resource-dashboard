
import { useMemo, useState, useTransition } from "react";
import { Link } from "react-router-dom";
import "../styles/Dashboard.css";
import "../styles/DashboardWelcome.css";
import "../styles/DashboardStats.css";
import "../styles/DashboardCategories.css";
import "../styles/DashboardTip.css";

type IconProps = { size?: number };

function BookOpen({ size = 24 }: IconProps) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 7v14" /><path d="M3 18V5a2 2 0 0 1 2-2h3a4 4 0 0 1 4 4 4 4 0 0 1 4-4h3a2 2 0 0 1 2 2v13h-5a4 4 0 0 0-4 3 4 4 0 0 0-4-3H3Z" /></svg>;
}

function Layers({ size = 24 }: IconProps) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m12 2 9 5-9 5-9-5 9-5Z" /><path d="m3 12 9 5 9-5" /><path d="m3 17 9 5 9-5" /></svg>;
}

function TrendingUp({ size = 24 }: IconProps) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m22 7-8.5 8.5-5-5L2 17" /><path d="M16 7h6v6" /></svg>;
}

function Clock3({ size = 24 }: IconProps) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10" /><path d="M12 6v6h6" /></svg>;
}

function Code2({ size = 24 }: IconProps) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m16 18 6-6-6-6" /><path d="m8 6-6 6 6 6" /><path d="m14 4-4 16" /></svg>;
}

function FileText({ size = 24 }: IconProps) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" /><path d="M14 2v6h6M8 13h8M8 17h8" /></svg>;
}

function ArrowRight({ size = 24 }: IconProps) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg>;
}

export default function Dashboard() {
  const [count, setCount] = useState(100);
  const [isPending, startTransition] = useTransition();

  const summary = useMemo(
    () => ({
      resources: count,
      courses: 4,
      completion: 78,
    }),
    [count]
  );

  function refreshSummary() {
    startTransition(() => {
      setCount((previous) => previous + 1);
    });
  }

  const categories = [
    {
      name: "React",
      description: "Learn components, hooks and UI development.",
      Icon: Code2,
    },
    {
      name: "TypeScript",
      description: "Explore types, interfaces and type safety.",
      Icon: FileText,
    },
    {
      name: "JavaScript",
      description: "Strengthen your JavaScript fundamentals.",
      Icon: Code2,
    },
    {
      name: "Career",
      description: "Prepare for interviews and career growth.",
      Icon: TrendingUp,
    },
  ];

  return (
    <main className="dashboard-page">
      <section className="dashboard-welcome">
        <div className="welcome-content">
          <span className="dashboard-eyebrow">
            STUDENT WORKSPACE
          </span>

          <h1>Welcome to StudySpace 👋</h1>

          <p>
            Your learning journey starts here. Discover resources,
            explore new topics, and track your progress.
          </p>

          <Link to="/resources" className="dashboard-primary-btn">
            Explore Resources <ArrowRight size={18} />
          </Link>
        </div>

        <div className="welcome-icon">
          <BookOpen size={76} />
        </div>
      </section>

      <section className="dashboard-section">
        <div className="dashboard-section-heading">
          <div>
            <h2>Your Overview</h2>
            <p>Track your learning at a glance.</p>
          </div>

          <button
            className="dashboard-refresh-btn"
            onClick={refreshSummary}
            disabled={isPending}
          >
            {isPending ? "Refreshing..." : "Refresh summary"}
          </button>
        </div>

        <div className="dashboard-stats-grid">
          <article className="dashboard-stat-card">
            <div className="dashboard-stat-icon purple">
              <BookOpen size={22} />
            </div>
            <p>Available Resources</p>
            <h3>{summary.resources}</h3>
            <span>Learning materials</span>
          </article>

          <article className="dashboard-stat-card">
            <div className="dashboard-stat-icon blue">
              <Layers size={22} />
            </div>
            <p>Learning Categories</p>
            <h3>{summary.courses}</h3>
            <span>Topics to explore</span>
          </article>

          <article className="dashboard-stat-card">
            <div className="dashboard-stat-icon green">
              <TrendingUp size={22} />
            </div>
            <p>Learning Progress</p>
            <h3>{summary.completion}%</h3>
            <div
              className="dashboard-progress-track"
              role="progressbar"
              aria-label="Learning progress"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={summary.completion}
            >
              <div
                className="dashboard-progress-fill"
                style={{ width: `${summary.completion}%` }}
              />
            </div>
          </article>

          <article className="dashboard-stat-card">
            <div className="dashboard-stat-icon orange">
              <Clock3 size={22} />
            </div>
            <p>Study Workspace</p>
            <h3>Ready</h3>
            <span>Continue learning today</span>
          </article>
        </div>

        {isPending && (
          <p className="dashboard-status" role="status">
            Updating summary...
          </p>
        )}
      </section>

      <section className="dashboard-section">
        <div className="dashboard-section-heading">
          <div>
            <h2>Explore Categories</h2>
            <p>Choose a topic to start learning.</p>
          </div>

          <Link to="/resources" className="dashboard-view-link">
            View all <ArrowRight size={16} />
          </Link>
        </div>

        <div className="dashboard-category-grid">
          {categories.map(({ name, description, Icon }) => (
            <Link
              key={name}
              to={`/resources?category=${encodeURIComponent(name)}`}
              className="dashboard-category-card"
            >
              <div className="dashboard-category-icon">
                <Icon size={24} />
              </div>

              <h3>{name}</h3>
              <p>{description}</p>

              <span>
                Explore <ArrowRight size={15} />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="dashboard-tip">
        <div className="dashboard-tip-icon">
          <TrendingUp size={24} />
        </div>

        <div>
          <h3>Keep learning, keep growing!</h3>
          <p>
            Spend a little time every day exploring new concepts
            and building your skills.
          </p>
        </div>

        <Link to="/resources" className="dashboard-view-link">
          Start learning <ArrowRight size={16} />
        </Link>
      </section>
    </main>
  );
}
