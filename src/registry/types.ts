export interface PageEntry {
  readonly slug: string;
  readonly title: string;
  readonly subtitle: string;
  readonly date: string;
  readonly tags: readonly string[];
  readonly featured: boolean;
  readonly color: string;
  readonly framerUrl: string;
  readonly thumbnail?: string;
}
