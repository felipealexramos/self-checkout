"use client";

import { Prisma } from "@prisma/client";
import { ChefHatIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/helpers/currency/format-currency";

interface ProductDetailsProps {
    product: Prisma.ProductGetPayload<{
        include: {
            restaurant: {
                select: {
                    name: true;
                    avatarImageUrl: true;
                }
            }
        }
    }>;
}

const ProductDetails = ({ product }: ProductDetailsProps) => {
    const [quantity, setQuantity] = useState(0);
    const handleIncrement = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    };

    const handleDecrement = () => {
        setQuantity(prevQuantity => Math.max(prevQuantity - 1, 0));
    };
    return (
        <div className="flex flex-col relative z-50 mt-[-1.5rem] rounded-t-3xl p-5 flex-auto">
            <div className="flex-auto">
                {/* Restaurant Info */}
                <div className="flex items-center gap-1.5">
                    <Image
                        src={product.restaurant.avatarImageUrl || '/placeholder-image.jpg'}
                        alt={product.restaurant.name}
                        width={16}
                        height={16}
                        className="rounded-full"
                    />
                    <p className="text-xs text-muted-foreground">{product.restaurant.name}</p>
                </div>
                <h2 className="mt-1 text-xl font-semibold">{product.name}</h2>
                {/* Product Price and Quantity */}
                <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold">{formatCurrency(product.priceInCents)}</h3>
                    <div className="flex items-center gap-3 text-center">
                        <Button variant="outline" className="h-8 w-8 rounded-xl" onClick={handleDecrement}>
                            <ChevronLeftIcon size={16} />
                        </Button>
                        <span className="w-4">{quantity}</span>
                        <Button variant="destructive" className="h-8 w-8 rounded-xl" onClick={handleIncrement}>
                            <ChevronRightIcon size={16} />
                        </Button>
                    </div>
                </div>
                {/* Product Description */}
                <div className="mt-6 space-y-3">
                    <h4 className="font-semibold">About</h4>
                    <p className="text-sm text-muted-foreground">{product.description}</p>
                </div>
                {/* Product Ingredients */}
                <div className="mt-6 space-y-3">
                    <div className="flex items-center gap-1 5">
                        <ChefHatIcon size={18} />
                        <h4 className="font-semibold">Ingredients</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">{product.ingredients}</p>
                </div>
            </div>

            <div className="sticky bottom-0 -mx-5 -mb-5 mt-6 bg-background px-5 pb-5 pt-3">
                <Button className="w-full rounded-full">
                    Add to cart
                </Button>
            </div>
        </div>
    );
}

export default ProductDetails;