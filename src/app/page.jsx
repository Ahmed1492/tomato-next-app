import { getFoods } from "@/components/ServerFoodDisplay";
import HomeClient from "./HomeClient";

export default async function Home() {
  // Fetch foods on the server for better performance
  const initialFoods = await getFoods();

  return <HomeClient initialFoods={initialFoods} />;
}

// Enable static generation with revalidation
export const revalidate = 60;