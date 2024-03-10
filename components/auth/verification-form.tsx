"use client";

import { CardWrapper } from "./card-wrapper";
import { useCallback } from "react";
import { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import {useSearchParams} from "next/navigation"
import { newVerification } from "@/actions/new-verification";
import { FormSuccess } from "../form-success";
import { FormErrors } from "../form-errors";
export const VerificationForm =() => {
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();
    const searchParams = useSearchParams();
    const token = searchParams.get("token");
    const onSubmit = useCallback(() => {
        if(success || error) return;
        if(!token) {
            setError("Missing Token");
            return;
        }
        newVerification(token)
            .then((data) => {
                setSuccess(data.success);
                setError(data.error);
            })
            .catch(() => {
                setError("Something broke!")
            })
    }, [token, success, error])
    useEffect(() => {
        onSubmit();
    }, [onSubmit]);
    return(
        <CardWrapper
            headerLabel="Confirming your verification"
            backButtonHref="/auth/login"
            backButtonLabel="Back to login"
            showSocial={false}
        >
            <div className="flex items-center w-full justify-center">
               {!success && !error && (
                    <BeatLoader />
               )}
                <FormSuccess successes={success} />
                {!success && (

                    <FormErrors errors={error} />
                )}
            </div>
        </CardWrapper>
    );
}

