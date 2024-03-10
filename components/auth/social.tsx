"use client";

import { Button } from "../ui/button";
import { FcGoogle } from "react-icons/fc"; // Import the FcGoogle component from the 'react-icons/fc' package
import { FaGithub } from "react-icons/fa"; // Import the FaGithub component from the 'react-icons/fa' package

export const Social = () => {
    return(
        <div className="flex items-center w-full gap-x-2">
            <Button size="lg" className="w-full" variant="outline" onClick={()=>{}}>
                <FcGoogle className="h-5 w-5"/>
            </Button>
            <Button size="lg" className="w-full" variant="outline" onClick={()=>{}}>
                <FaGithub className="h-5 w-5" />
            </Button>
        </div>
    )
}