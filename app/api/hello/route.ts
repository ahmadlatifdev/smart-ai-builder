export async function GET() {
  return new Response(JSON.stringify({ message: "Hello from Smart AI Builder!" }), {
    status: 200,
    headers: { "Content-Type": "application/json" }
  });
}
