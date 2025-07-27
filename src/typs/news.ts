export interface TopNewsType {
  id: number;
  title: string;
  text: string;
  summary: string;
  url: string;
  image: string;
  video: string | null;
  publish_date: string;
  authors: string[];
  language: string;
  source_country: string;
  sentiment: number;
}