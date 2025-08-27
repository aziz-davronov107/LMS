import React from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../storage/register.storage";
import axios from "axios";

export default function Register() {
  const { setFullname, setPass, phone, setPhone } = useUserStore();
  const navigate = useNavigate();

  const handlerInput = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://backend-final-exam.onrender.com/api/verification/send",
        {
          type: "register",
          phone,
        }
      );

      if (res.status === 200 || res.status === 201) {
        navigate("/otp");
      }
    } catch (error) {
      console.error(error.response?.data || error.message);
      alert(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      <h1 className="text-xl font-semibold text-slate-900">Ro‘yxatdan o‘tish</h1>
      <p className="text-sm text-slate-500 mt-1">
        Tasdiqlash uchun OTP yuboramiz.
      </p>

      <form onSubmit={handlerInput} className="mt-5 space-y-4">
        <div className="space-y-1">
          <label htmlFor="reg-name" className="text-sm text-slate-700">
            To‘liq ism
          </label>
          <input
            id="reg-name"
            className="w-full rounded-xl border border-slate-200 bg-white/80 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-300"
            placeholder="Ism Familya"
            onChange={(el) => setFullname(el.target.value)}
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="reg-phone" className="text-sm text-slate-700">
            Telefon
          </label>
          <input
            id="reg-phone"
            className="w-full rounded-xl border border-slate-200 bg-white/80 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-300"
            placeholder="+998 ** *** ** **"
            inputMode="tel"
            onChange={(el) => setPhone(el.target.value)}
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="reg-pass" className="text-sm text-slate-700">
            Parol
          </label>
          <input
            id="reg-pass"
            type="password"
            className="w-full rounded-xl border border-slate-200 bg-white/80 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-300"
            placeholder="..."
            onChange={(el) => setPass(el.target.value)}
          />
        </div>

        <div className="flex items-center justify-end">
          <button
            type="submit"
            className="rounded-lg bg-indigo-500/90 hover:bg-indigo-500 text-white px-4 py-2 text-sm font-medium shadow-sm"
          >
            Davom etish
          </button>
        </div>
      </form>
    </div>
  );
}
