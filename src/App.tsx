import { Button } from "@/components/ui/button";

export function App() {
  return (
    <main className="flex h-screen gap-2 w-full items-center justify-center">
      <h1 className="font-semibold text-2xl text-zinc-700">Masters Notes</h1>
      <Button>Click me</Button>
      <Button size="sm" variant="secondary">Click me</Button>
      <Button size="lg">Click me</Button>
      <Button variant="destructive">Click me</Button>
      <Button variant="ghost">Click me</Button>
      <Button variant="outline">Click me</Button>
      <Button variant="link">Click me</Button>
    </main>
  )
}
