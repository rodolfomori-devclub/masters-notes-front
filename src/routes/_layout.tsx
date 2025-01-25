import { Logo } from '@/components/native/logo';
import { Button } from '@/components/ui/button';
import type { SignedUser } from '@/services';
import { useUserStore } from '@/stores/use-user-store';
import {
  Link,
  Outlet,
  createFileRoute,
  useNavigate,
} from '@tanstack/react-router';
import { LogIn, LogOut } from 'lucide-react';
import { useCallback } from 'react';

export const Route = createFileRoute('/_layout')({
  component: Layout,
});

function Layout() {
  const { user, setUser } = useUserStore();
  const navigate = useNavigate();

  const handleSignOut = useCallback(() => {
    setUser({} as SignedUser);

    navigate({ to: '/' });
  }, []);

  return (
    <main className="mx-auto flex flex-col max-w-screen-xl w-full">
      <header className="flex items-center px-8 py-6 border-b w-full justify-between">
        <Logo />

        {!user?.token && (
          <Button
            className="font-light"
            variant="link"
            onClick={() => navigate({ to: '/signin' })}>
            <LogIn className="h-4 w-4 text-green-500" />
            SignIn
          </Button>
        )}

        {user?.token && (
          <div className="flex items-center gap-2">
            <p className="text-sm font-light">
              Hello, {user.fullName.split(' ').at(0)}
            </p>
            <Link
              className="text-sm hover:underline font-light text-sky-800"
              to="/new">
              Create article
            </Link>
            <Button variant="link" size="icon" onClick={handleSignOut}>
              <LogOut className="h-4 w-4 text-red-500" />
            </Button>
          </div>
        )}
      </header>
      <Outlet />
    </main>
  );
}
