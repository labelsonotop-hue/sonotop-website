import { Project, TeamMember } from './types';

export const PROJECTS: Project[] = [
  {
    id: 'phoenix',
    title: 'Phönix',
    year: '2025',
    genre: 'Drama / Psychological Horror',
    director: 'Dir. Sofie Hirschmüller',
    productionCompanies: ['SWR Südwestrundfunk', 'FABW | DE'],
    imageUrl: 'https://phoenix-media.b-cdn.net/Ph%C3%B6nix%20(2026)/4_poster/photo_2025-12-11%2013.30.15.jpeg', // Poster (Portrait)
    stillImageUrl: 'https://phoenix-media.b-cdn.net/Ph%C3%B6nix%20(2026)/3_stills/Still%204.jpg', // Updated Filmstill (Landscape)
    synopsis: "After the death of her heroin-addicted partner Felix, Moreen returns to his apartment, a suffocating space suspended between memory, guilt, and repression. Encounters with people from her former life expose toxic dependencies and emotional fractures. Phönix portrays grief as a condition without a linear way out and draws a claustrophobic portrait of a love — and of a woman caught between the urge to move on and the pull of self-destruction. Combining psychological horror with surrealist elements, Phönix explores grief, toxic attachment, and the gradual collapse of identity.",
    fullCredits: {
      "Director / Screenplay": "Sofie Hirschmüller",
      "Produced by": "SWR\nFABW | DE",
      "Original Score": "Filip Januchowski &\nJohann Bärenklau",
      "Cinematography": "Franziska Kabutke",
      "Production Design": "Teresa Berner",
      "Editor": "Patrick Kosteletzky\nJueli Kanuma\nLukas Schoenenberg",
      "Cast": "Nélida Martinez\nAnton Widauer\nPaul Trempnau"
    },
    scorePdfUrl: '/Phoenix Partitur Website Final.pdf'
  },
  {
    id: 'cowboys',
    title: 'Cowboy',
    year: '2023',
    genre: 'Short Film',
    director: 'Dir. Sofie Hirschmüller',
    productionCompanies: ['FABW | DE'],
    imageUrl: 'https://phoenix-media.b-cdn.net/Cowboy%20(2023)/4-poster/cowboy.jpg', // Updated Poster
    stillImageUrl: 'https://phoenix-media.b-cdn.net/Cowboy%20(2023)/3-stills/FC387E11-EC72-42D1-A494-BE7320E0D3F1_1_201_a.jpeg', // Updated Filmstill
    synopsis: "In a bar, two young men meet, both lost between stagnation and the prospect of change. Louis escapes into grandiose fantasies, alcohol, and fragile role models, while Moritz searches for order, political conviction, and the possibility of a new beginning. Their conversations oscillate between intimacy, mockery, and an unspoken mutual dependency.\nWith laconic humor, COWBOY tells a story of masculinity, disorientation, and the desire to move forward together without knowing where to go.",
    fullCredits: {
      "Director": "Sofie Hirschmüller",
      "Screenplay": "Sofie Hirschmüller\nLena Hohm",
      "Produced by": "FABW | DE",
      "Original Score": "Filip Januchowski &\nJohann Bärenklau",
      "Cinematography": "Laura Köhler",
      "Production Design": "Saskia Krebs",
      "Editor": "Jueli Kanuma",
      "Cast": "Paul Trempnau\nJoscha Schönhaus"
    }
  },
  {
    id: 'drachen',
    title: 'Drachen-Takelage',
    year: '2025',
    genre: 'Documentary / Essay Film',
    director: 'Dir. Alva Berlich',
    productionCompanies: ['Burg Giebichenstein', 'Kunsthochschule Halle'],
    imageUrl: 'https://phoenix-media.b-cdn.net/Drachen-Takelage%20(2026)/4-poster/dt_poster.jpg', // Updated Poster
    stillImageUrl: 'https://phoenix-media.b-cdn.net/Drachen-Takelage%20(2026)/3_stills/header.jpeg', // Updated Filmstill to header.jpeg
    synopsis: "For a brief era, kites served as instruments of meteorology, carrying measuring devices into the upper layers of the atmosphere. Mythological dragons, too, are closely linked to wind and weather, sharing a profound ambiguity — they are difficult to grasp and to tame (to decode). Following a docu-fictional dragon trail through air and water, the film explores storytelling within the sociocultural weather kitchen.",
    fullCredits: {
      "Director / Screenplay": "Alva Berlich",
      "Produced by": "Burg Giebichenstein-\nKunsthochschule Halle",
      "Original Score": "Johann Bärenklau\nDas Stockhausen-Syndrom",
      "Cinematography": "Alva Berlich",
      "Editor": "Alva Berlich"
    }
  },
  {
    id: 'hero',
    title: 'Hero',
    year: '2017',
    genre: 'Short Film',
    director: 'Dir. Harald Furuholmen',
    productionCompanies: ['DFFB'],
    imageUrl: 'https://phoenix-media.b-cdn.net/Hero%20(2017)/3-poster/hero_poster.jpg',
    stillImageUrl: 'https://phoenix-media.b-cdn.net/Fotos/B974A327-41F2-49C9-922F-230ABB456674_1_201_a.jpeg',
    synopsis: "A young boy estranged from his father and his new classmates steals his fathers gun to school. But when showing the others the gun a school shooting breaks out. With the gun in his hand he walks through the hallways of the school, hearing the massacre unfolding. But upon seeing two dead classmates he hides in a closet. Terrified, until finally his father finds him hours later.",
    fullCredits: {
      "Director / Screenplay": "Harald Furuholmen",
      "Produced by": "DFFB",
      "Original Score": "Filip Januchowski\nIlias Panagiotopoulos\nHarald Furuholmen",
      "Cinematography": "Ibrahim-Utku Erdogan",
      "Editor": "Harald Furuholmen",
      "Cast": "Filip Januchowski\nRaoul Rettberg"
    }
  }
];

