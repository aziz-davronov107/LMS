import React from "react";

export default function Profile() {
  return (
    <div className="w-full max-w-sm mx-auto">
      <h1 className="text-xl font-semibold text-slate-900">Profil</h1>
      <div className="mt-5 space-y-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-slate-600">To‘liq ism</span>
          <span className="font-medium text-slate-900">John Doe</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-600">Telefon</span>
          <span className="font-medium text-slate-900">+998 ** *** ** **</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-600">Rol</span>
          <span className="font-medium text-slate-900">Student</span>
        </div>

        <div className="pt-3 flex items-center gap-3">
          <button className="rounded-lg bg-slate-900 text-white px-3 py-2 text-sm font-medium hover:bg-black">
            Tahrirlash
          </button>
          <button className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-900 hover:bg-slate-50">
            Chiqish
          </button>
        </div>
      </div>
    </div>
  );
}
