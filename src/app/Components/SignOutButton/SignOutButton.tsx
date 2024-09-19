"use client";

import { Button } from "@mui/material";
import { auth } from "@/app/firebase/clientApp";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

const SignOutButton = () => {
    const router = useRouter();

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            router.push("/");
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    return (
        <Button
            variant="outlined"
            color="secondary"
            onClick={handleSignOut}
            sx={{ marginTop: 2 }}
        >
            Logout
        </Button>
    );
};

export default SignOutButton;
