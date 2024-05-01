import * as z from "zod";

export const SignUpValidation = z.object({
    name: z.string().min(2, { message: "The name should be atleast 2 characters"}),
    username: z.string().min(2, { message: "The username should be atleast 2 characters"}),
    email: z.string().email({ message: "The Email address entered is not valid"}), 
    password: z.string().min(8, { message: "The password needs to be atleast 8 characters"})
});

