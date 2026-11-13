import { BackLink } from "../components/back-link";

export default function NotFound() {
  return (
    <div className="space-y-4 text-center">
      <h1 className="text-3xl font-bold">Not found</h1>
      <p className="text-neutral-400">The API returned 404 — there&apos;s nothing here.</p>
      <BackLink />
    </div>
  );
}
