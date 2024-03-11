"use client";

import { Button } from "@/components/ui/button";
import { useSession, signOut } from "next-auth/react";

const Settings= () => {
    const session = useSession();
    const onClick = () => {
        signOut();
    
    };
    return (
        <div>
            {JSON.stringify(session)}
            this is the settings page
            <Button onClick={onClick} variant="default" type="submit">
                Sign out
            </Button>
        </div>
        
            
        
    );
}
export default Settings;