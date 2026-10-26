
import type { ReactNode } from "react";

interface ResourceListProps<T> {
  items: T[];
  getKey: (item: T) => string | number;
  renderItem: (item: T) => ReactNode;
}

export default function ResourceList<T>({
  items,
  getKey,
  renderItem,
}: ResourceListProps<T>) {
  if (items.length === 0) {
    return (
      <p className="empty-state">
        No resources found. Try another search.
      </p>
    );
  }

  return (
    <div className="resource-grid">
      {items.map((item) => (
        <div key={getKey(item)}>
          {renderItem(item)}
        </div>
      ))}
    </div>
  );
}
