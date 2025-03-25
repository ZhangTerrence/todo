import Navbar from "@/components/Navbar";

export default async function LandingPage() {
  return (
    <div className="h-screen w-screen flex flex-col">
      <Navbar />
      <main className="grid place-content-center grow">
        <p>Hello, world.</p>
      </main>
    </div>
  );
}
