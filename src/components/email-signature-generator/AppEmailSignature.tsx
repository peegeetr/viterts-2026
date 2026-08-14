import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { EmailSignatureGenerator } from "./EmailSignatureGenerator";

const queryClient = new QueryClient();

export default function AppEmailSignature() {
  return (
    <QueryClientProvider client={queryClient}>
      <EmailSignatureGenerator />
    </QueryClientProvider>
  );
}
