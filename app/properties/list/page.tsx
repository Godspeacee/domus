import { Metadata } from "next";
import PropertiesPage from "./PropertiesPage";

export const metadata: Metadata = {
  title: "Domus - Properties",
  openGraph: {
    type: "website",
    url: "https://example.com",
    title: "Domus Website",
    description: "A housing website for both house hunters and agents",
    siteName: "Domus Website",
  },
  description: "Browse, pay, explore",
};

export default function Page() {
  return <PropertiesPage />;
}