export const TEAM: Record<string, TeamMember> = {
  filip: {
    id: 'filip',
    name: 'Filip Januchowski',
    role: 'Composer',
    bio: [
      "Filip Januchowski is a Berlin-based composer and performer. He began composing at an early age and, alongside his general education, studied composition with Yoaf Passowsky and piano with Elzbieta Sternlicht at the Julius Stern Institute of the Berlin University of the Arts (UdK). After completing his studies at the conservatory, he continued his education at the UdK Berlin, studying composition with Elena Mendoza and Manolis Vlitakis. In 2018, he was awarded the Aribert Reimann Scholarship for Young Composers for the composition of a song cycle for voice and ensemble.",
      "Alongside his formal training in composition, Januchowski worked as an actor, appearing in numerous television and cinema productions in both leading and supporting roles. This parallel engagement with film shaped his artistic perspective and led to an increasing focus on film scoring.",
      "In his compositional work, Januchowski focuses on orchestral sound and its expressive potential. His music explores the relationship between contemporary sonic language and traditional harmonic structures, as well as the integration of orchestral writing with electroacoustic textures and electronic elements."
    ],
    imageUrl: 'https://phoenix-media.b-cdn.net/Fotos/6R1A9634.jpg',
    email: 'filip@example.com',
    imdbUrl: 'https://www.imdb.com/de/name/nm6604492/',
    spotifyUrl: 'https://open.spotify.com/intl-de/artist/5mI7FvcN0aVIAetCqk0Ssz',
    youtubeMusicUrl: 'https://music.youtube.com/channel/UC_07Dm8iGlGViDTIYh1oqKQ',
  },
  johann: {
    id: 'johann',
    name: 'Johann Bärenklau',
    role: 'Artist & Musician',
    bio: [
      "Johann Bärenklau (born 1999) is an artist and musician. He studied media art with Clemens von Wedemeyer in the class of Expanded Cinema at the HGB Leipzig.\nIn his work, he combines installations with sound and graphic elements; many of his sound works are created in the context of albums and are based on research-related practice.\nHis projects and exhibitions have been shown in Berlin, Lucerne, Genoa, Paris, and Riga, among other places."
    ],
    imageUrl: 'https://phoenix-media.b-cdn.net/Fotos/5C299EA9-9CE0-4642-9875-8415C5579E73_1_201_a.jpeg',
    email: 'johann@example.com',
    imdbUrl: 'https://www.imdb.com/de/name/nm18002208/',
    spotifyUrl: 'https://open.spotify.com/intl-de/artist/6kfzYjHOaWclHYTua4Mgw6',
    youtubeMusicUrl: 'https://music.youtube.com/channel/UCsGKzhjack-eJ4nkn4rGpqw',
  }
};