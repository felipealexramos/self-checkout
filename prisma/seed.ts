import {
  ConsumptionType,
  OrderStatus,
  Prisma,
  PrismaClient,
} from "@prisma/client";

const prisma = new PrismaClient();

const placeholder = (text: string) =>
  `https://placehold.co/600x400?text=${encodeURIComponent(text)}`;
const ufs = (id: string) => `https://u9a6wmr3as.ufs.sh/f/${id}`;

interface SeedProduct {
  name: string;
  description: string;
  priceInCents: number;
  ingredients: string[];
  imageUrl?: string;
}

interface SeedCategory {
  category: string;
  products: SeedProduct[];
}

interface SeedOrder {
  status: OrderStatus;
  consumptionType: ConsumptionType;
  customerName?: string;
  customerPhone?: string;
  items: { productName: string; quantity: number; notes?: string }[];
}

interface SeedRestaurant {
  slug: string;
  name: string;
  description: string;
  avatarImageUrl: string;
  coverImageUrl: string;
  menu: SeedCategory[];
  orders: SeedOrder[];
}

const menu: SeedCategory[] = [
  {
    category: "Combos",
    products: [
      {
        name: "Combo X-Burger",
        description: "X-Burger, batata frita média e refrigerante lata.",
        priceInCents: 3990,
        ingredients: ["X-Burger", "batata frita média", "refrigerante lata"],
      },
      {
        name: "Combo X-Bacon",
        description: "X-Bacon, batata frita média e refrigerante lata.",
        priceInCents: 4490,
        ingredients: ["X-Bacon", "batata frita média", "refrigerante lata"],
      },
      {
        name: "Combo Duplo",
        description: "Duplo Cheddar, batata frita grande e suco natural.",
        priceInCents: 5290,
        ingredients: ["Duplo Cheddar", "batata frita grande", "suco natural"],
      },
    ],
  },
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
      {
        name: "Duplo Cheddar",
        description: "Dois hambúrgueres, cheddar em dobro e cebola caramelizada.",
        priceInCents: 3590,
        ingredients: ["pão brioche", "2x hambúrguer 150g", "2x queijo cheddar", "cebola caramelizada"],
      },
      {
        name: "Chicken Crispy",
        description: "Frango empanado crocante com alface e maionese temperada.",
        priceInCents: 2690,
        ingredients: ["pão brioche", "frango empanado", "alface", "maionese temperada"],
      },
      {
        name: "Veggie Burger",
        description: "Hambúrguer de grão-de-bico com rúcula e tomate.",
        priceInCents: 2790,
        ingredients: ["pão integral", "hambúrguer de grão-de-bico", "rúcula", "tomate"],
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
      {
        name: "Batata com Cheddar e Bacon",
        description: "Batatas fritas cobertas com cheddar cremoso e bacon.",
        priceInCents: 1990,
        ingredients: ["batata", "cheddar cremoso", "bacon"],
      },
      {
        name: "Onion Rings",
        description: "Anéis de cebola empanados (8 unidades).",
        priceInCents: 1490,
        ingredients: ["cebola", "empanado"],
      },
      {
        name: "Nuggets",
        description: "Nuggets de frango (10 unidades) com molho barbecue.",
        priceInCents: 1690,
        ingredients: ["frango", "empanado", "molho barbecue"],
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
      {
        name: "Água Mineral",
        description: "Garrafa 500ml, com ou sem gás.",
        priceInCents: 450,
        ingredients: [],
      },
      {
        name: "Milkshake",
        description: "Milkshake de chocolate 400ml.",
        priceInCents: 1590,
        ingredients: ["sorvete de creme", "leite", "calda de chocolate"],
      },
    ],
  },
  {
    category: "Sobremesas",
    products: [
      {
        name: "Brownie",
        description: "Brownie de chocolate meio amargo.",
        priceInCents: 1090,
        ingredients: ["chocolate meio amargo", "nozes"],
      },
      {
        name: "Sundae",
        description: "Sorvete de creme com calda de morango.",
        priceInCents: 990,
        ingredients: ["sorvete de creme", "calda de morango"],
      },
    ],
  },
];

