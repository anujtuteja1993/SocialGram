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

const ACCEPTED_IMAGE_TYPES = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
];

const AspectRatioTypeSchema = z.enum(["4/5", "1/1", "1.91/1"]);

export const PostValidationBase = z.object({
    aspectRatio: AspectRatioTypeSchema,
    caption: z
        .string()
        .min(5, { message: "The caption needs to be atleast 5 characters" })
        .max(2200),
    hashtags: z.string().min(1, { message: "Atleast one tag is required" }),
    location: z
        .string()
        .min(2, { message: "Please enter a valid location" })
        .max(100),
});

export const PostValidation = z.discriminatedUnion("mode", [
    z
        .object({
            mode: z.literal("Create"),
            files: z
                .custom<File[]>()
                .refine(
                    (files) => files?.length > 0,
                    "Atleast 1 image is required"
                )
                .refine(
                    (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
                    ".jpg, .jpeg, .png and .webp files are accepted."
                ),
        })
        .merge(PostValidationBase),
    z
        .object({
            mode: z.literal("Edit"),
            files: z.custom<File[]>(),
        })
        .merge(PostValidationBase),
]);
