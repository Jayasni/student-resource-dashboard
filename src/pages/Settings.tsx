
import {
  Settings as SettingsIcon,
  Upload,
  BookOpen,
  ShieldCheck,
} from "lucide-react";

import UploadResource from "../components/UploadResource";
import "../styles/Settings.css";

export default function Settings() {
  return (
    <section className="settings-page">
      <header className="settings-header">
        <div>
          <span className="settings-eyebrow">
            STUDYSPACE WORKSPACE
          </span>
          <h1>Settings</h1>
          <p>
            Manage your learning resources and workspace preferences.
          </p>
        </div>

        <div className="settings-header-icon">
          <SettingsIcon size={28} />
        </div>
      </header>

      <div className="settings-overview">
        <article className="settings-info-card">
          <div className="settings-card-icon purple">
            <Upload size={21} />
          </div>
          <div>
            <h3>Resource Management</h3>
            <p>Upload and organize study materials.</p>
          </div>
        </article>

        <article className="settings-info-card">
          <div className="settings-card-icon blue">
            <BookOpen size={21} />
          </div>
          <div>
            <h3>Learning Resources</h3>
            <p>Keep your learning materials accessible.</p>
          </div>
        </article>

        <article className="settings-info-card">
          <div className="settings-card-icon green">
            <ShieldCheck size={21} />
          </div>
          <div>
            <h3>Workspace</h3>
            <p>Manage your study space efficiently.</p>
          </div>
        </article>
      </div>

      <div className="settings-section-heading">
        <div>
          <h2>Upload Resources</h2>
          <p>Add study materials to your resource library.</p>
        </div>
      </div>

      <div className="settings-upload-panel">
        <UploadResource />
      </div>
    </section>
  );
}
