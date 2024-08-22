import db from "@/database";

export async function getAccountByUserId(userId: string) {
  return await db.query.accounts.findFirst({
    where: (accounts, { eq }) => eq(accounts.userId, userId),
  });
}

export async function getAccountByGoogleId(accountId: string) {
  return await db.query.accounts.findFirst({
    where: (accounts, { and, eq }) =>
      and(
        eq(accounts.accountId, accountId),
        eq(accounts.accountType, "google")
      ),
  });
}
