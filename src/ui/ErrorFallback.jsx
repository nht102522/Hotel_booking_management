function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <main className="flex h-screen items-center justify-center bg-grey-50 p-[4.8rem]">
      <div className="flex-[0_1_96rem] rounded-[var(--border-radius-md)] border border-grey-100 bg-grey-0 p-[4.8rem] text-center">
        <h1 className="mb-[1.6rem]">Something went wrong</h1>
        <p className="mb-[3.2rem] font-['Sono'] text-grey-500">{error?.message}</p>
        <button onClick={resetErrorBoundary}>Try again</button>
      </div>
    </main>
  );
}

export default ErrorFallback;
