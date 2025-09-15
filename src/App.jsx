import { SidebarProvider } from "./Context/SidebarContext";
import Routing from "./Routing/Routing";

function App() {
    return (
        <>
            <SidebarProvider>
                <Routing />
            </SidebarProvider>
        </>
    );
}

export default App;
