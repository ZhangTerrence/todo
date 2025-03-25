import Navbar from "@/components/Navbar";
import LoginForm from "@/components/LoginForm";

export default async function LoginPage() {
  return (
    <div className="h-screen w-screen flex flex-col">
      <Navbar />
      <main className="grow grid place-content-center">
        <LoginForm />
      </main>
    </div>
  );
}
