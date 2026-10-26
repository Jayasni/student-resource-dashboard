
export type ResourceCategory =
  | "React"
  | "TypeScript"
  | "JavaScript"
  | "Career";

export interface Resource {
  id: number;
  title: string;
  category: ResourceCategory;
  description: string;
  fileName: string;
  fileType: string;
  size: number;
}

export interface ResourcePage {
  items: Resource[];
  nextCursor: number | null;
}