const orders: SeedOrder[] = [
  {
    status: OrderStatus.completed,
    consumptionType: ConsumptionType.dine_in,
    customerName: "Ana",
    items: [
      { productName: "Combo X-Burger", quantity: 1 },
      { productName: "Brownie", quantity: 1 },
    ],
  },
  {
    status: OrderStatus.ready,
    consumptionType: ConsumptionType.take_away,
    customerName: "Bruno",
    customerPhone: "11999990001",
    items: [
      { productName: "X-Bacon", quantity: 2, notes: "Sem cebola" },
      { productName: "Batata Frita", quantity: 1 },
      { productName: "Refrigerante Lata", quantity: 2 },
    ],
  },
  {
    status: OrderStatus.preparing,
    consumptionType: ConsumptionType.dine_in,
    items: [
      { productName: "Veggie Burger", quantity: 1 },
      { productName: "Suco Natural", quantity: 1 },
    ],
  },
  {
    status: OrderStatus.pending,
    consumptionType: ConsumptionType.dine_in,
    customerName: "Carla",
    items: [
      { productName: "Combo Duplo", quantity: 1 },
      { productName: "Milkshake", quantity: 1 },
    ],
  },
];

// Dia operacional em UTC (coluna @db.Date ignora o horário)
const today = () => {
  const now = new Date();
  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
};

async function resetRestaurantData(tx: Prisma.TransactionClient, restaurantId: string) {
  // Ordem respeita os onDelete Restrict/NoAction: pedidos → produtos → categorias
  await tx.order.deleteMany({ where: { restaurantId } });
  await tx.orderCounter.deleteMany({ where: { restaurantId } });
  await tx.product.deleteMany({ where: { restaurantId } });
  await tx.menuCategory.deleteMany({ where: { restaurantId } });
}

async function seedMenu(
  tx: Prisma.TransactionClient,
  restaurantId: string,
  menu: SeedCategory[],
) {
  for (const { category, products } of menu) {
    await tx.menuCategory.create({
      data: {
        name: category,
        restaurantId,
        products: {
          create: products.map((product) => ({
            ...product,
            imageUrl: product.imageUrl ?? placeholder(product.name),
            restaurantId,
          })),
        },
      },
    });
  }

  return tx.product.findMany({ where: { restaurantId } });
}

async function seedOrders(
  tx: Prisma.TransactionClient,
  restaurantId: string,
  products: { id: string; name: string; priceInCents: number }[],
  orders: SeedOrder[],
) {
  const productsByName = new Map(products.map((product) => [product.name, product]));
  const businessDay = today();

  for (const [index, order] of orders.entries()) {
    const items = order.items.map(({ productName, quantity, notes }) => {
      const product = productsByName.get(productName);
      if (!product) throw new Error(`Produto "${productName}" não existe no cardápio do seed.`);
      return {
        productId: product.id,
        productName: product.name,
        unitPriceInCents: product.priceInCents,
        quantity,
        notes,
      };
    });

    await tx.order.create({
      data: {
        number: index + 1,
        businessDay,
        restaurantId,
        status: order.status,
        consumptionType: order.consumptionType,
        customerName: order.customerName,
        customerPhone: order.customerPhone,
        totalPriceInCents: items.reduce(
          (total, item) => total + item.unitPriceInCents * item.quantity,
          0,
        ),
        orderItems: { create: items },
      },
    });
  }

  if (orders.length === 0) return;

  await tx.orderCounter.create({
    data: { restaurantId, businessDay, lastNumber: orders.length },
  });
}

const demoBurger: SeedRestaurant = {
  slug: "demo-burger",
  name: "Demo Burger",
  description: "Hamburgueria artesanal de demonstração para o self-checkout.",
  avatarImageUrl: placeholder("Demo Burger"),
  coverImageUrl: placeholder("Cover"),
  menu,
  orders,
};

async function seedRestaurant(
  tx: Prisma.TransactionClient,
  { slug, menu, orders, ...restaurantData }: SeedRestaurant,
) {
  const restaurant = await tx.restaurant.upsert({
    where: { slug },
    update: restaurantData,
    create: { ...restaurantData, slug },
  });

  await resetRestaurantData(tx, restaurant.id);
  const products = await seedMenu(tx, restaurant.id, menu);
  await seedOrders(tx, restaurant.id, products, orders);

  console.log(
    `Seed concluído: "${slug}" com ${menu.length} categorias, ${products.length} produtos e ${orders.length} pedidos.`,
  );
}

