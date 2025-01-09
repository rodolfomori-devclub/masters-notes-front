import { Logo } from '@/components/native/logo';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/register')({
  component: Register,
});

function Register() {
  return (
    <section className="flex items-center justify-center h-screen">
      <Card className="max-w-md">
        <CardHeader>
          <Logo />
          <CardTitle>Create a new account</CardTitle>
          <CardDescription>
            Enter your email and password below to register a new account.
          </CardDescription>
        </CardHeader>
      </Card>
    </section>
  );
}
