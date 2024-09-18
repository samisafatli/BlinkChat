"use client";

import { useEffect, useRef, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { Auth } from "firebase/auth";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";

interface Props {
    uiConfig: firebaseui.auth.Config;
    uiCallback?(ui: firebaseui.auth.AuthUI): void;
    firebaseAuth: Auth;
    className?: string;
}

const StyledFirebaseAuth = ({ uiConfig, firebaseAuth, className, uiCallback }: Props) => {
    const [userSignedIn, setUserSignedIn] = useState(false);
    const elementRef = useRef(null);

    useEffect(() => {
        if (typeof window !== "undefined") {
            import("firebaseui").then((firebaseui) => {
                const firebaseUiWidget =
                    firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(firebaseAuth);

                if (uiConfig.signInFlow === "popup") firebaseUiWidget.reset();

                const unregisterAuthObserver = onAuthStateChanged(firebaseAuth, (user) => {
                    if (!user && userSignedIn) firebaseUiWidget.reset();
                    setUserSignedIn(!!user);
                });

                if (uiCallback) uiCallback(firebaseUiWidget);
                // @ts-ignore
                firebaseUiWidget.start(elementRef.current, uiConfig);

                return () => {
                    unregisterAuthObserver();
                    firebaseUiWidget.reset();
                };
            });
        }
    }, [firebaseAuth, uiConfig, uiCallback, userSignedIn]);

    return <div className={className} ref={elementRef} />;
};

export default StyledFirebaseAuth;
