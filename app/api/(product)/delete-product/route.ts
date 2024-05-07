import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function DELETE(request: Request) {
  try {
    const { productId } = await request.json();

    await prisma.product.delete({ where: { id: productId } });

    return new Response(
      JSON.stringify({ status: 200, messege: "Product deleted successfully" }),
      {
        status: 200,
      }
    );
  } catch (error: any) {
    // console.error(error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return new Response(
        JSON.stringify({
          status: 500,
          messege: "Failed to delete the product",
          error: error.message,
        }),
        {
          status: 500,
        }
      );
    } else {
      console.log(error);
    }
  }
}
