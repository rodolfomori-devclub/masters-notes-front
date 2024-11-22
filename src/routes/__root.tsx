import { Logo } from '@/components/native/logo';
import { Outlet, createRootRoute } from '@tanstack/react-router';

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <main className="mx-auto flex flex-col max-w-screen-xl w-full">
      <header className="px-8 py-6 border-b w-full">
        <Logo />
      </header>
      <Outlet />
    </main>
  );
}
