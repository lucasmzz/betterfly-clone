import prisma from "../../utils/prisma";

export default defineEventHandler(async (event) => {
  try {
    const { name, email } = await readBody(event);
    const authHeader = event.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw createError({
        statusCode: 401,
        message: "Unauthorized",
      });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "default-secret"
    );
    const userId = decoded.userId;

    if (!name || !email) {
      throw createError({
        statusCode: 400,
        message: "Name and email are required",
      });
    }

    // Check if email is already taken by another user
    const existingUser = await prisma.user.findFirst({
      where: {
        email,
        NOT: {
          id: userId,
        },
      },
    });

    if (existingUser) {
      throw createError({
        statusCode: 400,
        message: "Email is already taken",
      });
    }

    // Update user
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { name, email },
    });

    return {
      message: "Profile updated successfully",
      user: {
        id: updatedUser.id,
        email: updatedUser.email,
        name: updatedUser.name,
      },
    };
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Internal server error",
    });
  }
});
