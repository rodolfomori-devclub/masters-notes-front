import { Logo } from '@/components/native/logo';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { registerUser } from '@/services/register-user';
import { useUserStore } from '@/stores/use-user-store';
import {
  type RegisterUserData,
  registerUserSchema,
} from '@/validators/register-user';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, createFileRoute, useNavigate } from '@tanstack/react-router';
import { isAxiosError } from 'axios';
import { LoaderCircle } from 'lucide-react';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';

export const Route = createFileRoute('/register')({
  component: Register,
});

function Register() {
  const navigate = useNavigate();
  const { user } = useUserStore();

  if (user?.token) {
    navigate({ to: '/' });
  }

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<RegisterUserData>({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    resolver: zodResolver(registerUserSchema),
  });

  const handleRegister = useCallback(async (data: RegisterUserData) => {
    try {
      setError(null);
      setIsLoading(true);

      await registerUser(data);

      navigate({ to: '/signin' });
    } catch (err) {
      if (isAxiosError(err)) {
        setError(err.response?.data.message);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <section className="flex items-center justify-center h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <Logo />
          <CardTitle>Create a new account</CardTitle>
          <CardDescription>
            Complete fields below to register a new account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleRegister)}
              noValidate
              className="space-y-4">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        inputMode="email"
                        autoCapitalize="off"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" autoCapitalize="off" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input type="password" autoCapitalize="off" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button disabled={isLoading} type="submit" className="w-full">
                {isLoading && <LoaderCircle className="h-4 w-4 animate-spin" />}
                Register
              </Button>
            </form>
          </Form>

          {error && <p className="text-destructive text-sm mt-2">{error}</p>}
        </CardContent>
        <CardFooter>
          <p className="font-light text-sm">
            Do you have an account?{' '}
            <Link to="/signin" className="underline">
              SignIn.
            </Link>
          </p>
        </CardFooter>
      </Card>
    </section>
  );
}
