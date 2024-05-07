import { $Enums, Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const status = searchParams.get("status");
    const exceptUserId = searchParams.get("exceptUserId");
    const exceptStatus = searchParams.get("exceptStatus");

    const whereClause: Prisma.ProductWhereInput = {};

    if (userId) {
      whereClause.userId = userId;
    }

    if (status) {
      whereClause.status =
        status as Prisma.EnumRentStatusNullableFilter<"Product">;
    }

    if (status === "null") {
      whereClause.status = { equals: null };
    }

    if (exceptUserId || exceptStatus) {
      whereClause.NOT = {
        OR: [
          ...(exceptUserId ? [{ userId: exceptUserId }] : []),
          ...(exceptStatus
            ? [{ status: exceptStatus as $Enums.RentStatus }]
            : []),
        ],
      };
    }
    const products = await prisma.product.findMany({
      where: whereClause,
      include: {
        categories: true,
      },
    });

    return new Response(JSON.stringify(products), { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.log(error);
      return new Response(
        JSON.stringify({
          status: 500,
          message: "Failed to fetch products",
          error: error.message,
        }),
        { status: 500 }
      );
    } else {
      // Handle other types of errors
      console.error("Unknown error:", error);
    }
  }
}
