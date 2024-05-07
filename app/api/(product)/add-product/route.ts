import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const {
      title,
      description,
      price,
      userId,
      rate,
      rent,
      status,
      categories,
    } = await request.json();

    // Fetch or create categories
    const categoryIds = await Promise.all(
      categories.map(async (category: { name: any }) => {
        const existingCategory = await prisma.category.findUnique({
          where: { name: category.name },
        });
        if (existingCategory) {
          return existingCategory.id;
        } else {
          const newCategory = await prisma.category.create({
            data: {
              name: category.name,
            },
          });
          return newCategory.id;
        }
      })
    );

    const product = await prisma.product.create({
      data: {
        title,
        description,
        price,
        userId,
        rate,
        rent,
        status,
        categories: {
          connect: categoryIds.map((id) => ({ id })),
        },
      },
      include: {
        categories: true,
      },
    });

    return new Response(
      JSON.stringify({ status: 200, messege: "Added product successfully" }),
      {
        status: 200,
      }
    );
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return new Response(
        JSON.stringify({
          status: 500,
          messege: "Failed to create the product",
          error: error.message,
        }),
        {
          status: 500,
        }
      );
    } else {
      console.error(error);
    }
  }
}
