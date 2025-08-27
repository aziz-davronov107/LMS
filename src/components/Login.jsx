import React from "react";

export default function Login() {
  return (
    <div className="w-full max-w-sm mx-auto">
      <h1 className="text-xl font-semibold text-slate-900">Kirish</h1>
      <p className="text-sm text-slate-500 mt-1">Telefon va parolni kiriting.</p>

      <form className="mt-5 space-y-4" onSubmit={(e)=>e.preventDefault()}>
        <div className="space-y-1">
          <label htmlFor="login-phone" className="text-sm text-slate-700">Telefon</label>
          <input
            id="login-phone"
            className="w-full rounded-xl border border-slate-200 bg-white/80 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-300"
            placeholder="+998 ** *** ** **"
            inputMode="tel"
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="login-pass" className="text-sm text-slate-700">Parol</label>
          <input
            id="login-pass"
            type="password"
            className="w-full rounded-xl border border-slate-200 bg-white/80 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-300"
            placeholder="••••••••"
          />
        </div>

        <div className="flex items-center justify-between">
          <a className="text-sm text-slate-700 hover:underline" href="#">Parolni unutdingizmi?</a>
          <button
            type="submit"
            className="rounded-lg bg-indigo-500/90 hover:bg-indigo-500 text-white px-4 py-2 text-sm font-medium shadow-sm"
          >
            Kirish
          </button>
        </div>
      </form>
    </div>
  );
}
