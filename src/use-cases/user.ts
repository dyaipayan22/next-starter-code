import {
  createUserViaEmail,
  createUserViaGoogle,
  getUserByEmail,
} from "@/data-access/user";
import { getAccountByUserId } from "@/data-access/account";
import { GoogleUser } from "@/types/user";
import { SignInInput, SignUpInput } from "@/schemas/user";
import { NotFoundError } from "@/lib/error";

export async function createEmailUserUseCase(signUpData: SignUpInput) {
  const { name, email, password } = signUpData;
  const existingUser = await getUserByEmail(email);

  if (existingUser) throw new Error("Email already in use");

  const user = await createUserViaEmail(name, email, password);
  //TODO: Verify Email

  return { id: user.id };
}

export async function signInUserUseCase(signInData: SignInInput) {
  const { email, password } = signInData;
  const user = await getUserByEmail(email);

  if (!user) {
    throw new NotFoundError();
  }

  const userAccount = await getAccountByUserId(user.id);
  //TODO: Match Password

  return { id: user.id };
}

export async function createGoogleUserUseCase(googleUser: GoogleUser) {
  const { email, name, sub, picture } = googleUser;
  let user = await getUserByEmail(email);

  if (!user) {
    user = await createUserViaGoogle(name, email, sub, picture);
  }
  return { id: user.id };
}
