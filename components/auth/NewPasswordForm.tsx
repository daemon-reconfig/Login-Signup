"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import { CardWrapper } from "./card-wrapper";
import {useSearchParams} from 'next/navigation';
import { useState, useTransition} from "react";
import { NewPasswordSchema } from "@/schemas";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FormErrors } from "../form-errors";
import { FormSuccess } from "../form-success";
import { newPassword } from "@/actions/new-password";


export const NewPasswordForm = () => {
     const searchParams  = useSearchParams();
     const token = searchParams.get("token");
    
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState("");
    const [isPending, startTransition] = useTransition();
    const methods=  useForm<z.infer<typeof NewPasswordSchema>>({
        resolver: zodResolver(NewPasswordSchema),
        defaultValues: {
            password: "",
        }
    })
    const onSubmit = (
        values: z.infer<typeof NewPasswordSchema>
    ) => {
        setError("");
        setSuccess("");
        startTransition(() => {
            newPassword(values, token)
                .then((data) => {
                    setError(data?.error);
                    setSuccess(data?.success || ""); 
                });
        });
    }
    return (
        
        <CardWrapper
            headerLabel="Enter a new password"
            backButtonLabel="Back to Login"
            backButtonHref="/auth/login"
            showSocial = {false}
        >
           <Form {...methods}>
            <form onSubmit= {methods.handleSubmit(onSubmit)}
            className="space-y-6"
            >
                <div className="space-y-4">
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
                                        placeholder="********"
                                        type="password"
                                        
                                        />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    

                </div>
                <FormErrors errors={error }/>
                <FormSuccess successes={success} />
                <Button type="submit" className="w-full" disabled={isPending}>
                    Reset Password
                </Button>
            </form>

            </Form>
        </CardWrapper>
        
    );
};

