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
import { signIn } from '@/services/signin';
import { type SignInData, signInSchema } from '@/validators/signin';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, createFileRoute, useNavigate } from '@tanstack/react-router';
import { isAxiosError } from 'axios';
import { LoaderCircle } from 'lucide-react';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';

export const Route = createFileRoute('/signin')({
  component: SignIn,
});

function SignIn() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<SignInData>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(signInSchema),
  });

  const handleSignIn = useCallback(async (data: SignInData) => {
    try {
      setError(null);
      setIsLoading(true);

      const response = await signIn(data);

      // TODO Salvar dodos do usuário no localStorage e no estado global
      console.log(response);
      navigate({ to: '/' });
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
          <CardTitle>SignIn</CardTitle>
          <CardDescription>Enter your credentials to sign in.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSignIn)}
              noValidate
              className="space-y-4">
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

              <Button disabled={isLoading} type="submit" className="w-full">
                {isLoading && <LoaderCircle className="h-4 w-4 animate-spin" />}
                SignIn
              </Button>
            </form>
          </Form>

          {error && <p className="text-destructive text-sm mt-2">{error}</p>}
        </CardContent>
        <CardFooter>
          <p className="font-light text-sm">
            Don't you have an account?{' '}
            <Link to="/register" className="underline">
              Register.
            </Link>
          </p>
        </CardFooter>
      </Card>
    </section>
  );
}
