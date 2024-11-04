import {integer, sqliteTable, text} from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";


export const users = sqliteTable("users", {
    id: integer("id").primaryKey().notNull(),
    name: text("name").notNull(),
    email: text("email").notNull(),
    password: text("password").notNull(),
});

export const organizations = sqliteTable("organizations", {
    id: integer("id").primaryKey().notNull(),
    name: text("name").notNull(),
});
export const selectUserSchema = createSelectSchema(users,{

}).required({
    email: true,
password:true}).omit({
    id: true,
    name: true
});
export const insertUserSchema = createInsertSchema(users, {
    name: schema => schema.name.min(1).max(500),
    email: schema => schema.email.min(5).max(255).email(),
    password: schema => schema.password.min(8).max(100)
}).required().omit({
    id:true,
});
export const selectOrgSchema = createSelectSchema(organizations)
export const insertOrgSchema = createInsertSchema(organizations, {

    name: schema => schema.name.min(1).max(500),

}).required().omit({
    id: true,
})