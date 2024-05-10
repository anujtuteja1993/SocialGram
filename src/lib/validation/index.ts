import * as z from "zod";

export const SignUpValidation = z.object({
    name: z
        .string()
        .min(2, { message: "The name should be atleast 2 characters" }),
    username: z
        .string()
        .min(2, { message: "The username should be atleast 2 characters" }),
    email: z
        .string()
        .email({ message: "The Email Address entered is not valid" }),
    password: z
        .string()
        .min(8, { message: "The password needs to be atleast 8 characters" }),
});

export const SignInValidation = z.object({
    email: z
        .string()
        .email({ message: "The Email Address entered is not valid" }),
    password: z
        .string()
        .min(8, { message: "The password needs to be atleast 8 characters" }),
});

export const PostValidation = z.object({
    file: z.custom<File[]>(),
    caption: z
        .string()
        .min(5, { message: "The caption needs to be atleast 5 characters" })
        .max(2200),
    hashtags: z.string({ message: "Atleast one tag is required" }),
    location: z
        .string()
        .min(2, { message: "Please enter a valid location" })
        .max(100),
});
