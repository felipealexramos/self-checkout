import Image from "next/image";

import { getRestaurantBySlug } from "@/data/get-restaurant-by-slug";

import ConsumptionMethodOption from "./components/consumption-method-option";

interface RestaurantPageProps {
    params: Promise<{ slug: string }>;
}

const RestaurantPage = async ({ params }: RestaurantPageProps) => {
    const { slug } = await params;
    const restaurant = await getRestaurantBySlug(slug);
    return (
        <div className="h-screen flex flex-col items-center justify-center px-26 pt-24">
            <div className="flex flex-col items-center gap-2">
                <Image src={restaurant?.avatarImageUrl} alt={restaurant?.name} width={82} height={82} className="rounded-sm" />
                <h3 className="text-lg font-semibold">{restaurant?.name}</h3>
            </div>
            <div className="pt-24 text-center space-y-2">
                <h3 className="text-2xl font-semibold">Seja Bem-vindo!</h3>
                <p className="opacity-55">
                    Escolha como prefere aproveitar sua refeição. Estamos aqui
                    para oferecer praticidade e sabor em cada detalhe!
                </p>
            </div>
            <div className="pt-14 grid grid-cols-2 gap-4">
                <ConsumptionMethodOption
                    imageSrc="/dine_in.png"
                    imageAlt="Dine In"
                    buttonText="Para comer aqui"
                    option="dine_in"
                    slug={slug}
                />
                <ConsumptionMethodOption
                    imageSrc="/takeaway.png"
                    imageAlt="Take Out"
                    buttonText="Para levar"
                    option="take_away"
                    slug={slug}
                />
            </div>
        </div>
    )
}

export default RestaurantPage;