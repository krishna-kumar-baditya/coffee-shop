// src/Context/SidebarContext.jsx
import { createContext, useReducer, useContext } from "react";

const SidebarContext = createContext();

const initialState = {
    isOpen: true,        // Default state (desktop: closed, mobile: open)
    userToggled: true,  // Tracks if user manually changed the state
};

function sidebarReducer(state, action) {
    switch (action.type) {
        case "TOGGLE":
            return { 
                ...state, 
                isOpen: !state.isOpen, 
                // userToggled: true 
            };
        case "OPEN":
            return { 
                ...state, 
                isOpen: true, 
                // userToggled: true 
            };
        case "CLOSE":
            return { 
                ...state, 
                isOpen: false, 
                // userToggled: state.userToggled // Preserve user interaction flag
            };
        default:
            return state;
    }
}

export const SidebarProvider = ({ children }) => {
    const [state, dispatch] = useReducer(sidebarReducer, initialState);
    
    return (
        <SidebarContext.Provider value={{ ...state, dispatch }}>
            {children}
        </SidebarContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useSidebar = () => useContext(SidebarContext);