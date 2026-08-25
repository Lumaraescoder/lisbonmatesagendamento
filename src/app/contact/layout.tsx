import { createSeo } from "@/lib/seo";

export const metadata = createSeo({
  title: "Contact & Book a Lisbon Tuk Tuk Tour",
  description: "Contact Lisbon Mates to plan a private tuk tuk tour in Lisbon. Ask about routes, availability, group needs or hotel pickup.",
  path: "/contact",
  keywords: ["book Lisbon tuk tuk", "Lisbon tour contact", "private tuk tuk Lisbon"],
});

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
