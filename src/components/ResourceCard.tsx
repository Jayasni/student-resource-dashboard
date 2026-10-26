
import type { Resource } from "../types/resource";

interface ResourceCardProps {
  resource: Resource;
  onOpen: (resource: Resource) => void;
}

function formatSize(size: number): string {
  if (size === 0) return "Size unavailable";
  return `${(size / 1024).toFixed(0)} KB`;
}

export default function ResourceCard({
  resource,
  onOpen,
}: ResourceCardProps) {
  return (
    <article className="resource-card">
      <div className="resource-card-top">
        <span className="file-icon" aria-hidden="true">
          PDF
        </span>

        <span className="category-badge">
          {resource.category}
        </span>
      </div>

      <h3>{resource.title}</h3>
      <p>{resource.description}</p>

      <div className="resource-meta">
        <span>{resource.fileName}</span>
        <span>{formatSize(resource.size)}</span>
      </div>

      <button
        type="button"
        className="resource-open"
        onClick={() => onOpen(resource)}
      >
        View resource →
      </button>
    </article>
  );
}
