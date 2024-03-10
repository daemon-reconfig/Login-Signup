"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import { CardWrapper } from "./card-wrapper";
import { useState, useTransition} from "react";
import { LoginSchema } from "@/schemas";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FormErrors } from "../form-errors";
import { FormSuccess } from "../form-success";
import { login } from "@/actions/login";

export const LoginForm = () => {
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();
    const methods=  useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    })
    const onSubmit = (
        values: z.infer<typeof LoginSchema>
    ) => {
        startTransition(()=> {

            login(values)
            .then((data) => {
                setError(data.error);
                setSuccess(data.success);
            })
        });
    }
    return (
        
        <CardWrapper
            headerLabel="Welcome back"
            backButtonLabel="Don't have an account? Sign up"
            backButtonHref="/auth/signup"
            showSocial
        >
           <Form {...methods}>
            <form onSubmit= {methods.handleSubmit(onSubmit)}
            className="space-y-6"
            >
                <div className="space-y-4">
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
                    Login
                </Button>
            </form>

            </Form>
        </CardWrapper>
        
    );
};
