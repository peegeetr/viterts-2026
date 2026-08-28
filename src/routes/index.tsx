import AppEmailSignature from "@/components/email-signature-generator/AppEmailSignature";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <AppEmailSignature />;
}
