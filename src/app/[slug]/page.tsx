import Image from "next/image";

import { getRestaurantBySlug } from "@/data/get-restaurant-by-slug";

interface RestaurantPageProps {
    params: Promise<{ slug: string }>;
}

const RestaurantPage = async ({ params }: RestaurantPageProps) => {
    const { slug } = await params;
    const restaurant = await getRestaurantBySlug(slug);
    return (
        <div className="h-screen flex flex-col items-center justify-center px-26 pt-24">
            <div className="flex flex-col items-center gap-2">
                <Image src={restaurant?.avatarImageUrl} alt={restaurant?.name} width={82} height={82} className="rounded-full" />
            </div>
            <h1 className="text-4xl font-bold mb-4">{restaurant?.name}</h1>
            <p className="text-lg text-gray-600">{restaurant?.description}</p>
        </div>
    )
}

export default RestaurantPage;