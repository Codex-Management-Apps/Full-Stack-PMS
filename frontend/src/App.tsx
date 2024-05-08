import { BrowserRouter} from 'react-router-dom';
import { ThemeProvider } from './components/theme-provider';
import { AuthProvider } from './context/AuthProvider';
import Routes from "./Routes"

export default function Home() {
  return (   
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
     <BrowserRouter>
       <AuthProvider>
        <Routes />
       </AuthProvider>
     </BrowserRouter>
   </ThemeProvider>
  );
}
