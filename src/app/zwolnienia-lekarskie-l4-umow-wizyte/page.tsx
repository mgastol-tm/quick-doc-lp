import { redirect } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: { index: false, follow: true },
  alternates: { canonical: "https://doktorteraz.pl/zwolnienia-lekarskie-online-l4/umow-wizyte" },
};

export default function RedirectToUmowWizyte() {
  redirect("/zwolnienia-lekarskie-online-l4/umow-wizyte");
}
