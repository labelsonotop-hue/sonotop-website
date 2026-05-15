export interface Project {
  id: string;
  title: string;
  year: string;
  genre: string;
  director?: string;
  imageUrl: string;
  stillImageUrl?: string; // New field for the landscape film still on project detail page
  synopsis?: string;
  fullCredits?: Record<string, string>;
  videoPlaceholder?: string; // Just a color or specific image for the video player background
  productionCompanies?: string[];
  scorePdfUrl?: string;
  scoreThumbnailUrl?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string[];
  imageUrl: string;
  email: string;
  imdbUrl?: string;
  spotifyUrl?: string;
  youtubeMusicUrl?: string;
  socials?: {
    platform: string;
    url: string;
  }[];
}