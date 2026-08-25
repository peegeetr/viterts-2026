import AppEmailSignature from "@/components/email-signature-generator/AppEmailSignature";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/email-signature")({
  component: RouteComponent,
});

function RouteComponent() {
  return <AppEmailSignature />;
}
