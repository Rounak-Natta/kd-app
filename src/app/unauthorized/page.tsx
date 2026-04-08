import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="text-2xl font-semibold">Unauthorized</h1>
        <p className="text-muted-foreground">
          You do not have access to this page.
        </p>

        <Link
          href="/login"
          className="text-primary underline"
        >
          Go to Login
        </Link>
      </div>
    </div>
  );
}