import { Logo } from '@/components/native/logo';
import { Link, Outlet, createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_layout')({
  component: Layout,
});

function Layout() {
  return (
    <main className="mx-auto flex flex-col max-w-screen-xl w-full">
      <header className="flex items-center px-8 py-6 border-b w-full justify-between">
        <Logo />

        <Link to="/signin" className="text-sm hover:underline">
          SignIn
        </Link>
      </header>
      <Outlet />
    </main>
  );
}
