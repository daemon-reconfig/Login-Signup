import { LoginButton } from "@/components/auth/login-button";
import { Button } from "@/components/ui/button";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

export default function Home() {
  return (
    <main className="flex h-full flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800">
      <div className="flex items-center gap-x-2 text-white bg-destructive rounded-md p-2 ">
            <ExclamationTriangleIcon className="h-4 w-4"/>
            <p>
                The Database has expired and no new account will be created
            </p>
        </div>
      <div className="space-y-10 flex-col justify-center">
        {/* create a red box and write - "the database has expired and no new account will be created" with an exclamation icon */}
        
        <h1 className="text-6xl font-semibold text-white drop-shadow-md">
          Auth
        </h1>
        <LoginButton>
          <Button variant="secondary" size="lg" className="w-full">Login</Button>
        </LoginButton>
      </div>
    </main>
  );
}
