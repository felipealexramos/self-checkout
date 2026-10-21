import { notFound } from "next/navigation";

import { getRestaurantBySlug } from "@/data/get-restaurant-by-slug";

import RestaurantHeader from "./components/header";

interface RestaurantMenuPageProps {
    params: Promise<{ slug: string }>;
    searchParams: Promise<{ consumptionMethod: string | null }>;
}

const isConsumptionMethodValid = (consumptionMethod: string | null): boolean => {
    const validConsumptionMethods = ["dine_in", "take_away"];
    return consumptionMethod != null && validConsumptionMethods.includes(consumptionMethod.toLowerCase());
};

const RestaurantMenuPage = async ({ params, searchParams }: RestaurantMenuPageProps) => {
    const { slug } = await params;
    const { consumptionMethod } = await searchParams;
    const restaurant = await getRestaurantBySlug(slug);
    if (!isConsumptionMethodValid(consumptionMethod)) {
        return notFound();
    }
    return (
        <div>
            <RestaurantHeader restaurant={{ coverImageUrl: restaurant?.coverImageUrl, name: restaurant?.name }} />
        </div>
    );
}

export default RestaurantMenuPage;