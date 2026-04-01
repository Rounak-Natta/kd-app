import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const restaurant = await prisma.restaurant.create({
    data: {
      name: "Demo Restaurant",
    },
  });

  const user = await prisma.user.create({
    data: {
      name: "Admin",
      email: "admin@test.com",
      role: "ADMIN",
      restaurantId: restaurant.id,
    },
  });

  console.log("Restaurant ID:", restaurant.id);
  console.log("User ID:", user.id);
}

main();