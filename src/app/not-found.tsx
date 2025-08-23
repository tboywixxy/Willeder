export default function NotFound() {
  return (
    <main className="min-h-[60vh] grid place-items-center px-6">
      <div className="text-center space-y-3">
        <h1 className="text-3xl font-semibold">Page not found</h1>
        <p className="text-gray-600">The page you’re looking for doesn’t exist.</p>
        <a
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-black hover:bg-black hover:text-white transition focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
        >
          Go home
        </a>
      </div>
    </main>
  );
}
