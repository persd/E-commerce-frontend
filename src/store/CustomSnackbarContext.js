import React, { createContext, useContext, useRef } from 'react';
import CustomSnackbar from '../components/UI/CustomSnackbar';

const CustomSnackbarContext = createContext();

export function useCustomSnackbar() {
    return useContext(CustomSnackbarContext);
}

export function CustomSnackbarProvider({ children }) {
    const customSnackbarRef = useRef();

    const show = (severity, message) => {
        customSnackbarRef.current.show(severity, message);
    };

    return (
        <CustomSnackbarContext.Provider value={{ show }}>
            <CustomSnackbar ref={customSnackbarRef} />
            {children}
        </CustomSnackbarContext.Provider>
    );
}
