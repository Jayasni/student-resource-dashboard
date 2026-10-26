
import type { FallbackProps } from "react-error-boundary";

export default function ErrorFallback({
  error,
  resetErrorBoundary,
}: FallbackProps) {
  const errorMessage =
    error instanceof Error ? error.message : "Unknown error";

  return (
    <section className="error-panel" role="alert">
      <h2>This section could not be displayed.</h2>
      <p>Please try again.</p>

      <button onClick={resetErrorBoundary}>
        Try again
      </button>

      {import.meta.env.DEV && <pre>{errorMessage}</pre>}
    </section>
  );
}
