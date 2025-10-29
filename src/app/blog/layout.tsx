import { NavBarNoUser } from "@/components/NavLoading";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur px-4 py-4">
        <div className="container mx-auto">
          <NavBarNoUser showSignIn={false} />
        </div>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  );
}
