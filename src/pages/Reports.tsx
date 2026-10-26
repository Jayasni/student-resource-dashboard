
import {
  BarChart3,
  BookOpen,
  TrendingUp,
  Code2,
  FileText,
  BriefcaseBusiness,
} from "lucide-react";

import "../styles/Reports.css";

const resourceActivity = [
  { name: "React", percentage: 42, color: "#7656e8" },
  { name: "TypeScript", percentage: 28, color: "#4f83e5" },
  { name: "JavaScript", percentage: 20, color: "#e8a23d" },
  { name: "Career", percentage: 10, color: "#35a982" },
];

const totalCategories = resourceActivity.length;

export default function Reports() {
  return (
    <section className="reports-page">
      <header className="reports-header">
        <div>
          <span className="reports-eyebrow">
            STUDYSPACE ANALYTICS
          </span>
          <h1>Reports & Analytics</h1>
          <p>
            Explore resource activity and understand your learning
            material distribution.
          </p>
        </div>

        <div className="reports-header-icon">
          <BarChart3 size={28} />
        </div>
      </header>

      <div className="report-summary-grid">
        <article className="report-summary-card">
          <div className="report-summary-top">
            <span className="report-summary-icon purple">
              <BookOpen size={21} />
            </span>
            <span className="report-label">Sample activity</span>
          </div>
          <h2>100%</h2>
          <p>Resource activity distribution</p>
        </article>

        <article className="report-summary-card">
          <div className="report-summary-top">
            <span className="report-summary-icon blue">
              <BarChart3 size={21} />
            </span>
            <span className="report-label">Top category</span>
          </div>
          <h2>React</h2>
          <p>42% of sample activity</p>
        </article>

        <article className="report-summary-card">
          <div className="report-summary-top">
            <span className="report-summary-icon green">
              <TrendingUp size={21} />
            </span>
            <span className="report-label">Categories</span>
          </div>
          <h2>{totalCategories}</h2>
          <p>Categories in this sample report</p>
        </article>
      </div>

      <div className="report-content-grid">
        <article className="report-panel">
          <div className="report-panel-header">
            <div>
              <h2>Resource Activity</h2>
              <p>Sample activity percentage by category</p>
            </div>
            <BarChart3 size={22} className="report-panel-icon" />
          </div>

          <div className="activity-chart">
            {resourceActivity.map((item) => (
              <div className="activity-item" key={item.name}>
                <div className="activity-item-heading">
                  <span>{item.name}</span>
                  <strong>{item.percentage}%</strong>
                </div>

                <div
                  className="activity-track"
                  role="img"
                  aria-label={`${item.name}: ${item.percentage}% of sample activity`}
                >
                  <div
                    className="activity-fill"
                    style={{
                      width: `${item.percentage}%`,
                      backgroundColor: item.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <p className="report-note">
            These percentages are sample values, not measured user activity.
          </p>
        </article>

        <article className="report-panel category-panel">
          <div className="report-panel-header">
            <div>
              <h2>Category Breakdown</h2>
              <p>Included in this report</p>
            </div>
          </div>

          <div className="category-list">
            {resourceActivity.map((item) => {
              const Icon =
                item.name === "React"
                  ? Code2
                  : item.name === "TypeScript"
                    ? FileText
                    : item.name === "JavaScript"
                      ? Code2
                      : BriefcaseBusiness;

              return (
                <div className="category-row" key={item.name}>
                  <div
                    className="category-icon"
                    style={{ color: item.color }}
                  >
                    <Icon size={19} />
                  </div>

                  <div className="category-info">
                    <span>{item.name}</span>
                    <div className="category-mini-track">
                      <div
                        style={{
                          width: `${item.percentage}%`,
                          backgroundColor: item.color,
                        }}
                      />
                    </div>
                  </div>

                  <strong>{item.percentage}%</strong>
                </div>
              );
            })}
          </div>
        </article>
      </div>
    </section>
  );
}
