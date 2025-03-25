import Navbar from "@/components/Navbar";
import RegisterForm from "@/components/RegisterForm";

export default async function RegisterPage() {
  return (
    <div className="h-screen w-screen flex flex-col">
      <Navbar />
      <main className="grow grid place-content-center">
        <RegisterForm />
      </main>
    </div>
  );
}
