"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import { CardWrapper } from "./card-wrapper";
import {useSearchParams} from 'next/navigation';
import { useState, useTransition} from "react";
import { LoginSchema } from "@/schemas";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FormErrors } from "../form-errors";
import { FormSuccess } from "../form-success";
import { login } from "@/actions/login";
import Link from "next/link";

export const LoginForm = () => {
    const searchParams = useSearchParams(); 
    const urlE = searchParams.get("error") === "OAuthAccountNotLinked" ? "Email already in use with different provider!" : "";
    const [showTwoFactor, setShowTwoFactor] = useState(false);
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState("");
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
        setError("");
        setSuccess("");
        startTransition(() => {
            login(values)
                .then((data) => {
                    if(data?.error){
                        methods.reset();
                        setError(data.error);
                    }

                    if(data?.success){
                        methods.reset();
                        setSuccess(data.success);
                    }

                    if(data?.twoFactor) {
                        setShowTwoFactor(true);
                    }
                });
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
                    {showTwoFactor && (
                        <FormField 
                        control={methods.control}
                        name="code"
                        render={({field})=>(
                            <FormItem>
                                <FormLabel>Two Factor Code</FormLabel>
                                <FormControl>
                                    <Input 
                                        {...field}
                                        disabled={isPending}
                                        placeholder="------"
                                        

                                        />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                    )}
                    {!showTwoFactor && (
                        <>
                    
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
                                        <Button
                                            size="sm"
                                            variant="link"
                                            asChild
                                            className="px-0 font-normal"
                                        >
                                            <Link href="/auth/reset">
                                                Forgot password?
                                            </Link>
                                        </Button>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </>
                    )}

                </div>
                <FormErrors errors={error || urlE}/>
                <FormSuccess successes={success} />
                <Button type="submit" className="w-full" disabled={isPending}>
                    {showTwoFactor ? "Verify" : "Login"}
                </Button>
            </form>

            </Form>
        </CardWrapper>
        
    );
};

