import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // flush old Data
  await prisma.water.deleteMany();
  await prisma.user.deleteMany();

  // Create 5 users
  const users = await Promise.all(
    Array.from({ length: 5 }).map((_, i) =>
      prisma.user.create({
        data: {},
      }),
    ),
  );

  // Generate water logs for past 14 days
  const intakeRange = { min: 1000, max: 2500 };

  for (const user of users) {
    for (let i = 0; i < 14; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateString = date.toISOString().split('T')[0];
      await prisma.water.create({
        data: {
          userId: user.id,
          date: dateString,
          intakeMl:
            Math.floor(
              Math.random() * (intakeRange.max - intakeRange.min + 1),
            ) + intakeRange.min,
        },
      });
    }
  }

  console.log('🌱 Seeding completed!');
}

main()
  .catch((error: any) => {
    throw new Error(`Seeding failed: ${error.message}`);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
