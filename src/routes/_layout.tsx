import { Logo } from '@/components/native/logo';
import { Outlet, createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_layout')({
  component: Layout,
});

function Layout() {
  return (
    <main className="mx-auto flex flex-col max-w-screen-xl w-full">
      <header className="px-8 py-6 border-b w-full">
        <Logo />
      </header>
      <Outlet />
    </main>
  );
}
