import { NavBar } from "@/shared/components/layout/NavBar";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavBar />
      {children}
    </>
  );
}
