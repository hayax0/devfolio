"use server";

import { prisma } from "@/lib/prisma";

export async function trackVisit(slug: string) {
  try {
    const profile = await prisma.profile.findUnique({
      where: { slug },
      select: { id: true },
    });

    if (!profile) return;

    await prisma.analytics.upsert({
      where: { profileId: profile.id },
      update: { views: { increment: 1 } },
      create: { profileId: profile.id, views: 1 },
    });
  } catch (error) {
    console.error("Erro no tracking:", error);
  }
}

export async function trackClick(profileId: string) {
  try {
    await prisma.analytics.update({
      where: { profileId },
      data: { clicks: { increment: 1 } },
    });
  } catch (error) {
    console.error("Erro no tracking de clicks:", error);
  }
}
