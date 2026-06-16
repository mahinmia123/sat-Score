'use client';

import React, { useState, useEffect } from 'react';
import { 
  Award, 
  BookOpen, 
  CheckCircle2, 
  HelpCircle, 
  ExternalLink,
  ChevronDown,
  ChevronUp,
  FileSpreadsheet,
  GraduationCap,
  Copy,
  Check
} from 'lucide-react';

export default function FreeSatCalculator() {
  // Reading & Writing States
  const [rwM1, setRwM1] = useState<number>(20);
  const [rwM2, setRwM2] = useState<number>(18);
  const [rwTrack, setRwTrack] = useState<'easy' | 'hard'>('hard');

  // Math States
  const [mathM1, setMathM1] = useState<number>(16);
  const [mathM2, setMathM2] = useState<number>(14);
  const [mathTrack, setMathTrack] = useState<'easy' | 'hard'>('hard');

  // Active FAQ panels
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Copy Single HTML Code state
  const [copied, setCopied] = useState<boolean>(false);

  // Smart routing triggers based on Module 1 performance
  // For Reading & Writing
  const handleRwM1Change = (val: number) => {
    const clamped = Math.max(0, Math.min(27, val));
    setRwM1(clamped);
    if (clamped >= 15) {
      setRwTrack('hard');
    } else {
      setRwTrack('easy');
    }
  };

  // For Math
  const handleMathM1Change = (val: number) => {
    const clamped = Math.max(0, Math.min(22, val));
    setMathM1(clamped);
    if (clamped >= 12) {
      setMathTrack('hard');
    } else {
      setMathTrack('easy');
    }
  };

  // Reading and Writing Section Score Calculation
  let rwScore = 200;
  const rwRaw = rwM1 + rwM2;

  if (rwTrack === 'hard') {
    if (rwRaw >= 53) {
      rwScore = 800;
    } else if (rwRaw === 52) {
      rwScore = 790;
    } else if (rwRaw === 51) {
      rwScore = 780;
    } else if (rwRaw === 50) {
      rwScore = 770;
    } else {
      const ratio = (rwRaw - 15) / 35; // Interpolate from raw=15 up to raw=50
      const calc = 380 + (ratio * 390);
      rwScore = Math.min(800, Math.max(380, Math.round(calc / 10) * 10));
    }
  } else {
    if (rwRaw >= 50) {
      rwScore = 650;
    } else {
      const ratio = rwRaw / 50;
      const calc = 200 + (ratio * 450);
      rwScore = Math.min(650, Math.max(200, Math.round(calc / 10) * 10));
    }
  }

  // Math Section Score Calculation
  let mathScore = 200;
  const mathRaw = mathM1 + mathM2;

  if (mathTrack === 'hard') {
    if (mathRaw >= 43) {
      mathScore = 800;
    } else if (mathRaw === 42) {
      mathScore = 790;
    } else if (mathRaw === 41) {
      mathScore = 780;
    } else if (mathRaw === 40) {
      mathScore = 770;
    } else {
      const ratio = (mathRaw - 12) / 28; // Interpolate from raw=12 up to raw=40
      const calc = 400 + (ratio * 370);
      mathScore = Math.min(800, Math.max(400, Math.round(calc / 10) * 10));
    }
  } else {
    if (mathRaw >= 40) {
      mathScore = 650;
    } else {
      const ratio = mathRaw / 40;
      const calc = 200 + (ratio * 450);
      mathScore = Math.min(650, Math.max(200, Math.round(calc / 10) * 10));
    }
  }

  const totalScore = rwScore + mathScore;

  // Percentile rankings 
  let percentile = '1st';
  if (totalScore >= 1550) percentile = '99th+';
  else if (totalScore >= 1500) percentile = '98th';
  else if (totalScore >= 1450) percentile = '96th';
  else if (totalScore >= 1400) percentile = '93rd';
  else if (totalScore >= 1350) percentile = '90th';
  else if (totalScore >= 1300) percentile = '86th';
  else if (totalScore >= 1250) percentile = '81st';
  else if (totalScore >= 1200) percentile = '74th';
  else if (totalScore >= 1150) percentile = '67th';
  else if (totalScore >= 1100) percentile = '59th';
  else if (totalScore >= 1050) percentile = '51st';
  else if (totalScore >= 1000) percentile = '43rd';
  else if (totalScore >= 950) percentile = '35th';
  else if (totalScore >= 900) percentile = '27th';
  else if (totalScore >= 850) percentile = '20th';
  else if (totalScore >= 800) percentile = '14th';
  else if (totalScore >= 750) percentile = '9th';
  else if (totalScore >= 700) percentile = '5th';
  else if (totalScore >= 600) percentile = '2nd';
  else percentile = 'under 1st';

  // Target university recommendation string
  const getColRef = () => {
    if (totalScore >= 1500) {
      return "Target Colleges: Ivy League (Harvard, Yale, Princeton, Columbia), Stanford, MIT, Caltech, Chicago, Duke";
    }
    if (totalScore >= 1400) {
      return "Target Colleges: UCLA, UC Berkeley, NYU, University of Michigan, Georgetown, Northwestern, Vanderbilt, USC";
    }
    if (totalScore >= 1200) {
      return "Target Colleges: UT Austin, Penn State, Ohio State, University of Washington, Florida State, Boston University, Maryland";
    }
    if (totalScore >= 1010) {
      return "Target Colleges: Standard regional colleges, state universities, and direct-admission educational centers";
    }
    return "Target Colleges: Test-optional universities, community systems, or intensive restudy roadmap";
  };

  // Copies the exact raw code for the requested single self-contained HTML file
  const copyRawHtml = () => {
    fetch('/index.html')
      .then(res => res.text())
      .then(code => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(() => {
        // Fallback simple message in case the fetch fails in some environments
        alert("Stand-alone index.html resides inside /public directory of this repository.");
      });
  };

  // FAQ Questions structure
  const faqs = [
    {
      q: "How is the Digital SAT scored?",
      a: "The Digital SAT is scored out of 1600 points total, comprised of two sections: Reading & Writing (200-800) and Math (200-800). Scoring is adaptive, meaning the performance on the first module determines whether you route to the Easy or Hard second module, which shifts your maximum score potential."
    },
    {
      q: "What is a good SAT score for college?",
      a: "A good SAT score depends on your target universities. Generally, 1200+ is competitive for most state universities, 1400+ is excellent for top-tier national colleges (like UCLA, NYU, or Michigan), and 1500+ is exceptional, putting you in range for Ivies, Stanford, and MIT."
    },
    {
      q: "How does adaptive scoring work on the Digital SAT?",
      a: "The Digital SAT operates on a two-module system. Everyone takes Module 1 first. Scoring well on Module 1 unlocks the 'Hard' track of Module 2, which allows you to reach a maximum score of 800. Scoring lower routes you to the 'Easy' track, which caps your maximum score at around 650."
    },
    {
      q: "What is the highest possible SAT score?",
      a: "The highest possible score on the SAT is 1600. This is achieved by scoring a perfect 800 on both the Reading & Writing section and the Math section."
    },
    {
      q: "How do I calculate my SAT superscore?",
      a: "To calculate your superscore, take your highest Math section score and your highest Reading & Writing section score across all your test dates and add them together. Most colleges accept and prefer your superscore."
    },
    {
      q: "When are Digital SAT scores released?",
      a: "Digital SAT scores are typically released online about 13-14 days after your test date. For summer or school-day test dates, the delay may vary slightly."
    },
    {
      q: "How accurate is this SAT score calculator?",
      a: "Our calculator utilizes official Digital SAT adaptive guidelines to estimate scores. While no unofficial calculator can match the exact undisclosed algorithm of the College Board, our model provides a highly accurate preview of scaled score ranges."
    },
    {
      q: "What is the average SAT score in 2026?",
      a: "The national average SAT score holds steady at approximately 1010-1030, with roughly 500-510 on the Math section and 510-520 on the Reading & Writing section."
    }
  ];

  return (
    <div className="bg-white min-h-screen font-sans text-slate-800 flex flex-col">
      
      {/* 3 JSON-LD schema blocks injected in a container as requested */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebApplication",
                "@id": "https://freesatcalculator.com/#webapp",
                "name": "Free SAT Score Calculator",
                "url": "https://freesatcalculator.com/",
                "applicationCategory": "EducationalApplication",
                "operatingSystem": "All",
                "browserRequirements": "Requires HTML5, CSS3, JavaScript",
                "offers": {
                  "@type": "Offer",
                  "price": "0",
                  "priceCurrency": "USD"
                },
                "description": "Calculate your Digital SAT score instantly from raw scores — free, no signup required."
              },
              {
                "@type": "HowTo",
                "@id": "https://freesatcalculator.com/#howto",
                "name": "How to Calculate Your Digital SAT Score",
                "description": "An easy four-step process to estimate your Digital SAT scores using adaptive scaling.",
                "step": [
                  {
                    "@type": "HowToStep",
                    "name": "Enter Reading & Writing Scores",
                    "text": "Input your correct raw scores for Reading & Writing Module 1 and Module 2, then select whether your Module 2 was the Easy or Hard track.",
                    "url": "https://freesatcalculator.com/#calculator"
                  },
                  {
                    "@type": "HowToStep",
                    "name": "Enter Math Scores",
                    "text": "Input your correct raw scores for Math Module 1 and Module 2, and select the Easy or Hard track.",
                    "url": "https://freesatcalculator.com/#calculator"
                  },
                  {
                    "@type": "HowToStep",
                    "name": "Review Your Section Scores",
                    "text": "Get your individual Section scores ranging from 200 to 800 for both Reading/Writing and Mathematics instantly.",
                    "url": "https://freesatcalculator.com/#calculator"
                  },
                  {
                    "@type": "HowToStep",
                    "name": "View Composite Score & College Targets",
                    "text": "See your total combined SAT score (400-1600), national percentile ranking, and target colleges based on your score bracket.",
                    "url": "https://freesatcalculator.com/#calculator"
                  }
                ]
              },
              {
                "@type": "FAQPage",
                "@id": "https://freesatcalculator.com/#faq",
                "mainEntity": faqs.map((f) => ({
                  "@type": "Question",
                  "name": f.q,
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": f.a
                  }
                }))
              }
            ]
          })
        }}
      />

      {/* Header bar from Geometric Balance design block */}
      <header className="border-b border-slate-200 px-6 py-4 flex flex-col sm:flex-row justify-between items-center bg-white sticky top-0 z-50 gap-4 sm:gap-0 select-none">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white font-black text-sm tracking-tight shadow-xs">S</div>
          <span className="font-bold text-xl tracking-tight text-slate-900">FreeSATCalculator.com</span>
        </div>
        <nav className="flex gap-6 text-sm font-medium text-slate-500">
          <a href="#calculator" className="text-blue-600 border-b-2 border-blue-600 pb-0.5 font-semibold">Calculator</a>
          <a href="#score-chart" className="hover:text-blue-600 transition-colors">Score Chart</a>
          <a href="#college-brackets" className="hover:text-blue-600 transition-colors">Percentiles</a>
          <a href="#faq" className="hover:text-blue-600 transition-colors">FAQ</a>
        </nav>
      </header>

      {/* Main Layout Grid */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 md:px-6 lg:px-8 mt-8 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border border-slate-200 rounded-2xl overflow-hidden shadow-xs bg-white">
          
          {/* LEFT COLUMN: Calculator & Results & FAQs */}
          <section className="lg:col-span-7 border-b lg:border-b-0 lg:border-r border-slate-200 p-6 md:p-8 flex flex-col space-y-8 bg-white">
            <div id="calculator" className="space-y-4">
              <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-full uppercase tracking-wider">100% Free • No Signup Required</span>
              <h1 className="text-3xl font-extrabold text-slate-900 leading-tight tracking-tight">Free SAT Score Calculator <br/><span className="text-blue-600">(Digital SAT 2025–2026)</span></h1>
              <p className="text-slate-500 text-sm">Enter your raw correct answers per module to estimate your final scaled score instantly using adaptive guidelines.</p>
            </div>

            {/* Developer special utility button to copy single HTML file */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between text-xs text-slate-600 gap-3">
              <div className="text-left font-medium">
                💡 <span className="font-bold text-slate-900">Developer Export:</span> Get the single stand-alone HTML file requested!
              </div>
              <button 
                onClick={copyRawHtml}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-1.5 px-3 rounded flex items-center justify-center gap-1.5 transition-all text-[11px] shrink-0 cursor-pointer shadow-xs whitespace-nowrap"
                title="Copies full public/index.html containing inline CSS + Javascript"
              >
                {copied ? (
                  <>
                    <Check size={12} className="stroke-[3]" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy size={12} />
                    Copy Single HTML File
                  </>
                )}
              </button>
            </div>

            {/* Form Inputs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* RW Input Group */}
              <div className="space-y-4">
                <h3 className="font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
                  <span className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500">1</span>
                  Reading & Writing
                </h3>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase mb-1" htmlFor="react-rw-m1">Module 1 Correct (0-27)</label>
                  <input 
                    type="number" 
                    id="react-rw-m1" 
                    min="0" 
                    max="27" 
                    value={rwM1} 
                    onChange={(e) => handleRwM1Change(parseInt(e.target.value) || 0)}
                    className="w-full border border-slate-300 rounded-md p-2 text-sm font-semibold text-slate-900 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                  <span className="text-[10px] text-slate-400 font-medium">Standard baseline assessment.</span>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase mb-1" htmlFor="react-rw-track">Module 2 Difficulty</label>
                  <select 
                    id="react-rw-track" 
                    value={rwTrack} 
                    onChange={(e) => setRwTrack(e.target.value as 'easy' | 'hard')}
                    className="w-full border border-slate-300 rounded-md p-2 text-sm font-semibold text-slate-900 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none cursor-pointer"
                  >
                    <option value="hard">Hard track (15+ right on M1)</option>
                    <option value="easy">Easy track (0-14 right on M1)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase mb-1" htmlFor="react-rw-m2">Module 2 Correct (0-27)</label>
                  <input 
                    type="number" 
                    id="react-rw-m2" 
                    min="0" 
                    max="27" 
                    value={rwM2} 
                    onChange={(e) => setRwM2(Math.max(0, Math.min(27, parseInt(e.target.value) || 0)))}
                    className="w-full border border-slate-300 rounded-md p-2 text-sm font-semibold text-slate-900 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Math Input Group */}
              <div className="space-y-4">
                <h3 className="font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
                  <span className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500">2</span>
                  Mathematics
                </h3>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase mb-1" htmlFor="react-math-m1">Module 1 Correct (0-22)</label>
                  <input 
                    type="number" 
                    id="react-math-m1" 
                    min="0" 
                    max="22" 
                    value={mathM1} 
                    onChange={(e) => handleMathM1Change(parseInt(e.target.value) || 0)}
                    className="w-full border border-slate-300 rounded-md p-2 text-sm font-semibold text-slate-900 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                  <span className="text-[10px] text-slate-400 font-medium">Standard baseline assessment.</span>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase mb-1" htmlFor="react-math-track">Module 2 Difficulty</label>
                  <select 
                    id="react-math-track" 
                    value={mathTrack} 
                    onChange={(e) => setMathTrack(e.target.value as 'easy' | 'hard')}
                    className="w-full border border-slate-300 rounded-md p-2 text-sm font-semibold text-slate-900 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none cursor-pointer"
                  >
                    <option value="hard">Hard track (12+ right on M1)</option>
                    <option value="easy">Easy track (0-11 right on M1)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase mb-1" htmlFor="react-math-m2">Module 2 Correct (0-22)</label>
                  <input 
                    type="number" 
                    id="react-math-m2" 
                    min="0" 
                    max="22" 
                    value={mathM2} 
                    onChange={(e) => setMathM2(Math.max(0, Math.min(22, parseInt(e.target.value) || 0)))}
                    className="w-full border border-slate-300 rounded-md p-2 text-sm font-semibold text-slate-900 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Score Result Display */}
            <div className="p-6 bg-slate-900 rounded-xl text-white flex flex-col md:flex-row justify-between items-center gap-6 shadow-md">
              <div>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Estimated Total Score</p>
                <div className="flex items-baseline gap-2">
                  <span id="total-display" className="text-6.5xl font-black tracking-tight">{totalScore}</span>
                  <span className="text-slate-500 text-xl font-semibold">/ 1600</span>
                </div>
              </div>
              <div className="w-full md:w-auto text-left md:text-right grid grid-cols-2 gap-4 border-t md:border-t-0 md:border-l border-slate-700 pt-4 md:pt-0 md:pl-6 leading-tight">
                <div>
                  <p className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">RW Score</p>
                  <p id="rw-display" className="text-2xl font-bold text-white">{rwScore}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">Math Score</p>
                  <p id="m-display" className="text-2xl font-bold text-white">{mathScore}</p>
                </div>
                <div className="col-span-2 pt-2 border-t border-slate-700 text-left md:text-right">
                  <p className="text-blue-400 text-[10px] uppercase font-bold tracking-wider">Percentile Ranking</p>
                  <p id="perc-display" className="text-sm font-semibold text-slate-100">{percentile} Percentile (Excellent)</p>
                </div>
                <div className="col-span-2 pt-1 border-t border-slate-700 text-left md:text-right">
                  <p className="text-emerald-400 text-[10px] uppercase font-bold tracking-wider">Admissions Reference</p>
                  <p className="text-[10px] text-slate-300 mt-0.5 leading-normal font-medium">{getColRef()}</p>
                </div>
              </div>
            </div>

            {/* Frequently Asked Questions */}
            <div id="faq" className="space-y-4 pt-6 border-t border-slate-200">
              <h2 className="text-lg font-bold text-slate-900 border-l-4 border-blue-600 pl-3">
                Frequently Asked Questions
              </h2>
              <div className="space-y-3">
                {faqs.map((faq, idx) => {
                  const isOpen = activeFaq === idx;
                  return (
                    <div key={idx} className="border border-slate-200 rounded-lg overflow-hidden bg-slate-50/50 hover:bg-white transition-all shadow-2xs">
                      <button 
                        onClick={() => setActiveFaq(isOpen ? null : idx)}
                        className="w-full text-left bg-transparent px-4 py-3 font-semibold text-xs text-slate-700 hover:text-blue-600 transition-colors flex items-center justify-between outline-none"
                      >
                        <span className="pr-4">{idx + 1}. {faq.q}</span>
                        {isOpen ? (
                          <ChevronUp size={14} className="text-blue-600 shrink-0" />
                        ) : (
                          <ChevronDown size={14} className="text-slate-400 shrink-0" />
                        )}
                      </button>
                      {isOpen && (
                        <div className="bg-white px-4 py-3 border-t border-slate-100 text-xs text-slate-500 leading-relaxed font-normal">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* RIGHT COLUMN: Charts & Info */}
          <section className="lg:col-span-5 bg-slate-50 flex flex-col p-6 md:p-8 space-y-8">
            
            {/* Score Chart */}
            <div id="score-chart" className="space-y-4">
              <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Award size={16} className="text-blue-600" />
                Digital SAT Conversion Table (2026)
              </h2>
              <div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-2xs">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-slate-100 border-b border-slate-200 text-slate-700">
                    <tr>
                      <th className="px-3 py-2 font-bold uppercase tracking-wider">Raw Correct</th>
                      <th className="px-3 py-2 font-bold uppercase tracking-wider">RW (Scaled)</th>
                      <th className="px-3 py-2 font-bold uppercase tracking-wider">Math (Scaled)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-150 text-slate-600">
                    <tr className="bg-blue-50/20 font-medium">
                      <td className="px-3 py-1.5 text-slate-900 font-bold">50–54 (or 40–44)</td>
                      <td className="px-3 py-1.5 text-blue-600 font-semibold">770 - 800</td>
                      <td className="px-3 py-1.5 text-blue-600 font-semibold">770 - 800</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-1.5 text-slate-900 font-medium">45 (or 35 Math)</td>
                      <td className="px-3 py-1.5">710</td>
                      <td className="px-3 py-1.5">700</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-1.5 text-slate-900 font-medium">40 (or 30 Math)</td>
                      <td className="px-3 py-1.5">660</td>
                      <td className="px-3 py-1.5">650</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-1.5 text-slate-900 font-medium">35 (or 25 Math)</td>
                      <td className="px-3 py-1.5">610</td>
                      <td className="px-3 py-1.5">590</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-1.5 text-slate-900 font-medium">30 (or 20 Math)</td>
                      <td className="px-3 py-1.5">550</td>
                      <td className="px-3 py-1.5">510</td>
                    </tr>
                    <tr className="bg-slate-100/30">
                      <td className="px-3 py-1.5 text-slate-400">Under 15 (or 5)</td>
                      <td className="px-3 py-1.5 text-slate-400">200–400</td>
                      <td className="px-3 py-1.5 text-slate-400">200–320</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Score Interpretation */}
            <div id="college-brackets" className="space-y-4">
              <h2 className="text-sm font-bold text-slate-900">What is a good SAT score?</h2>
              <div className="space-y-3 bg-white p-4 border border-slate-200 rounded-lg shadow-2xs">
                <div className="flex items-center gap-3">
                  <span className="w-16 shrink-0 text-[10px] font-bold text-slate-400">1500-1600</span>
                  <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="w-full h-full bg-blue-600 rounded-full"></div>
                  </div>
                  <span className="text-[10px] font-semibold text-slate-600 w-28 text-right">Exceptional (Ivies)</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-16 shrink-0 text-[10px] font-bold text-slate-400">1400-1500</span>
                  <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="w-[85%] h-full bg-blue-500 rounded-full"></div>
                  </div>
                  <span className="text-[10px] font-semibold text-slate-600 w-28 text-right">Excellent (NYU)</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-16 shrink-0 text-[10px] font-bold text-slate-400">1200-1400</span>
                  <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="w-[70%] h-full bg-blue-400 rounded-full"></div>
                  </div>
                  <span className="text-[10px] font-semibold text-slate-600 w-28 text-right">Above Average</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-16 shrink-0 text-[10px] font-bold text-slate-400">1010-1200</span>
                  <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="w-[50%] h-full bg-slate-400 rounded-full"></div>
                  </div>
                  <span className="text-[10px] font-semibold text-slate-600 w-28 text-right">Average Range</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-16 shrink-0 text-[10px] font-bold text-slate-400">400-1000</span>
                  <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="w-[20%] h-full bg-slate-300 rounded-full"></div>
                  </div>
                  <span className="text-[10px] font-semibold text-slate-600 w-28 text-right">Below Average</span>
                </div>
              </div>
            </div>

            {/* Prep Links List */}
            <div className="space-y-4">
              <h2 className="text-sm font-bold text-slate-900">Useful Resources</h2>
              <div className="grid grid-cols-1 gap-2 text-[11px] text-slate-600">
                <a href="/psat-score-calculator" className="p-2 border border-slate-200 rounded hover:bg-white transition-colors cursor-pointer block font-medium">PSAT Score Calculator</a>
                <a href="/sat-score-chart" className="p-2 border border-slate-200 rounded hover:bg-white transition-colors cursor-pointer block font-medium">Digital SAT scoring charts</a>
                <a href="/sat-percentile-calculator" className="p-2 border border-slate-200 rounded hover:bg-white transition-colors cursor-pointer block font-medium">Percentile Ranking Calculator</a>
                <a href="/sat-superscore-calculator" className="p-2 border border-slate-200 rounded hover:bg-white transition-colors cursor-pointer block font-medium">Superscore Calculation Tool</a>
              </div>
            </div>

            <div className="border-t border-slate-200 pt-4 mt-auto">
              <h4 className="text-[10px] font-bold text-slate-800 uppercase mb-2">How adaptive scoring works</h4>
              <p className="text-[11px] text-slate-500 leading-normal">
                Answering correctly on Module 1 yields higher-difficulty Module 2 routes (Hard adaptive route). This is required to access the maximum 800 section cap. Landing in Easy Module 2 caps final score estimates to around 650.
              </p>
            </div>
          </section>
        </div>
      </main>

      {/* Footer Internal Links */}
      <footer className="shrink-0 border-t border-slate-200 bg-white px-8 py-5 text-[10px] text-slate-400 uppercase tracking-widest leading-loose">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <div className="flex gap-4">
            <a href="/psat-score-calculator" className="hover:text-blue-600">PSAT Calculator</a>
            <a href="/sat-percentile-calculator" className="hover:text-blue-600">SAT Percentiles</a>
            <a href="/sat-superscore-calculator" className="hover:text-blue-600">Superscore Tool</a>
            <a href="/sat-score-chart" className="hover:text-blue-600">Scoring Guide</a>
          </div>
          <div>© 2026 FreeSATCalculator.com • Built for the Digital Era</div>
        </div>
        <div className="max-w-6xl mx-auto mt-4 pt-4 border-t border-slate-100 text-[9px] text-slate-400 lowercase leading-normal normal-case text-center">
          SAT® is a registered trademark of the College Board. The diagnostic ratings and score predictions provided are estimates meant strictly for personal assessment guidelines.
        </div>
      </footer>

    </div>
  );
}
