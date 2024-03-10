import { CardWrapper } from "./card-wrapper";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

export const ErrorCard = () => {
    return(
        <CardWrapper
            headerLabel="Oops! Looks like something went wrong"
            backButtonHref="/auth/login"
            backButtonLabel="Go Back"
        >
            <div className="w-full flex justify-center items-center">
                <ExclamationTriangleIcon className="text-destructive" />
            </div>
        </CardWrapper>
    )
}