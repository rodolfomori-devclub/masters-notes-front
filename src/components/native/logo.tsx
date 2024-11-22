import { Link } from '@tanstack/react-router';

export function Logo() {
  return (
    <Link to="/">
      <h1 className="inline-block font-semibold text-lg text-primary select-none">
        masters.notes
      </h1>
    </Link>
  );
}
