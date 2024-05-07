import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(request: Request) {
  try {
    const {
      id,
      title,
      description,
      price,
      userId,
      rate,
      rent,
      status,
      categories,
    } = await request.json();

    // Update categories
    const categoryIds = await Promise.all(
      categories.map(
        async (category: { name: string; id: string; [key: string]: any }) => {
          const existingCategory = await prisma.category.findUnique({
            where: { name: category.name },
          });
          if (existingCategory) {
            return existingCategory.id;
          } else {
            const newCategory = await prisma.category.create({
              data: { name: category.name },
            });
            return newCategory.id;
          }
        }
      )
    );

    // Update product
    const updatedProduct = await prisma.product.update({
      where: { id: id },
      data: {
        title,
        description,
        price,
        userId,
        rate,
        rent,
        status,
        categories: {
          set: categoryIds.map((id) => ({ id })),
        },
      },
      include: {
        categories: true,
      },
    });

    return new Response(
      JSON.stringify({
        status: 200,
        message: "Product updated successfully",
        data: updatedProduct,
      }),
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return new Response(
        JSON.stringify({
          status: 500,
          message: "Failed to update the product",
          error: error.message,
        }),
        { status: 500 }
      );
    } else {
      console.error(error);
    }
  }
}
