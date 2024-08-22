import { pgEnum, pgTable, text } from "drizzle-orm/pg-core";
import { createId } from "@paralleldrive/cuid2";
import { users } from "./user";

export const accountTypeEnum = pgEnum("accountType", ["email", "google"]);

export const accounts = pgTable("account", {
  id: text("id")
    .$defaultFn(() => createId())
    .primaryKey(),
  userId: text("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .unique()
    .notNull(),
  accountType: accountTypeEnum("account_type").default("email").notNull(),
  accountId: text("account_id").unique(),
  password: text("password"),
});
