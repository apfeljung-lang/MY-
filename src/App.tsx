/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  Bell, 
  Headset, 
  Home, 
  ChevronRight, 
  Gift, 
  TrendingUp, 
  BookOpen, 
  Megaphone, 
  Wallet, 
  PieChart, 
  CreditCard, 
  Menu,
  AlertCircle,
  Coins,
  Truck,
  Layers,
  Barcode,
  Banknote,
  Ticket,
  Percent,
  PlayCircle,
  ShoppingBag,
  Search,
  ChevronUp,
  Trophy,
  Crown
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---
interface Mission {
  id: number;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  color: string;
}

interface Benefit {
  id: number;
  category: string;
  title: string;
  reward: string;
  icon: React.ReactNode;
}

interface EventItem {
  id: number;
  title: string;
  tag: string;
  period: string;
  color: string;
}

interface PointHistoryItem {
  id: number;
  date: string;
  title: string;
  amount: number;
  type: 'earn' | 'use';
}

interface CouponItem {
  id: number;
  type: string;
  title: string;
  expiry: string;
  icon: React.ReactNode;
  color: string;
}

// --- Constants ---
const MISSIONS: Mission[] = [
  { 
    id: 1, 
    title: '웰컴 미션', 
    subtitle: '첫 계좌/거래', 
    icon: <Gift className="w-6 h-6 text-pink-500" />,
    color: 'bg-pink-50'
  },
  { 
    id: 2, 
    title: '자산 옮기기', 
    subtitle: '타사 주식 입고', 
    icon: <TrendingUp className="w-6 h-6 text-blue-500" />,
    color: 'bg-blue-50'
  },
  { 
    id: 3, 
    title: '상식 챌린지', 
    subtitle: '매일 1분 상식', 
    icon: <BookOpen className="w-6 h-6 text-green-500" />,
    color: 'bg-green-50'
  },
  { 
    id: 4, 
    title: '구독형 캐시백', 
    subtitle: '수수료 환급', 
    icon: <Coins className="w-6 h-6 text-yellow-500" />,
    color: 'bg-yellow-50'
  },
  { 
    id: 5, 
    title: '투혼 딜리버리', 
    subtitle: '매일 출석체크', 
    icon: <Truck className="w-6 h-6 text-orange-500" />,
    color: 'bg-orange-50'
  },
  { 
    id: 6, 
    title: '주식모아', 
    subtitle: '정기적 투자', 
    icon: <Layers className="w-6 h-6 text-purple-500" />,
    color: 'bg-purple-50'
  },
];

const EVENTS: EventItem[] = [
  { 
    id: 1, 
    title: 'RIA 계좌개설 이벤트', 
    tag: '신규', 
    period: '04.01 ~ 06.30',
    color: 'text-blue-600 bg-blue-50'
  },
  { 
    id: 2, 
    title: '로보스토 경품 이벤트', 
    tag: 'D-7', 
    period: '04.01 ~ 04.15',
    color: 'text-red-600 bg-red-50'
  },
  { 
    id: 3, 
    title: '주식모아 이벤트', 
    tag: '진행중', 
    period: '상시',
    color: 'text-green-600 bg-green-50'
  },
];

const BENEFITS: Benefit[] = [
  {
    id: 1,
    category: '이자',
    title: 'ISA 납입 보너스',
    reward: '최대 10만 원권 증정',
    icon: <Wallet className="w-5 h-5 text-indigo-500" />
  },
  {
    id: 2,
    category: '포인트',
    title: '친구 초대 더블',
    reward: '둘 다 수수료 제로',
    icon: <CreditCard className="w-5 h-5 text-orange-500" />
  },
  {
    id: 3,
    category: '포인트',
    title: '투혼 쇼핑',
    reward: '최대 10% 포인트 적립',
    icon: <ShoppingBag className="w-5 h-5 text-pink-500" />
  }
];

