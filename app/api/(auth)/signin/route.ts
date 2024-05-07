import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return new Response(
        JSON.stringify({ status: 404, message: "User not found" }),
        { status: 404 }
      );
    }
    const passwordMatch = password === user.password;

    if (!passwordMatch) {
      return new Response(
        JSON.stringify({ status: 401, message: "Invalid password" }),
        { status: 401 }
      );
    }

    // Return user ID
    return new Response(JSON.stringify({ status: 200, userId: user.id }), {
      status: 200,
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return new Response(
        JSON.stringify({
          status: 500,
          message: "Failed to retrieve user ID",
          error: error.message,
        }),
        { status: 500 }
      );
    } else {
      console.log(error);
    }
  }
}
