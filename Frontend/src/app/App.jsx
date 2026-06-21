import { Provider } from "react-redux";
import { ClerkProvider } from "@clerk/clerk-react";
import { store } from "../store/store";
import AppRoutes from "../routes/AppRoutes";
import ToastContainer from "../components/ui/ToastContainer";
import ErrorBoundary from "../components/ui/ErrorBoundary";
import MissingKeyFallback from "../components/ui/MissingKeyFallback";

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

export default function App() {
  if (!clerkPubKey) {
    return <MissingKeyFallback />;
  }

  return (
    <ErrorBoundary>
      <ClerkProvider publishableKey={clerkPubKey}>
        <Provider store={store}>
          <AppRoutes />
          <ToastContainer />
        </Provider>
      </ClerkProvider>
    </ErrorBoundary>
  );
}