const ETF_BENEFITS: Benefit[] = [
  {
    id: 1,
    category: '진행중',
    title: 'TIGER 머니마켓액티브',
    reward: '매영업일 3억이상 거래고객 10명 추첨',
    icon: <TrendingUp className="w-5 h-5 text-blue-500" />
  },
  {
    id: 2,
    category: 'D-5',
    title: 'KODEX 대.반.전. (ETF9종)',
    reward: '대상종목 순매수 합산 금액별 추첨',
    icon: <PieChart className="w-5 h-5 text-green-500" />
  }
];

const POINT_HISTORY: PointHistoryItem[] = [
  { id: 1, date: '2026.04.01', title: '출석 체크 보너스', amount: 100, type: 'earn' },
  { id: 2, date: '2026.03.31', title: '해외주식 퀴즈 정답', amount: 500, type: 'earn' },
  { id: 3, date: '2026.03.30', title: '기프티콘 구매', amount: -3500, type: 'use' },
  { id: 4, date: '2026.03.28', title: '웰컴 미션 완료', amount: 5000, type: 'earn' },
  { id: 5, date: '2026.03.25', title: '수수료 할인권 교환', amount: -1000, type: 'use' },
];

const COUPONS: CouponItem[] = [
  { id: 1, type: '바코드 쿠폰', title: 'GS25 5천원 상품권', expiry: '2026.05.30까지', icon: <Barcode className="w-5 h-5 text-gray-700" />, color: 'bg-gray-100' },
  { id: 2, type: '현금 입금', title: '투자지원금 1만원', expiry: '2026.04.15까지', icon: <Banknote className="w-5 h-5 text-green-600" />, color: 'bg-green-50' },
  { id: 3, type: '포인트', title: '투혼 포인트 2,000P', expiry: '상시', icon: <Coins className="w-5 h-5 text-yellow-600" />, color: 'bg-yellow-50' },
  { id: 4, type: '주식상품권', title: '테슬라 1만원권', expiry: '2026.06.01까지', icon: <Ticket className="w-5 h-5 text-blue-600" />, color: 'bg-blue-50' },
  { id: 5, type: '수수료 쿠폰', title: '국내주식 수수료 0원', expiry: '2026.12.31까지', icon: <Percent className="w-5 h-5 text-red-600" />, color: 'bg-red-50' },
  { id: 6, type: '컨텐츠 무료체험', title: '프리미엄 리포트 1개월', expiry: '2026.04.30까지', icon: <PlayCircle className="w-5 h-5 text-purple-600" />, color: 'bg-purple-50' },
];

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'history' | 'coupons' | 'status'>('home');

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 pb-24 max-w-md mx-auto shadow-xl relative overflow-x-hidden">
      <AnimatePresence mode="wait">
        {currentView === 'home' ? (
          <motion.div
            key="home"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            {/* 1. Header Area */}
            <header className="sticky top-0 z-50 bg-white px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-6">
                {['국내', '해외', '자산', 'MY'].map((tab) => (
                  <button
                    key={tab}
                    className={`text-2xl font-black transition-all ${
                      tab === 'MY' ? 'text-[#000000]' : 'text-gray-300'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-4">
                <button className="p-1 hover:bg-gray-100 rounded-full transition-colors relative">
                  <Bell className="w-7 h-7 text-black stroke-[2.5]" />
                </button>
                <button className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                  <Search className="w-7 h-7 text-black stroke-[2.5]" />
                </button>
              </div>
            </header>

            {/* 1. Greeting Area */}
            <section className="px-5 pt-6 pb-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="text-xl font-bold leading-tight flex items-center gap-2">
                    안녕하세요, <span className="text-blue-600">송아리</span>님!
                    <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] font-bold rounded border border-blue-100 uppercase">최우수</span>
                  </p>
                  <p className="text-gray-500 text-sm mt-1">오늘도 혜택 가득한 투자를 응원합니다.</p>
                </div>
                <button 
                  onClick={() => setCurrentView('status')}
                  className="px-3 py-1.5 bg-gray-100 rounded-full text-xs font-medium text-gray-600 flex items-center gap-1 hover:bg-gray-200 transition-colors"
                >
                  내 혜택 현황 <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </section>

            {/* 2. Main Summary Card */}
            <section className="px-5 mb-8">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-6 shadow-xl relative overflow-hidden text-white"
              >
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-400/20 rounded-full -ml-16 -mb-16 blur-2xl"></div>
                
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-sm font-bold tracking-tight">투혼 포인트</span>
                  </div>
                  <button 
                    onClick={() => setCurrentView('history')}
                    className="text-[10px] bg-white/20 px-2 py-1 rounded-full backdrop-blur-sm hover:bg-white/30 transition-colors"
                  >
                    포인트 내역
                  </button>
                </div>

                <div className="mb-8">
                  <h2 className="text-4xl font-black flex items-baseline gap-1">
                    12,450<span className="text-lg font-medium opacity-80">P</span>
                  </h2>
                  <p className="text-[10px] opacity-60 mt-1">다음 등급까지 2,550P 남음</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <motion.button 
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCurrentView('coupons')}
                    className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10 text-left"
                  >
                    <p className="text-[10px] opacity-70 mb-1">보유쿠폰</p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold">6<span className="text-xs font-normal ml-0.5">장</span></span>
                      <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                        <Gift className="w-3.5 h-3.5 text-yellow-900" />
                      </div>
                    </div>
                  </motion.button>
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10">
                    <p className="text-[10px] opacity-70 mb-1">수수료 혜택</p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold">우대<span className="text-xs font-normal ml-0.5">중</span></span>
                      <div className="w-6 h-6 bg-green-400 rounded-full flex items-center justify-center">
                        <CreditCard className="w-3.5 h-3.5 text-green-900" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-3 h-3 opacity-60" />
                    <span className="text-[10px] opacity-60">우대정보: 국내주식 수수료 0.003% 적용</span>
                  </div>
                  <ChevronRight className="w-4 h-4 opacity-40" />
                </div>
              </motion.div>
            </section>

            {/* 2.5 Monthly Ranking Banner */}
            <section className="px-5 mb-8">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-white rounded-3xl p-5 border border-gray-100 shadow-sm flex items-center justify-between overflow-hidden relative"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-50 rounded-full -mr-12 -mt-12 blur-2xl opacity-50"></div>
                <div className="flex items-center gap-4 relative z-10">
                  <div className="w-12 h-12 bg-yellow-100 rounded-2xl flex items-center justify-center">
                    <Trophy className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-sm font-bold flex items-center gap-1.5 tracking-tight">
                      Monthly Tuhon 랭킹 <Crown className="w-3.5 h-3.5 text-yellow-500" />
                    </h3>
                    <p className="text-[11px] text-gray-500 mt-0.5">
                      현재 <span className="text-blue-600 font-bold">상위 5%</span> (1,245위)
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-xs font-bold text-gray-400 relative z-10">
                  랭킹보기 <ChevronRight className="w-4 h-4" />
                </div>
              </motion.button>
            </section>

            {/* 3. Mission Category Grid */}
            <section className="px-5 mb-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-[18px] font-bold">도전! 투자 미션</h3>
                <button className="text-[12px] text-gray-400 flex items-center">전체보기 <ChevronRight className="w-3 h-3" /></button>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {MISSIONS.map((mission) => (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    key={mission.id}
                    className="flex flex-col items-center text-center p-4 bg-white rounded-2xl border border-gray-50 shadow-sm transition-all"
                  >
                    <div className={`w-12 h-12 ${mission.color} rounded-2xl flex items-center justify-center mb-3`}>
                      {mission.icon}
                    </div>
                    <span className="text-[13px] font-bold block truncate w-full">{mission.title}</span>
                    <span className="text-[11px] text-gray-400 mt-0.5 block truncate w-full">{mission.subtitle}</span>
                  </motion.button>
                ))}
              </div>
            </section>

            {/* 4. Event List Area (Updated from Social Proof) */}
            <section className="px-5 mb-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">진행 중인 이벤트</h3>
                <button className="text-xs text-gray-400 flex items-center">전체보기 <ChevronRight className="w-3 h-3" /></button>
              </div>
              <div className="space-y-3">
                {EVENTS.map((event) => (
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    key={event.id}
                    className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4"
                  >
                    <div className="bg-blue-50 p-2.5 rounded-xl">
                      <Megaphone className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${event.color}`}>
                          {event.tag}
                        </span>
                        <span className="text-[10px] text-gray-400">{event.period}</span>
                      </div>
                      <h4 className="text-sm font-bold truncate">{event.title}</h4>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-300" />
                  </motion.div>
                ))}
              </div>
            </section>

            {/* 5. Detailed Benefit List */}
            <section className="px-5 mb-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">이달의 핵심 혜택</h3>
                <button className="text-xs text-gray-400 flex items-center">전체보기 <ChevronRight className="w-3 h-3" /></button>
              </div>
              <div className="space-y-3">
                {BENEFITS.map((benefit) => (
                  <motion.div
                    whileHover={{ x: 4 }}
                    key={benefit.id}
                    className="bg-white p-4 rounded-2xl border border-gray-50 shadow-sm flex items-center justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center">
                        {benefit.icon}
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded mb-1 inline-block">
                          {benefit.category}
                        </span>
                        <h4 className="text-sm font-bold">{benefit.title}</h4>
                        <p className="text-xs text-gray-500">{benefit.reward}</p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-300" />
                  </motion.div>
                ))}
              </div>
            </section>

            {/* 6. ETF Benefit List */}
            <section className="px-5 mb-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">ETF 혜택</h3>
                <button className="text-xs text-gray-400 flex items-center">전체보기 <ChevronRight className="w-3 h-3" /></button>
              </div>
              <div className="space-y-3">
                {ETF_BENEFITS.map((benefit) => (
                  <motion.div
                    whileHover={{ x: 4 }}
                    key={benefit.id}
                    className="bg-white p-4 rounded-2xl border border-gray-50 shadow-sm flex items-center justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center">
                        {benefit.icon}
                      </div>
                      <div>
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded mb-1 inline-block ${benefit.category === '진행중' ? 'text-blue-600 bg-blue-50' : 'text-red-600 bg-red-50'}`}>
                          {benefit.category}
                        </span>
                        <h4 className="text-sm font-bold">{benefit.title}</h4>
                        <p className="text-xs text-gray-500">{benefit.reward}</p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-300" />
                  </motion.div>
                ))}
              </div>
            </section>

            {/* 7. Footer Area - Notices */}
            <section className="px-5 py-8 bg-gray-100/50 border-t border-gray-100">
              <div className="flex items-center gap-2 mb-3 text-gray-500">
                <AlertCircle className="w-4 h-4" />
                <span className="text-xs font-bold">꼭 확인하세요</span>
              </div>
              <ul className="space-y-1.5">
                <li className="text-[10px] text-gray-400 leading-relaxed">• 각 혜택별 상세 유의사항은 상세 페이지에서 확인 가능합니다.</li>
                <li className="text-[10px] text-gray-400 leading-relaxed">• 본 이벤트는 당사 사정에 따라 조기 종료될 수 있습니다.</li>
                <li className="text-[10px] text-gray-400 leading-relaxed">• 금융투자상품은 예금자보호법에 따라 보호되지 않습니다.</li>
              </ul>
            </section>
          </motion.div>
        ) : currentView === 'status' ? (
          <motion.div
            key="status"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.2 }}
          >
            {/* Status Header */}
            <header className="sticky top-0 z-50 bg-white px-4 py-3 flex items-center gap-3 border-b border-gray-100">
              <button 
                onClick={() => setCurrentView('home')}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <h1 className="text-lg font-bold tracking-tight">내 혜택 현황</h1>
            </header>

            {/* Status Content */}
            <div className="p-5 space-y-6">
              {/* Membership Card */}
              <section className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-lg mb-2 inline-block">MEMBERSHIP</span>
                    <h3 className="text-xl font-black">송아리님은 <span className="text-blue-600">최우수</span> 등급입니다</h3>
                  </div>
                  <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-200">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs mb-2">
                      <span className="text-gray-400 font-medium">다음 등급까지</span>
                      <span className="text-blue-600 font-bold">82% 달성</span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: '82%' }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="h-full bg-blue-600 rounded-full"
                      />
                    </div>
                  </div>
                  <p className="text-[10px] text-gray-400 text-center">최근 3개월 거래 실적 기준 (산정일: 2026.04.01)</p>
                </div>
              </section>

              {/* Benefit Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm">
                  <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center mb-3">
                    <Coins className="w-5 h-5 text-orange-500" />
                  </div>
                  <p className="text-xs text-gray-400 mb-1">누적 적립 포인트</p>
                  <p className="text-lg font-black">45,800P</p>
                </div>
                <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm">
                  <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center mb-3">
                    <Ticket className="w-5 h-5 text-indigo-500" />
                  </div>
                  <p className="text-xs text-gray-400 mb-1">누적 사용 쿠폰</p>
                  <p className="text-lg font-black">124장</p>
                </div>
              </div>

              {/* Active Benefits List */}
              <section>
                <h3 className="text-sm font-bold mb-4">적용 중인 주요 혜택</h3>
                <div className="space-y-3">
                  {[
                    { title: '국내주식 수수료 평생 우대', desc: '0.0036396% 적용 중', icon: <Percent className="w-4 h-4 text-red-500" />, color: 'bg-red-50' },
                    { title: '해외주식 환전 우대 95%', desc: '주요 통화(USD/JPY/EUR)', icon: <TrendingUp className="w-4 h-4 text-blue-500" />, color: 'bg-blue-50' },
                    { title: '신용융자 이자율 우대', desc: '최저 연 4.5% 적용', icon: <Wallet className="w-4 h-4 text-green-500" />, color: 'bg-green-50' },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-gray-50">
                      <div className={`w-10 h-10 ${item.color} rounded-xl flex items-center justify-center`}>
                        {item.icon}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold">{item.title}</h4>
                        <p className="text-[10px] text-gray-400">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <button 
                onClick={() => setCurrentView('home')}
                className="w-full py-4 bg-gray-900 text-white rounded-2xl font-bold text-sm shadow-xl shadow-gray-200"
              >
                확인
              </button>
            </div>
          </motion.div>
        ) : currentView === 'history' ? (
          <motion.div
            key="history"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.2 }}
          >
            {/* History Header */}
            <header className="sticky top-0 z-50 bg-white px-4 py-3 flex items-center gap-3 border-b border-gray-100">
              <button 
                onClick={() => setCurrentView('home')}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <h1 className="text-lg font-bold tracking-tight">포인트 내역</h1>
            </header>

            {/* History Summary */}
            <section className="bg-white px-5 py-8 border-b border-gray-100">
              <p className="text-sm text-gray-500 mb-1">보유 포인트</p>
              <h2 className="text-3xl font-black text-blue-600">12,450P</h2>
            </section>

            {/* History List */}
            <section className="bg-white min-h-screen">
              <div className="flex gap-4 px-5 py-4 border-b border-gray-50">
                <button className="text-sm font-bold text-blue-600 border-b-2 border-blue-600 pb-1">전체</button>
                <button className="text-sm font-medium text-gray-400 pb-1">적립</button>
                <button className="text-sm font-medium text-gray-400 pb-1">사용</button>
              </div>
              <div className="divide-y divide-gray-50">
                {POINT_HISTORY.map((item) => (
                  <div key={item.id} className="px-5 py-4 flex justify-between items-center">
                    <div>
                      <p className="text-[10px] text-gray-400 mb-1">{item.date}</p>
                      <h4 className="text-sm font-bold">{item.title}</h4>
                    </div>
                    <span className={`text-sm font-bold ${item.type === 'earn' ? 'text-blue-600' : 'text-red-500'}`}>
                      {item.type === 'earn' ? '+' : ''}{item.amount.toLocaleString()}P
                    </span>
                  </div>
                ))}
              </div>
            </section>
          </motion.div>
        ) : (
          <motion.div
            key="coupons"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.2 }}
          >
            {/* Coupons Header */}
            <header className="sticky top-0 z-50 bg-white px-4 py-3 flex items-center gap-3 border-b border-gray-100">
              <button 
                onClick={() => setCurrentView('home')}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <h1 className="text-lg font-bold tracking-tight">쿠폰함</h1>
            </header>

            {/* Coupons Summary */}
            <section className="bg-white px-5 py-8 border-b border-gray-100">
              <p className="text-sm text-gray-500 mb-1">사용 가능한 쿠폰</p>
              <h2 className="text-3xl font-black text-indigo-600">6장</h2>
            </section>

            {/* Coupons List */}
            <section className="bg-white min-h-screen pb-10">
              <div className="flex gap-4 px-5 py-4 border-b border-gray-50">
                <button className="text-sm font-bold text-indigo-600 border-b-2 border-indigo-600 pb-1">미사용</button>
                <button className="text-sm font-medium text-gray-400 pb-1">사용완료/만료</button>
              </div>
              <div className="p-5 space-y-4">
                {COUPONS.map((coupon) => (
                  <motion.div 
                    key={coupon.id}
                    whileHover={{ scale: 1.02 }}
                    className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex"
                  >
                    <div className={`w-20 ${coupon.color} flex items-center justify-center border-r border-dashed border-gray-200 relative`}>
                      {coupon.icon}
                      {/* Ticket notches */}
                      <div className="absolute -top-2 -right-2 w-4 h-4 bg-white rounded-full border border-gray-100"></div>
                      <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-white rounded-full border border-gray-100"></div>
                    </div>
                    <div className="flex-1 p-4">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{coupon.type}</span>
                      <h4 className="text-sm font-bold mt-0.5">{coupon.title}</h4>
                      <div className="flex justify-between items-end mt-3">
                        <span className="text-[10px] text-gray-400">{coupon.expiry}</span>
                        <button className="px-3 py-1 bg-indigo-600 text-white text-[10px] font-bold rounded-lg">사용하기</button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 6. Bottom Tab Bar */}
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-[#000337] text-white px-3 py-2.5 flex items-center justify-between z-50 border-t border-white/5">
        <div className="flex items-center">
          <button className="flex flex-col items-center gap-1 px-2">
            <Menu className="w-7 h-7 stroke-[1.5]" />
            <span className="text-[14px] font-bold tracking-tight text-white">전체메뉴</span>
          </button>
          <div className="w-[1px] h-10 bg-white/10 mx-1"></div>
        </div>
        
        <div className="flex flex-1 justify-around items-center px-1">
          <button className="flex flex-col items-center px-2">
            <span className="text-[14px] font-bold text-white">홈</span>
          </button>
          
          <button className="flex flex-col items-center leading-[1.1] px-2">
            <span className="text-[14px] font-bold text-[#7c8db5]">관심</span>
            <span className="text-[14px] font-bold text-[#7c8db5]">종목</span>
          </button>
          
          <button className="flex flex-col items-center leading-[1.1] px-2">
            <span className="text-[14px] font-bold text-[#7c8db5]">주식</span>
            <span className="text-[14px] font-bold text-[#7c8db5]">현재가</span>
          </button>
          
          <button className="flex flex-col items-center leading-[1.1] px-2">
            <span className="text-[14px] font-bold text-[#7c8db5]">주식</span>
            <span className="text-[14px] font-bold text-[#7c8db5]">차트</span>
          </button>
          
          <button className="flex flex-col items-center leading-[1.1] px-2">
            <span className="text-[14px] font-bold text-[#7c8db5]">주식</span>
            <span className="text-[14px] font-bold text-[#7c8db5]">주문</span>
          </button>
        </div>

        <div className="flex items-center px-2">
          <button className="p-1">
            <ChevronUp className="w-8 h-8 text-white stroke-[2.5]" />
          </button>
        </div>
      </nav>
    </div>
  );
}
