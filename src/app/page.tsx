// Root page: static redirect to default locale (locale detection handled by middleware)
import { routing } from "@/i18n/routing";
import { redirect } from "next/navigation";

export const dynamic = "force-static";

export default function RootPage() {
  redirect(`/${routing.defaultLocale}`);
}
