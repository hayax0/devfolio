"use server";

import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export async function checkSlugAvailability(slug: string) {
  const clerkUser = await currentUser();
  if (!clerkUser) throw new Error("Não autorizado");

  const email = clerkUser.emailAddresses[0].emailAddress;

  const isValidFormat = /^[a-z0-9-]+$/.test(slug);
  if (!isValidFormat) {
    return {
      available: false,
      message: "Use apenas letras minúsculas, números e hifens.",
    };
  }

  const existingProfile = await prisma.profile.findUnique({
    where: { slug },
    include: { user: true },
  });

  if (!existingProfile) {
    return { available: true };
  }

  if (existingProfile.user.email === email) {
    return { available: true };
  }

  return { available: false, message: "Esta URL já está em uso." };
}
