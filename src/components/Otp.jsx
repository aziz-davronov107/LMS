import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../storage/register.storage";

export default function Otp() {
  const inputsRef = useRef([]);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const {fullname,pass, phone } = useUserStore();
  const navigate = useNavigate();


  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  const onChange = (i) => (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 1);

    setOtp((prev) => {
      const copy = [...prev];
      copy[i] = value;
      return copy;
    });

    if (value && i < 5) {
      inputsRef.current[i + 1]?.focus();
    }
  };

  const onKeyDown = (i) => (e) => {
    if (e.key === "Backspace") {
      setOtp((prev) => {
        const copy = [...prev];
        copy[i] = ""; // shu indexni tozalash
        return copy;
      });

      if (!otp[i] && i > 0) {
        inputsRef.current[i - 1]?.focus();
      }
    }
  };

  async function verifyOtp() {
    if (otp.some((el) => el === "")) {
      alert("Iltimos, barcha 6 ta raqamni kiriting!");
      return;
    }
    try {
      const code = otp.join("");
       const res = await axios.post(
        "https://backend-final-exam.onrender.com/api/verification/verify",
        {
            type: "register",
            phone,
            otp: code
        }
      );

      if (res.status === 200 || res.status === 201) {
        try{
            const res = await axios.post(
                "https://backend-final-exam.onrender.com/api/auth/register",
            {
                    phone,
                    pass,
                    fullname,
                    code
                }
            );

            if (res.status === 200 || res.status === 201) navigate("/profile")
        } catch (error) {
            console.error(error.response?.data || error.message);
            alert(error.response?.data?.message || error.message);
        }
      }
      
    } catch (error) {
      console.error(error.response?.data || error.message);
      alert(error.response?.data?.message || error.message);
    }
  }

  return (
    <div className="w-full max-w-sm mx-auto">
      <h1 className="text-xl font-semibold text-slate-900">OTP Tasdiqlash</h1>
      <p className="text-sm text-slate-500 mt-1">6 xonali kodni kiriting.</p>

      <div className="mt-5 flex items-center justify-between gap-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <input
            key={i}
            ref={(el) => (inputsRef.current[i] = el)}
            value={otp[i]}
            maxLength={1}
            inputMode="numeric"
            className="w-12 h-12 text-center text-lg font-semibold rounded-xl border border-slate-200 bg-white/80 outline-none focus:ring-2 focus:ring-indigo-300"
            onChange={onChange(i)}   // onInput o‘rniga onChange
            onKeyDown={onKeyDown(i)}
          />
        ))}
      </div>

      <div className="mt-5 flex items-center gap-3">
        <button
          disabled={otp.some((el) => el === "")} // tugma to‘liq kiritilmaguncha disable
          className={`rounded-lg px-4 py-2 text-sm font-medium shadow-sm 
            ${otp.some((el) => el === "") 
              ? "bg-gray-400 cursor-not-allowed" 
              : "bg-indigo-500/90 hover:bg-indigo-500 text-white"}`}
          onClick={verifyOtp}
        >
          Tasdiqlash
        </button>
      </div>
    </div>
  );
}
