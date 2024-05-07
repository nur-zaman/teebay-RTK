import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { userId, productId, startDate, endDate } = await request.json();

    // Find the user and product
    const user = await prisma.user.findUnique({ where: { id: userId } });
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!user || !product) {
      return new Response(
        JSON.stringify({
          status: 404,
          message: "User or product not found",
        }),
        { status: 404 }
      );
    }

    // Check if the product is available for rent
    if (product.status !== null) {
      return new Response(
        JSON.stringify({
          status: 400,
          message: "Product is not available for rent",
        }),
        { status: 400 }
      );
    }

    // Create a new rental record
    await prisma.rental.create({
      data: {
        userId,
        productId,
        startDate,
        endDate,
      },
    });

    // Update product status to RENTED
    await prisma.product.update({
      where: { id: productId },
      data: { status: "RENTED" },
    });

    return new Response(
      JSON.stringify({
        status: 200,
        message: "Product rented successfully",
      }),
      { status: 200 }
    );
  } catch (error: unknown) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return new Response(
        JSON.stringify({
          status: 500,
          message: "Failed to rent product",
          error: error.message,
        }),
        { status: 500 }
      );
    } else {
      console.error(error);
    }
  }
}
