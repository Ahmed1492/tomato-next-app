import Food from '@/models/Food';
import connectDB from '@/lib/db';
import ClientFoodDisplay from './ClientFoodDisplay';

async function getFoods() {
  try {
    await connectDB();
    const foods = await Food.find({}).sort({ createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(foods));
  } catch (error) {
    console.error('Error fetching foods:', error);
    return [];
  }
}

export default async function ServerFoodDisplay({ category }) {
  const foods = await getFoods();
  
  return <ClientFoodDisplay foods={foods} category={category} />;
}

export { getFoods };