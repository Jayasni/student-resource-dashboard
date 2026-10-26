
type ResourceCategory = "React" | "TypeScript" | "JavaScript" | "Career";

type Resource = {
  id: number;
  title: string;
  category: ResourceCategory;
  description: string;
  fileName: string;
  fileType: string;
  size: number;
};

type ResourcePage = {
  items: Resource[];
  nextCursor: number | null;
};

const categories: ResourceCategory[] = [
  "React",
  "TypeScript",
  "JavaScript",
  "Career",
];

const resources: Resource[] = Array.from(
  { length: 100 },
  (_, index) => {
    const category = categories[index % categories.length];

    return {
      id: index + 1,
      title: `${category} Learning Resource ${index + 1}`,
      category,
      description: `Practical learning material about ${category}.`,
      fileName: `resource-${index + 1}.pdf`,
      fileType: "application/pdf",
      size: 1024 * (index + 1),
    };
  }
);

export async function fetchResources(
  query: string,
  cursor: number | null,
  limit = 12,
  signal?: AbortSignal
): Promise<ResourcePage> {
  await new Promise<void>((resolve, reject) => {
    if (signal?.aborted) {
      reject(new DOMException("Request aborted", "AbortError"));
      return;
    }

    const timer = window.setTimeout(resolve, 350);

    signal?.addEventListener(
      "abort",
      () => {
        window.clearTimeout(timer);
        reject(new DOMException("Request aborted", "AbortError"));
      },
      { once: true }
    );
  });

  const normalizedQuery = query.trim().toLowerCase();

  const filtered = resources.filter((resource) =>
    `${resource.title} ${resource.category} ${resource.description}`
      .toLowerCase()
      .includes(normalizedQuery)
  );

  const start = cursor ?? 0;
  const items = filtered.slice(start, start + limit);

  const nextCursor =
    start + items.length < filtered.length
      ? start + items.length
      : null;

  return { items, nextCursor };
}

export async function createResource(
  resource: Omit<Resource, "id">
): Promise<Resource> {
  const created: Resource = {
    ...resource,
    id: Date.now(),
  };

  resources.unshift(created);
  return created;
}
