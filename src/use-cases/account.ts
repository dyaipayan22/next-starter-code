import { getAccountByGoogleId } from "@/data-access/account";

export async function getAccountByGoogleIdUseCase(googleId: string) {
  return await getAccountByGoogleId(googleId);
}
