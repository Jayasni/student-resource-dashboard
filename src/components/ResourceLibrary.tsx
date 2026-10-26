
import { useCallback, useState } from "react";
import {
  BookOpen,
  FileText,
  Layers3,
  Search,
} from "lucide-react";

import { useDebounce } from "../hooks/useDebounce";
import { useInfiniteResources } from "../hooks/useInfiniteResources";
import SearchBox from "./SearchBox";
import ResourceCard from "./ResourceCard";
import ResourceList from "./ResourceList";
import Skeleton from "./Skeleton";
import type { Resource } from "../types/resource";
import "../styles/ResourceLibrary.css";

export default function ResourceLibrary() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 300);

  const {
    items,
    loading,
    error,
    hasMore,
    loadMore,
  } = useInfiniteResources(debouncedQuery);

  const handleOpen = useCallback((resource: Resource) => {
    window.alert(`Selected: ${resource.title}`);
  }, []);

  return (
    <section className="resource-library">
      <header className="resource-header">
        <div>
          <span className="resource-eyebrow">
            STUDYSPACE LIBRARY
          </span>
          <h1>Resource Library</h1>
          <p>
            Discover study materials, explore programming topics,
            and find resources to support your learning journey.
          </p>
        </div>

        <div className="resource-header-icon">
          <BookOpen size={29} />
        </div>
      </header>

      <div className="resource-summary-grid">
        <article className="resource-summary-card">
          <div className="resource-summary-icon purple">
            <BookOpen size={21} />
          </div>
          <div>
            <span>Loaded resources</span>
            <h2>{items.length}</h2>
          </div>
        </article>

        <article className="resource-summary-card">
          <div className="resource-summary-icon blue">
            <Layers3 size={21} />
          </div>
          <div>
            <span>Library status</span>
            <h2>
              {loading ? "Loading..." : error ? "Error" : "Available"}
            </h2>
          </div>
        </article>

        <article className="resource-summary-card">
          <div className="resource-summary-icon green">
            <FileText size={21} />
          </div>
          <div>
            <span>More resources</span>
            <h2>{hasMore ? "Explore more" : "All loaded"}</h2>
          </div>
        </article>
      </div>

      <div className="resource-search-section">
        <div className="resource-section-heading">
          <div>
            <h2>Explore Resources</h2>
            <p>Search your library by keyword.</p>
          </div>
          <Search size={22} />
        </div>

        <SearchBox value={query} onChange={setQuery} />
      </div>

      {items.length === 0 && loading && (
        <div className="resource-grid">
          {Array.from({ length: 6 }, (_, index) => (
            <Skeleton key={index} />
          ))}
        </div>
      )}

      {items.length > 0 && (
        <ResourceList
          items={items}
          getKey={(resource) => resource.id}
          renderItem={(resource) => (
            <ResourceCard
              resource={resource}
              onOpen={handleOpen}
            />
          )}
        />
      )}

      {error && (
        <div role="alert" className="resource-error">
          <p>{error}</p>
          <button
            type="button"
            onClick={() => void loadMore()}
          >
            Retry
          </button>
        </div>
      )}

      {loading && items.length > 0 && (
        <p className="resource-status" role="status">
          Loading more resources...
        </p>
      )}

      {!loading && !error && items.length === 0 && (
        <div className="resource-empty">
          <Search size={30} />
          <h3>No resources found</h3>
          <p>Try another keyword to find study materials.</p>
        </div>
      )}

      {!hasMore && items.length > 0 && !loading && (
        <p className="resource-end-message">
          You've reached the end of the resource library.
        </p>
      )}

      {hasMore && !loading && !error && items.length > 0 && (
        <button
          type="button"
          className="resource-load-more"
          onClick={() => void loadMore()}
        >
          Load more resources
        </button>
      )}
    </section>
  );
}
