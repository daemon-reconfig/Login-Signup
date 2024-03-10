"use client";

import { useSession, signOut } from "next-auth/react";

const Settings= () => {
    const session = useSession();
    const onClick = () => {
        signOut();
    
    };
    return (
        <div>
            {JSON.stringify(session)}
            
                <button onClick={onClick} type="submit">
                    Sign out
                </button>
            
        </div>
    );
}
export default Settings;