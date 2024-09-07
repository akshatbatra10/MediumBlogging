"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signInParams = exports.signUpParams = exports.blogDataPUT = exports.blogDataPOST = void 0;
const zod_1 = require("zod");
exports.blogDataPOST = zod_1.z.object({
    title: zod_1.z.string().min(4, "Title is required/too short"),
    content: zod_1.z.string().min(10, "Content is required/too short"),
});
exports.blogDataPUT = zod_1.z.object({
    id: zod_1.z.string().uuid("ID field is required"),
    title: zod_1.z.string().optional(),
    content: zod_1.z.string().optional(),
});
exports.signUpParams = zod_1.z.object({
    email: zod_1.z.string().email("Email is required"),
    password: zod_1.z.string().min(6, "Password is required"),
    name: zod_1.z.string().optional(),
});
exports.signInParams = zod_1.z.object({
    email: zod_1.z.string().email("Email is required"),
    password: zod_1.z.string().min(6, "Password is required"),
});
