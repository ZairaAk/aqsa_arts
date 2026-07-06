export type MediaFeature = {
  id: string;
  title: string;
  outlet: string;
  year: string;
  type: "Interview" | "Article" | "Video";
  url?: string;
};

const mediaFeatures: MediaFeature[] = [
  {
    id: "media-1",
    title: "Preserving the Art of Aari Embroidery",
    outlet: "Local Heritage Journal",
    year: "2019",
    type: "Article",
  },
  {
    id: "media-2",
    title: "Voices of Kashmiri Craft",
    outlet: "Regional Arts Documentary",
    year: "2021",
    type: "Video",
  },
  {
    id: "media-3",
    title: "A Conversation on Tradition and Technique",
    outlet: "Craft & Culture Podcast",
    year: "2023",
    type: "Interview",
  },
];

export function getMediaFeatures() {
  return mediaFeatures;
}
