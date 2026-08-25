export type TourSeoEntry = {
  title: string;
  description: string;
  keywords: string[];
};

export const TOUR_SEO: Record<string, TourSeoEntry> = {
  b1a7f6e2: {
    title: "Private Alfama Tuk Tuk Tour with Local Guide",
    description: "Explore Alfama's lanes, Fado heritage and panoramic viewpoints on a private electric tuk tuk tour of Lisbon with a knowledgeable local guide.",
    keywords: ["Alfama tuk tuk tour", "private Alfama tour", "Lisbon old town tour", "Alfama local guide"],
  },
  b2c8f7e3: {
    title: "Chiado & Bairro Alto Private Tuk Tuk Tour",
    description: "Discover Chiado and Bairro Alto's literary cafés, bohemian streets and Lisbon viewpoints on a flexible private electric tuk tuk tour.",
    keywords: ["Chiado tour", "Bairro Alto tour", "Lisbon tuk tuk tour", "private Lisbon city tour"],
  },
  b3d9f8e4: {
    title: "Private Belém Tuk Tuk Tour in Lisbon",
    description: "Visit Belém Tower, Jerónimos Monastery and the Monument to the Discoveries on a private Lisbon tuk tuk tour with a local guide.",
    keywords: ["Belém tuk tuk tour", "Belém Tower tour", "Jerónimos Monastery tour", "private Lisbon tour"],
  },
  b4e0f9e5: {
    title: "Private Full-Day Lisbon Tuk Tuk Tour",
    description: "See Alfama, Belém, central Lisbon and the city's best viewpoints in one flexible full-day private tour with your own local guide.",
    keywords: ["full day Lisbon tour", "private Lisbon tour", "Lisbon highlights tour", "Lisbon tuk tuk day tour"],
  },
  b5f1g0e6: {
    title: "Lisbon Viewpoints Private Tuk Tuk Tour",
    description: "Ride Lisbon's hills to its finest miradouros on a private electric tuk tuk tour, with panoramic Tagus views and flexible photo stops.",
    keywords: ["Lisbon viewpoints tour", "Lisbon miradouros tour", "Lisbon photography tour", "tuk tuk Lisbon hills"],
  },
  b6g2h1e7: {
    title: "Lisbon Christmas Lights Tuk Tuk Tour",
    description: "Experience Lisbon's Christmas lights across Baixa, Chiado and Praça do Comércio on a festive private electric tuk tuk tour.",
    keywords: ["Lisbon Christmas lights tour", "Christmas tuk tuk Lisbon", "Lisbon Christmas tour", "Lisbon winter activities"],
  },
  b7h3i2e8: {
    title: "Private Sintra & Cascais Day Tour from Lisbon",
    description: "Explore Sintra's palaces, Cabo da Roca and the Cascais coast on a flexible private day tour departing from Lisbon with a local guide.",
    keywords: ["Sintra Cascais private tour", "Sintra day trip from Lisbon", "Cabo da Roca tour", "private Portugal day tour"],
  },
  b8i4j3e9: {
    title: "Fátima, Batalha, Nazaré & Óbidos Private Tour",
    description: "Visit Fátima, Batalha, Nazaré and medieval Óbidos in one private guided day tour from Lisbon, tailored to your preferred pace.",
    keywords: ["Fatima Nazare Obidos tour", "private Fatima tour from Lisbon", "Batalha tour", "Portugal day tour"],
  },
};

export function getTourSeo(id: string): TourSeoEntry | undefined {
  const key = Object.keys(TOUR_SEO).find((prefix) => id.startsWith(prefix));
  return key ? TOUR_SEO[key] : undefined;
}
