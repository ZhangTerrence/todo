"use client";

import { signUp } from "@/lib/auth-client";
import { useForm } from "react-hook-form";
import { Signup, SignupType } from "@/lib/validators/register";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupType>({ resolver: zodResolver(Signup) });
  const router = useRouter();

  const onSubmit = async (body: SignupType) => {
    await signUp.email(
      {
        email: body.email,
        password: body.password,
        name: body.username,
      },
      {
        onSuccess: () => {
          router.push("/home");
        },
        onError: () => {
          console.error("Error occurred.");
        },
      },
    );
  };

  return (
    <div className="flex flex-col items-center gap-y-4">
      <h1 className="text-4xl">
        <strong>Register</strong>
      </h1>
      <form className="flex min-w-80 flex-col gap-y-4 text-spotify-white" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col">
          <label className="text-xl" htmlFor="username">
            Username
          </label>
          <input
            className="rounded border border-solid p-2 bg-textbox-gray text-spotify-black"
            type="text"
            {...register("username")}
          />
          {errors.username && <span className="text-red-600">{errors.username.message}</span>}
        </div>
        <div className="flex flex-col">
          <label className="text-xl" htmlFor="email">
            Email
          </label>
          <input
            className="rounded border border-solid p-2 bg-textbox-gray text-spotify-black"
            type="email"
            {...register("email")}
          />
          {errors.email && <span className="text-red-600">{errors.email.message}</span>}
        </div>
        <div className="flex flex-col">
          <label className="text-xl" htmlFor="password">
            Password
          </label>
          <input
            className="rounded border border-solid p-2 bg-textbox-gray text-spotify-black"
            type="password"
            {...register("password")}
          />
          {errors.password && <span className="text-red-600">{errors.password.message}</span>}
        </div>
        {errors.root && <span className="text-red-600">{errors.root?.message}</span>}
        <button
          className="w-full rounded-3xl border border-solid p-2 bg-spotify-green text-spotify-black font-extrabold"
          type="submit"
        >
          Register
        </button>
      </form>
    </div>
  );
}
