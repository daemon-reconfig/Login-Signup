import { ExclamationTriangleIcon } from "@radix-ui/react-icons";


interface FormErrorsProps {
    errors?: string;
}

export const FormErrors = ({ errors }: FormErrorsProps) => {
    if (!errors) return null;
    return (
        <div className="flex items-center gap-x-2 text-red-500 bg-destructive/15 rounded-md p-2 ">
            <ExclamationTriangleIcon className="h-4 w-4"/>
            <p>
                {errors}
            </p>
        </div>
    );
};
