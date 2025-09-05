import React from "react";
import Stack from "@mui/material/Stack";
import { PieChart } from "@mui/x-charts/PieChart";
import { motion as Motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, BarChart3, TrendingUp, Zap } from "lucide-react";
import { FaArrowTrendUp } from "react-icons/fa6";
import { TbTargetArrow } from "react-icons/tb";

const data = [
  { label: "Online payments", value: 60, color: "#07DE77" },
  { label: "Card payments", value: 25, color: "#4BAAF8" },
  { label: "Transfer", value: 15, color: "#AB49FF" },
];

const spendingData = [
  {
    label: "Online payments",
    value: 2500,
    color: "#07DE77",
    bg: "yellow-300/10",
    percentage: 65,
  },
  {
    label: "Card payments",
    value: 800,
    color: "#4BAAF8",
    bg: "blue-300/10",
    percentage: 20,
  },
  {
    label: "Transfer",
    value: 600,
    color: "#AB49FF",
    bg: "red-300/10",
    percentage: 15,
  },
];


export default function   HeroSection() {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center pt-16 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 relative z-10">
        <div className="text-center max-w-5xl mx-auto space-y-6 sm:space-y-8">
          {/* Badge */}
          <Motion.div
            className="inline-flex items-center text-white space-x-2 border border-purple-600 bg-purple-400/10 backdrop-blur-xl rounded-full px-3 py-2 sm:px-4  text-xs sm:text-sm font-medium"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <FaArrowTrendUp size={20} />
            <span className="whitespace-nowrap">
              Because Sometimes Your Wallet Needs the Truth.
            </span>
          </Motion.div>

          {/* Main Headline */}
          <Motion.h1
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white leading-tight px-2"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Truth Hurts
            <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
              So Does an Empty Bank Account
            </span>
          </Motion.h1>

          {/* Subtitle */}
          <Motion.p
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-500 leading-relaxed max-w-3xl mx-auto px-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Track expenses, forecast savings, and hit your financial goals – all
            in one intuitive platform.
          </Motion.p>

          {/* CTA Buttons */}
          <Motion.div
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <Link
              to={"/auth"}
              className="w-full sm:w-auto hover:scale-[1.05] bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center space-x-2 group min-w-[200px]"
            >
              <span>Get Started Free</span>
              <ArrowRight
                size={24}
                className=" group-hover:scale-[1.2] group-hover:-rotate-45  transition-transform duration-200"
              />
            </Link>

            <Link
              to="/auth"
              className="w-full sm:w-auto bg-white hover:bg-transparent hover:backdrop-blur-2xl border-2 border-gray-700 text-blue-600 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg hover:border-blue-600 hover:text-white hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2 group min-w-[200px]"
            >
              <span>Sign In</span>
            </Link>
          </Motion.div>

          {/* Trust Indicators */}
          <Motion.div
            className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6 lg:space-x-8 text-xs sm:text-sm text-gray-500 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="whitespace-nowrap">No credit card required</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="whitespace-nowrap">14-day free trial</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span className="whitespace-nowrap">Cancel anytime</span>
            </div>
          </Motion.div>

          {/* Dashboard Preview */}
          <Motion.div
            className="relative max-w-7xl mx-auto mt-8 sm:mt-12 lg:mt-16 px-4"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <div className="relative bg-white rounded-xl sm:rounded-2xl shadow-2xl p-4 sm:p-6 lg:p-8 border border-gray-100">
              {/* Dashboard Header */}
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full"></div>
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="text-xs sm:text-sm text-gray-500 hidden sm:block">
                  CapitaClarity.com/dashboard
                </div>
              </div>

              {/* Dashboard Content */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <div className="col-span-1 space-y-4 sm:space-y-8">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                      Financial Overview
                    </h3>
                    <Motion.div
                      className="bg-green-100 text-green-800 px-2 sm:px-3 py-1 self-center rounded-full text-xs sm:text-sm font-medium w-fit"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      +35.1% this month
                    </Motion.div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div className="bg-blue-50 p-3 sm:p-4 rounded-lg">
                      <div className="text-xs sm:text-sm text-blue-600 font-medium">
                        Total Income
                      </div>
                      <div className="text-xl sm:text-2xl font-bold text-blue-900">
                        $12,847
                      </div>
                    </div>
                    <div className="bg-purple-50 p-3 sm:p-4 rounded-lg">
                      <div className="text-xs sm:text-sm text-purple-600 font-medium">
                        Total Expenses
                      </div>
                      <div className="text-xl sm:text-2xl font-bold text-purple-900">
                        $8,234
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 sm:h-3 rounded-full overflow-hidden">
                    <Motion.div
                      className="bg-gradient-to-r from-green-400 to-blue-400 h-full rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: "68%" }}
                      transition={{ duration: 2, delay: 1.2 }}
                    />
                  </div>
                </div>
                <div className="col-span-1 rounded-xl  space-y-4">
                  <div className=" ">
                    <Stack
                      width="100%"
                      direction="row"
                      flexWrap="wrap"
                      className=""
                    >
                      <PieChart
                        series={[
                          {
                            paddingAngle: 5,
                            innerRadius: 60,
                            outerRadius: 80,
                            data,
                          },
                        ]}
                        width={200}
                        height={200}
                        hideLegend
                      />
                    </Stack>{" "}
                  </div>
                </div>
                <div className="col-span-1 lg:col-span-2 grid grid-cols-1 gap-10 lg:grid-cols-3">
                  {spendingData.map((item, index) => (
                    <div
                      key={index}
                      className={`col-span-1  flex justify-between items-center  px-4 py-1 rounded-full`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: item.color }}
                        />
                        <span className={`text-${item.color}`}>
                          {item.label}
                        </span>
                      </div>
                      <div className="text-right">
                        <div
                          className={`font-semibold `}
                          style={{ color: item.color }}
                        >
                          ${item.value.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating Elements - Hidden on mobile for better performance */}
            <Motion.div
              className="hidden sm:block absolute -top-4 sm:-top-6 -left-4 sm:-left-6 bg-gradient-to-r from-blue-500 to-blue-600 p-3 sm:p-4 rounded-xl shadow-lg"
              animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </Motion.div>

            <Motion.div
              className="hidden sm:block absolute -bottom-4 sm:-bottom-6 -right-4 sm:-right-6 bg-gradient-to-r from-purple-500 to-purple-600 p-3 sm:p-4 rounded-xl shadow-lg"
              animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, delay: 1 }}
            >
              <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </Motion.div>

            <Motion.div
              className="hidden lg:block absolute top-1/2 -right-6 lg:-right-8 bg-gradient-to-r from-green-500 to-green-600 p-3 sm:p-4 rounded-xl shadow-lg"
              animate={{ x: [0, 10, 0], rotate: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity, delay: 2 }}
            >
              <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </Motion.div>
            <Motion.div
              className="hidden -z-10 lg:block absolute bottom-1 -left-6 lg:-left-8 bg-gradient-to-r from-red-400 to-red-600 p-3 sm:p-4 rounded-xl shadow-lg"
              animate={{ x: [0, 10, 0], rotate: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity, delay: 2 }}
            >
              <TbTargetArrow className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </Motion.div>
          </Motion.div>
        </div>
      </div>
    </section>
  );
}