const bigMacIngredients = [
  "Pão com gergilim",
  "Hambúrguer de carne 100% bovina",
  "Alface americana",
  "Queijo fatiado sabor cheddar",
  "Molho especial",
  "Cebola",
  "Picles",
];

const broabaIngredients = [
  "Pão tipo brioche",
  "Hambúrguer de carne 100% bovina",
  "Méquinese",
  "Maionese especial com sabor de carne defumada",
  "Onion rings",
  "Fatias de bacon",
  "Queijo processado sabor cheddar",
  "Molho lácteo com queijo tipo cheddar",
];

const crispyIngredients = [
  "Pão tipo brioche",
  "Batata",
  "Molho Honey&Fire",
  "Bacon em fatias",
  "Alface",
  "Tomate",
  "Queijo sabor cheddar",
  "Carne 100% de peito de frango",
];

const cheddarMeltIngredients = [
  "Pão escuro com gergelim",
  "Hambúrguer de carne 100% bovina",
  "Molho lácteo com queijo tipo cheddar",
  "Cebola ao molho shoyu",
];

const bigMacDescription =
  "Quatro hambúrgueres (100% carne bovina), alface americana, queijo fatiado sabor cheddar, molho especial, cebola, picles e pão com gergilim, acompanhamento e bebida.";
const broabaDescription =
  "Dois hambúrgueres de carne 100% bovina, méquinese, a exclusiva maionese especial com sabor de carne defumada, onion rings, fatias de bacon, queijo processado sabor cheddar, o delicioso molho lácteo com queijo tipo cheddar tudo isso no pão tipo brioche trazendo uma explosão de sabores pros seus dias de glória! Acompanhamento e Bebida.";
const crispyDescription =
  "Composto por pão tipo brioche com batata, molho Honey&Fire, bacon em fatias, alface, tomate, queijo sabor cheddar e carne 100% de peito de frango, temperada e empanada, acompanhamento e bebida.";
const cheddarMeltDescription =
  "Dois hambúrgueres (100% carne bovina), molho lácteo com queijo tipo cheddar, cebola ao molho shoyu e pão escuro com gergelim, acompanhamento e bebida.";

