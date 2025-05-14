// src/app/not-found.tsx
export default function NotFound() {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">404 - Page Not Found</h1>
        <p className="text-gray-600 mb-6">Sorry, the page you're looking for doesn't exist.</p>
        <a
          href="/"
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Go to Home
        </a>
      </div>
    );
  }
  