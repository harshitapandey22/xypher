import React, { useEffect, useState, useRef } from "react";
import Navbar from "../components/Navbar";
import BalanceModal from "../components/BalanceModal";
import CreateTransactionModal from "../components/CreateTransactionModal";
import TransactionList from "../components/TransactionList";
import GoalList from "../components/GoalList";
import CategoryPieChart from "../components/PieChart";
import { useAuthStore } from "../store/authStore";
import { getTransactions } from "../api/transaction";
import AddGoalModal from "../components/AddGoalModal";
import ForecastPlotly from "../components/ForecastPlotly";
import { forecast } from "../api/ml";
import axios from "axios";
import ChatBot from "../components/ChatBot";
import { IoMdRefresh } from "react-icons/io";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Walkthrough from "../components/Walkthrough";
import { useDashboardTour } from "../context/TourContext";
import FraudulentTransactionModal from "../components/FraudulentTransactionModal";

export default function Dashboard() {
  const { user, refreshUser, accessToken } = useAuthStore();
  const [showBLModal, setShowBLModal] = useState(!user.balance && !user.dailyLimit);
  const [showTxnModal, setShowTxnModal] = useState(false);
  const [txnFlag, setTxnFlag] = useState(0);
  const [spentToday, setSpentToday] = useState(0);
  const [goalFlag, setGoalFlag] = useState(0);
  const [showGoalModal, setShowGoalModal] = useState(false);
  const [txnType, setTxnType] = useState("expense");
  const [forecastData, setForecastData] = useState(null);
  const hasMounted = useRef(false);
  const { step } = useDashboardTour();
  const [showFraudModal, setShowFraudModal] = useState(false);

  const handleTransactionSuccess = (isFraudulent) => {
    setTxnFlag((f) => f + 1);
    setGoalFlag((f) => f + 1);
    if (isFraudulent) {
      setShowFraudModal(true);
    }
  };


  useEffect(() => {
    const init = async () => {
      await refreshUser();
      if (!user.initialBalance) return;
      const forecastPromise = getTransactions(accessToken).then((res) => {
        const allTxns = res.data;
        return forecast(user, allTxns);
      });
      const delay = new Promise((res) => setTimeout(res, 7000));
      const [received] = await Promise.all([forecastPromise, delay]);

      setForecastData(received);
      await axios.post(
        `${import.meta.env.VITE_API_URL}/goal/reset-distribute`,
        { amount: received.monthEndBalance[0][1] },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      setGoalFlag((f) => f + 1);
    };
    init();
  }, []);

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }
    if (!user.initialBalance) return;

    getTransactions(accessToken).then((res) => {
      const today = new Date().toISOString().slice(0, 10);
      const spent = res.data
        .filter((t) => t.date.startsWith(today) && t.type === "expense")
        .reduce((sum, t) => sum + t.amount, 0);
      setSpentToday(spent);
      forecast(user, res.data).then((received_data) => {
        setForecastData(received_data);
        axios.post(
          `${import.meta.env.VITE_API_URL}/goal/reset-distribute`,
          { amount: received_data.monthEndBalance[0][1] },
          { headers: { Authorization: `Bearer ${accessToken}` } }
        ).then(() => setGoalFlag((f) => f + 1));
      });
    });
  }, [txnFlag, accessToken, user.initialBalance]);

  useEffect(() => {
    if (user && user.balance === 0 && user.dailyLimit === 0) {
      setShowBLModal(true);
    }
  }, [user]);

  const limitLeft = user.dailyLimit - spentToday;
  const pct = user.dailyLimit
    ? Math.max(0, Math.min(100, (spentToday / user.dailyLimit) * 100))
    : 0;

  return (
    <div className="h-screen overflow-y-auto scrollbar-hide text-white bg-[#000717]">
      <Navbar />

      <div className="flex flex-1">
        <main className="flex flex-auto">
          <div className="flex flex-col p-3 flex-1">
            <div className="flex-1 flex flex-col gap-5 h-full items-stretch">
              <div className="flex flex-1 gap-5">
                <div className="flex flex-col gap-4">
                  <div className="create-transaction-btn relative flex-[34%] bg-[#1e1e2f] max-h-1/2 rounded-2xl shadow p-6">
                    {step === 0 && <Walkthrough />}
                    <div className="flex justify-between">
                      <div className="text-neutral-300">Current Balance</div>
                      <button
                        onClick={refreshUser}
                        className="text-sm flex items-center gap-2 hover:text-blue-500 hover:underline"
                      >
                        <IoMdRefresh size={20} />
                      </button>
                    </div>
                    <div className="text-3xl mt-10 font-bold">
                      ₹{user.balance.toFixed(2)}
                    </div>
                    <div className="flex flex-col mt-6 gap-4 my-4">
                      <button onClick={() => { setTxnType("income"); setShowTxnModal(true); }} className="bg-[#00CC66] text-white px-4 py-2 rounded">Add Income</button>
                      <button onClick={() => { setTxnType("expense"); setShowTxnModal(true); }} className="bg-[#FF4C4C] text-white px-4 py-2 rounded">Add Expense</button>
                    </div>
                  </div>

                  <div className="daily-limit-box relative bg-[#1e1e2f] min-h-6/12 p-6 rounded-2xl shadow">
                    {step === 1 && <Walkthrough />}
                    <div className="flex justify-between text-gray-300">
                      <p>Daily Limit Left</p>
                      <button onClick={() => setShowBLModal(true)} className="text-sm hover:text-blue-500 hover:underline">Edit</button>
                    </div>
                    <div className="flex flex-col mt-4">
                      <div className="text-3xl mt-10 font-bold">₹{limitLeft.toFixed(2)}</div>
                      <div className="w-56 bg-gray-200 h-2 mt-6 rounded">
                        <div className="bg-[#FF4C4C] h-2 rounded" style={{ width: `${pct}%` }} />
                      </div>
                      <div className="max-w-64 mt-8">
                        <p className="text-sm text-gray-300">Every rupee saved today builds tomorrow’s success—stay within your daily limit with CapitaClarity.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="forecast-graph relative flex-[66%] bg-[#1e1e2f] rounded-2xl shadow px-6 overflow-hidden">
                  {step === 3 && <Walkthrough />}
                  {forecastData ? (
                    <ForecastPlotly graph={forecastData.graph} />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <DotLottieReact
                        src="https://lottie.host/57b587d2-5de3-4a99-b8ab-cdeabe144d5f/pEu7kWSZr4.lottie"
                        loop
                        autoplay
                        style={{ width: 200, height: 200 }}
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-1 gap-5">
                <div className="goals-list relative flex-[50%] bg-[#1e1e2f] rounded-2xl shadow p-6">
                  {step === 2 && <Walkthrough />}
                  <div className="flex justify-between">
                    <p className="text-white text-lg font-medium mb-2">Financial Goals</p>
                    <button onClick={() => setShowGoalModal(true)} className="bg-[#00CC66] text-white px-4 py-2 rounded-4xl mb-10">Add Goal</button>
                  </div>
                  <GoalList refreshFlag={goalFlag} />
                </div>

                <div className="pie-chart-box relative flex-[50%] bg-[#1e1e2f] rounded-2xl shadow p-6">
                  {step === 4 && <Walkthrough />}
                  <CategoryPieChart />
                </div>
              </div>
            </div>
          </div>

          <div className="transaction-list relative m-3 flex flex-col justify-between gap-5 min-h-[calc(100vh-8rem)] min-w-md">
            {step >= 5 && <Walkthrough />}
            <div className="bg-[#1e1e2f] p-6 flex-1 rounded-2xl min-h-[calc(100vh-8rem)]">
              <TransactionList refreshFlag={txnFlag} />
            </div>
          </div>
        </main>
      </div>

      <ChatBot />
      <BalanceModal isOpen={showBLModal} onRequestClose={() => setShowBLModal(false)} />
      <CreateTransactionModal
        isOpen={showTxnModal}
        onRequestClose={() => setShowTxnModal(false)}
        onSuccess={handleTransactionSuccess}
        type={txnType}
      />
      <AddGoalModal
        isOpen={showGoalModal}
        onRequestClose={() => setShowGoalModal(false)}
        onSuccess={() => setGoalFlag((f) => f + 1)}
      />
      <FraudulentTransactionModal isOpen={showFraudModal} onRequestClose={() => setShowFraudModal(false)} />
    </div>
  );
}