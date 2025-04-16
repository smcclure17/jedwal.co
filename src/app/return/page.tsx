export default async function ReturnPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;

  if (!session_id) {
    return (
      <section>
        <h1>Error</h1>
        <p>Missing session information. Please try again.</p>
        <a href="/">Return to homepage</a>
      </section>
    );
  }

  return (
    <section id="success">
      <h1>Thank You!</h1>
      <p>Your subscription has been processed successfully.</p>
      <p>A confirmation email will be sent to your address shortly.</p>
      <a href="/app">Return to dashboard</a>
    </section>
  );
}
