import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { userId, productId } = await request.json();

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
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

    await prisma.purchase.create({
      data: {
        userId,
        productId,
      },
    });

    await prisma.product.update({
      where: { id: productId },
      data: { status: "SOLD" },
    });

    return new Response(
      JSON.stringify({
        status: 200,
        message: "Product purchased successfully",
      }),
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return new Response(
        JSON.stringify({
          status: 500,
          message: "Failed to purchase product",
          error: error.message,
        }),
        { status: 500 }
      );
    } else {
      console.log(error);
    }
  }
}
