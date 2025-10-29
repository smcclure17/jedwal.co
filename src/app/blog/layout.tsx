import { NavBar } from "@/components/NavBar";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm px-4 py-4">
        <div className="container mx-auto">
          <NavBar showSignIn={false} />
        </div>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  );
}
