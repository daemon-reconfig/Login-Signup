import { CheckCircledIcon } from "@radix-ui/react-icons";


interface FormSuccessProps {
    successes?: string;
}

export const FormSuccess = ({ successes }: FormSuccessProps) => {
    if (!successes) return null;
    return (
        <div className="flex items-center gap-x-2 text-emerald-500 bg-emerald-500/15 rounded-md p-2 text-bold">
            <CheckCircledIcon className="h-4 w-4"/>
            <p>
                {successes}
            </p>
        </div>
    );
};
