import { LandingPage } from "./components/desite/LandingPage";

type HomeProps = {
  searchParams: Promise<{
    error?: string;
  }>;
};

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;

  return <LandingPage showError={params.error === "1"} />;
}