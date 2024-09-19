"use client";

import { IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/navigation";

const GoBackButton = () => {
    const router = useRouter();

    const handleGoBack = () => {
        router.push("/");
    };

    return (
        <IconButton
            color="primary"
            onClick={handleGoBack}
            sx={{ position: "absolute", top: 16, left: 16 }}
        >
            <ArrowBackIcon />
        </IconButton>
    );
};

export default GoBackButton;
