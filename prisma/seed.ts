import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  // Create sample company with only mandatory fields
  const hashedPassword = await hash("admin123", 10);
  const company = await prisma.company.create({
    data: {
      name: "Tech Solutions Inc",
      email: "admin@techsolutions.com",
      phone: "+1-555-0123",
      password: hashedPassword,
    },
  });

  // Create sample user with only mandatory fields
  const user = await prisma.user.create({
    data: {
      email: "user@techsolutions.com",
      companyId: company.id,
    },
  });

  // Create sample transaction with only mandatory fields
  await prisma.transaction.create({
    data: {
      userId: user.id,
      points: 1000,
    },
  });

  console.log("Seed data created successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