const fswDonalds: SeedRestaurant = {
  slug: "fsw-donalds",
  name: "FSW Donalds",
  description: "O melhor fast food do mundo",
  avatarImageUrl: ufs("jppBrbk0cChQvcNP9rHlEJu1vCY5kLqzjf29HKaeN78Z6pRy"),
  coverImageUrl: ufs("jppBrbk0cChQac8bHYlkBUjlHSKiuseLm2hIFzVY0OtxEPnw"),
  orders: [],
  menu: [
    {
      category: "Combos",
      products: [
        {
          name: "McOferta Média Big Mac Duplo",
          description: bigMacDescription,
          priceInCents: 3990,
          imageUrl: ufs("jppBrbk0cChQaHB8tslkBUjlHSKiuseLm2hIFzVY0OtxEPnw"),
          ingredients: bigMacIngredients,
        },
        {
          name: "Novo Brabo Melt Onion Rings",
          description: broabaDescription,
          priceInCents: 4150,
          imageUrl: ufs("jppBrbk0cChQeGQofnEPyQaHEV2WL8rGUs41oMICtYfNkphl"),
          ingredients: broabaIngredients,
        },
        {
          name: "McCrispy Chicken Elite",
          description: crispyDescription,
          priceInCents: 3990,
          imageUrl: ufs("jppBrbk0cChQr12aTqPo3SsGjBJCaM7yhxnbDlXeL5N9dckv"),
          ingredients: crispyIngredients,
        },
        {
          name: "Duplo Cheddar McMelt",
          description: cheddarMeltDescription,
          priceInCents: 3620,
          imageUrl: ufs("jppBrbk0cChQWdq0w8niS9XCLQu7Nb4jvBYZze16goaOqsKR"),
          ingredients: cheddarMeltIngredients,
        },
      ],
    },
    {
      category: "Lanches",
      products: [
        {
          name: "Big Mac",
          description: bigMacDescription,
          priceInCents: 3990,
          imageUrl: ufs("jppBrbk0cChQKfI6fivqActTvBGLXfQe4a8CJ6d3HiR7USPK"),
          ingredients: bigMacIngredients,
        },
        {
          name: "Duplo Quarterão",
          description: broabaDescription,
          priceInCents: 4150,
          imageUrl: ufs("jppBrbk0cChQ99rtECuYaDgmA4VujBU0wKn2ThXJvF3LHfyc"),
          ingredients: broabaIngredients,
        },
        {
          name: "McMelt",
          description: crispyDescription,
          priceInCents: 3990,
          imageUrl: ufs("jppBrbk0cChQUY0VlDTmvPeJLoyOjzNsMqFdxUI423nBl6br"),
          ingredients: crispyIngredients,
        },
        {
          name: "McNífico Bacon",
          description: cheddarMeltDescription,
          priceInCents: 3620,
          imageUrl: ufs("jppBrbk0cChQBBmifbjzEVXRoycAtrP9vH45bZ6WDl3QF0a1"),
          ingredients: cheddarMeltIngredients,
        },
      ],
    },
    {
      category: "Fritas",
      products: [
        {
          name: "Fritas Grande",
          description: "Batatas fritas crocantes e sequinhas. Vem bastante!",
          priceInCents: 1090,
          imageUrl: ufs("jppBrbk0cChQNd3jSNrcJroaszwjUAlM6iSO5ZTx2HV70t31"),
          ingredients: [],
        },
        {
          name: "Fritas Média",
          description:
            "Batatas fritas crocantes e sequinhas. Vem uma média quantidade!",
          priceInCents: 990,
          imageUrl: ufs("jppBrbk0cChQ7Y6lv9tkc0L9oMIXZsFJtwnBh2KCz3y6uSW1"),
          ingredients: [],
        },
        {
          name: "Fritas Pequena",
          description:
            "Batatas fritas crocantes e sequinhas. Vem pouquinho (é bom pra sua dieta)!",
          priceInCents: 590,
          imageUrl: ufs("jppBrbk0cChQ5toOZxYa1oARJCUGh4EY3x8NjXHtvZ7lnVfw"),
          ingredients: [],
        },
      ],
    },
    {
      category: "Bebidas",
      products: [
        {
          name: "Coca-cola",
          description: "Coca-cola gelada para acompanhar seu lanche.",
          priceInCents: 590,
          imageUrl: ufs("jppBrbk0cChQJS1b33q29eEsh0CVmOywrqx1UPnJpRGcHN5v"),
          ingredients: [],
        },
        {
          name: "Fanta Laranja",
          description: "Fanta Laranja gelada para acompanhar seu lanche.",
          priceInCents: 590,
          imageUrl: ufs("jppBrbk0cChQW7Kxm9gniS9XCLQu7Nb4jvBYZze16goaOqsK"),
          ingredients: [],
        },
        {
          name: "Água Mineral",
          description: "A bebida favorita do Cristiano Ronaldo.",
          priceInCents: 290,
          imageUrl: ufs("jppBrbk0cChQ7i05S5tkc0L9oMIXZsFJtwnBh2KCz3y6uSW1"),
          ingredients: [],
        },
      ],
    },
    {
      category: "Sobremesas",
      products: [
        {
          name: "Casquinha de Baunilha",
          description: "Casquinha de sorvete sabor baunilha.",
          priceInCents: 390,
          imageUrl: ufs("jppBrbk0cChQtfuQrAKkI75oJfPT0crZxvX82ui9qV3hLFdY"),
          ingredients: [],
        },
        {
          name: "Casquinha de Chocolate",
          description: "Casquinha de sorvete sabor chocolate.",
          priceInCents: 390,
          imageUrl: ufs("jppBrbk0cChQBH21ijzEVXRoycAtrP9vH45bZ6WDl3QF0a1M"),
          ingredients: [],
        },
        {
          name: "Casquinha de Mista",
          description: "Casquinha de sorvete sabor baunilha e chocolate.",
          priceInCents: 290,
          imageUrl: ufs("jppBrbk0cChQ4rBrtULypXmR6JiWuhzS8ALjVkrF3yfatC7E"),
          ingredients: [],
        },
      ],
    },
  ],
};

async function main() {
  await prisma.$transaction(async (tx) => {
    for (const restaurant of [demoBurger, fswDonalds]) {
      await seedRestaurant(tx, restaurant);
    }
  });
}

main()
  .catch((error) => {
    console.error("Falha no seed:", error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
