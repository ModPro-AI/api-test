import type { ApiFailure } from "../lib/api";

const titleFor = (status: number) => {
  if (status === 0) return "API unreachable";
  if (status === 501) return "Not implemented yet";
  return `API error ${status}`;
};

export function ApiError({ status, message, endpoint }: ApiFailure) {
  return (
    <div className="mx-auto max-w-xl rounded-2xl border border-red-500/40 bg-red-500/10 p-6">
      <p className="text-sm font-semibold uppercase tracking-wide text-red-400">
        {titleFor(status)}
      </p>
      <p className="mt-2 font-mono text-sm text-neutral-300">GET {endpoint}</p>
      <p className="mt-4 text-neutral-100">{message}</p>
      <p className="mt-4 text-sm text-neutral-400">
        This page is driven by the NestJS API in <code>apps/api</code>. Build
        the endpoint described in the README and refresh.
      </p>
    </div>
  );
}
