"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import { CardWrapper } from "./card-wrapper";
import { useState, useTransition} from "react";
import { SignUpSchema } from "@/schemas";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FormErrors } from "../form-errors";
import { FormSuccess } from "../form-success";
import { signup } from "@/actions/signup";

export const SignUpForm = () => {
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();
    const methods=  useForm<z.infer<typeof SignUpSchema>>({
        resolver: zodResolver(SignUpSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    })
    const onSubmit = (
        values: z.infer<typeof SignUpSchema>
    ) => {
        startTransition(()=> {

            signup(values)
            .then((data) => {
                setError(data.error);
                setSuccess(data.success);
            })
        });
    }
    return (
        
        <CardWrapper
            headerLabel="Create an account"
            backButtonLabel="Already have an account? Login"
            backButtonHref="/auth/login"
            showSocial
        >
           <Form {...methods}>
            <form onSubmit= {methods.handleSubmit(onSubmit)}
            className="space-y-6"
            >
                <div className="space-y-4">
                <FormField 
                        control={methods.control}
                        name="name"
                        render={({field})=>(
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input 
                                        {...field}
                                        disabled={isPending}
                                        placeholder="Your Name"
                                        
                                        
                                        />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField 
                        control={methods.control}
                        name="email"
                        render={({field})=>(
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input 
                                        {...field}
                                        disabled={isPending}
                                        placeholder="youremail@email.com"
                                        type="email"
                                        
                                        />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField 
                        control={methods.control}
                        name="password"
                        render={({field})=>(
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input 
                                        {...field}
                                        disabled={isPending}
                                        placeholder="somesecret"
                                        type="password"
                                        
                                        />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    

                </div>
                <FormErrors errors={error}/>
                <FormSuccess successes={success} />
                <Button type="submit" className="w-full" disabled={isPending}>
                    Sign Up
                </Button>
            </form>

            </Form>
        </CardWrapper>
        
    );
};

