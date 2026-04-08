import { PrismaClient, UserRole } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // 🔐 hash password
  const hashedPassword = await hash("admin123", 10);

  // 🍽️ create restaurant
  const restaurant = await prisma.restaurant.create({
    data: {
      name: "Demo Restaurant",
    },
  });

  // 👤 create ADMIN user
  const admin = await prisma.user.create({
    data: {
      name: "Admin",
      email: "admin@test.com",
      password: hashedPassword, // ✅ REQUIRED
      role: UserRole.ADMIN,
      restaurantId: restaurant.id,
    },
  });

  // 👤 create WAITER (STEWARD)
  const waiter = await prisma.user.create({
    data: {
      name: "Waiter",
      email: "waiter@test.com",
      password: hashedPassword,
      role: UserRole.STEWARD,
      restaurantId: restaurant.id,
    },
  });

  console.log("✅ Seed completed");
  console.log("Restaurant ID:", restaurant.id);
  console.log("Admin Login → admin@test.com / admin123");
  console.log("Waiter Login → waiter@test.com / admin123");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });