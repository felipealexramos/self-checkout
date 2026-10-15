import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const RESTAURANT_SLUG = "demo-burger";
const placeholder = (text: string) =>
  `https://placehold.co/600x400?text=${encodeURIComponent(text)}`;

const menu = [
  {
    category: "Lanches",
    products: [
      {
        name: "X-Burger",
        description: "Hambúrguer artesanal com queijo e molho da casa.",
        priceInCents: 2490,
        ingredients: ["pão brioche", "hambúrguer 150g", "queijo cheddar", "molho da casa"],
      },
      {
        name: "X-Bacon",
        description: "Hambúrguer com bacon crocante e queijo.",
        priceInCents: 2990,
        ingredients: ["pão brioche", "hambúrguer 150g", "bacon", "queijo cheddar"],
      },
    ],
  },
  {
    category: "Acompanhamentos",
    products: [
      {
        name: "Batata Frita",
        description: "Porção individual de batatas fritas crocantes.",
        priceInCents: 1290,
        ingredients: ["batata", "sal"],
      },
    ],
  },
  {
    category: "Bebidas",
    products: [
      {
        name: "Refrigerante Lata",
        description: "Lata 350ml gelada.",
        priceInCents: 690,
        ingredients: [],
      },
      {
        name: "Suco Natural",
        description: "Suco de laranja 400ml.",
        priceInCents: 990,
        ingredients: ["laranja"],
      },
    ],
  },
];

async function main() {
  const restaurant = await prisma.restaurant.upsert({
    where: { slug: RESTAURANT_SLUG },
    update: {},
    create: {
      name: "Demo Burger",
      slug: RESTAURANT_SLUG,
      description: "Restaurante de demonstração para o self-checkout.",
      avatarImageUrl: placeholder("Avatar"),
      coverImageUrl: placeholder("Cover"),
    },
  });

  const existingCategories = await prisma.menuCategory.count({
    where: { restaurantId: restaurant.id },
  });
  if (existingCategories > 0) {
    console.log(`Seed ignorado: "${restaurant.slug}" já possui cardápio.`);
    return;
  }

  for (const { category, products } of menu) {
    await prisma.menuCategory.create({
      data: {
        name: category,
        restaurantId: restaurant.id,
        products: {
          create: products.map((product) => ({
            ...product,
            imageUrl: placeholder(product.name),
            restaurantId: restaurant.id,
          })),
        },
      },
    });
  }

  console.log(`Seed concluído: restaurante "${restaurant.slug}" com cardápio criado.`);
}

main()
  .catch((error) => {
    console.error("Falha no seed:", error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
