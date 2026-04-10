import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";

import Home from "./pages/Home";
import Assessment from "./pages/Assessment";
import Providers from "./pages/Providers";
import Checklist from "./pages/Checklist";
import Calculator from "./pages/Calculator";
import Report from "./pages/Report";
import Comparison from "./pages/Comparison";
import Dashboard from "./pages/Dashboard";
import History from "./pages/History";
import Profiles from "./pages/Profiles";
import Export from "./pages/Export";


function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/assessment"} component={Assessment} />
      <Route path={"/providers"} component={Providers} />
      <Route path={"/checklist"} component={Checklist} />
      <Route path={"/calculator"} component={Calculator} />
      <Route path={"/report"} component={Report} />
      <Route path={"/comparison"} component={Comparison} />
      <Route path={"/dashboard"} component={Dashboard} />
      <Route path={"/history"} component={History} />
      <Route path={"/profiles"} component={Profiles} />
      <Route path={"/export"} component={Export} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
