"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import { CardWrapper } from "./card-wrapper";
import { useState, useTransition} from "react";
import { ResetSchema } from "@/schemas";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FormErrors } from "../form-errors";
import { FormSuccess } from "../form-success";
import { reset } from "@/actions/reset";


export const ResetForm = () => {
     
    
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState("");
    const [isPending, startTransition] = useTransition();
    const methods=  useForm<z.infer<typeof ResetSchema>>({
        resolver: zodResolver(ResetSchema),
        defaultValues: {
            email: "",
        }
    })
    const onSubmit = (
        values: z.infer<typeof ResetSchema>
    ) => {
        setError("");
        setSuccess("");
        startTransition(() => {
            reset(values)
                .then((data) => {
                    setError(data?.error);
                    setSuccess(data?.success || ""); 
                });
        });
    }
    return (
        
        <CardWrapper
            headerLabel="Forgot your password?"
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

