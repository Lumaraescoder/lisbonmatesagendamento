import { privateSeo } from "@/lib/seo";
export const metadata = privateSeo("Secure Checkout", "/checkout");
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
