"use client";

import { useMemo, useState } from "react";

type Coin = "BTC" | "ETH" | "USDT";

export default function RatesBlock() {
  const [coin, setCoin] = useState<Coin>("BTC");
  const [amount, setAmount] = useState("");
  const [result, setResult] = useState("");

  const ourRateText = "1,520.00=$1";
  const rate = useMemo(() => 1520, []);

  const onCalculate = () => {
    const n = Number(amount);
    if (!amount || Number.isNaN(n) || n <= 0) {
      setResult("");
      return;
    }
    const ngn = n * rate;
    setResult(`${n} ${coin} = ₦${ngn.toLocaleString()}`);
  };

  return (
    <section>
      <div className="bg-[#4E7A0B]">
        <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12 py-10">
          <div className="flex items-center justify-between">
            <p className="text-white font-semibold">Rate Calculator</p>

            <div className="flex items-center gap-3 text-white">
              <span className="text-white/90">Our rate:</span>
              <span className="text-2xl font-extrabold">{ourRateText}</span>
            </div>
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between gap-4">
                <p className="font-semibold text-slate-900">Rate Calculator</p>

                <select
                  value={coin}
                  onChange={(e) => setCoin(e.target.value as Coin)}
                  className="h-9 w-24 rounded-md border border-slate-200 bg-white px-3 text-sm font-medium outline-none"
                >
                  <option value="BTC">BTC</option>
                  <option value="ETH">ETH</option>
                  <option value="USDT">USDT</option>
                </select>
              </div>

              <p className="mt-3 text-xs text-slate-500">
                Enter the amount of {coin} you&apos;d like to calculate
              </p>

              <div className="mt-4 flex items-center gap-4">
                <input
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder=""
                  className="h-11 flex-1 rounded-md border border-slate-200 px-3 outline-none"
                />

                <button
                  onClick={onCalculate}
                  className="h-11 w-36 rounded-md bg-[#4E7A0B] text-sm font-semibold text-white"
                >
                  Calculate
                </button>
              </div>
            </div>

            <div className="rounded-lg bg-white p-6 shadow-sm">
              <p className="font-semibold text-slate-900">
                Rate Calculation result:
              </p>

              <div className="mt-4 h-28 rounded-md border border-slate-200 bg-white p-3 text-sm text-slate-700">
                {result}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white">
        <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12 py-12">
          <h3 className="text-center font-semibold text-slate-900">
            Crypto Rates
          </h3>

          <div className="mt-6 grid gap-8 md:grid-cols-2">
            <div className="rounded-2xl bg-slate-100 px-10 py-9 text-center">
              <p className="text-slate-900">Buy rate:</p>
              <p className="mt-2 text-2xl font-extrabold">{ourRateText}</p>
            </div>

            <div className="rounded-2xl bg-slate-100 px-10 py-9 text-center">
              <p className="text-slate-900">Sell rate:</p>
              <p className="mt-2 text-2xl font-extrabold">{ourRateText}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
