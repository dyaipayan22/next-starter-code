import db from "@/database";
import { accounts, users } from "@/database/schemas";

export async function createUserViaEmail(
  name: string,
  email: string,
  password: string
) {
  const user = await db.transaction(async (tx) => {
    const [user] = await tx.insert(users).values({ name, email }).returning();

    await tx
      .insert(accounts)
      .values({ userId: user.id, password, accountType: "email" });

    return user;
  });
  return user;
}

export async function createUserViaGoogle(
  name: string,
  email: string,
  sub: string,
  image: string
) {
  const user = await db.transaction(async (tx) => {
    const [user] = await tx
      .insert(users)
      .values({ name, email, image })
      .returning();

    await tx
      .insert(accounts)
      .values({ userId: user.id, accountId: sub, accountType: "google" });

    return user;
  });
  return user;
}

export async function getUserByEmail(email: string) {
  return await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.email, email),
  });
}

export async function getUserById(id: string) {
  return await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.id, id),
  });
}
