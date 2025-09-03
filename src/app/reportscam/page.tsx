'use client';
import { motion, AnimatePresence } from "framer-motion";
import Head from "next/head";
import Image from "next/image";
import { useState } from 'react';

export default function ReportScamPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
const [activeCard, setActiveCard] = useState<number | null>(null);

  const handleDiscordRedirect = () => {
    setIsSubmitting(true);
    window.open('https://discord.gg/ZyaZpCXVrP', '_blank');
    
    setTimeout(() => {
      setSubmitSuccess(true);
      setIsSubmitting(false);
    }, 2000);
  };

  const cardData = [
    {
      id: 1,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: "How We Identify Scams",
      hoverTitle: "Identification Methods",
      description: "Hover to see our methods",
      content: (
        <ul className="space-y-2">
          <li className="flex items-start">
            <span className="text-green-400 mr-2 mt-1 text-xs">✓</span>
            <span className="text-sm text-gray-300">Community reports from verified sources</span>
          </li>
          <li className="flex items-start">
            <span className="text-green-400 mr-2 mt-1 text-xs">✓</span>
            <span className="text-sm text-gray-300">Protecting Injective Fam</span>
          </li>
          <li className="flex items-start">
            <span className="text-green-400 mr-2 mt-1 text-xs">✓</span>
            <span className="text-sm text-gray-300">Team disappearance verification</span>
          </li>
          <li className="flex items-start">
            <span className="text-green-400 mr-2 mt-1 text-xs">✓</span>
            <span className="text-sm text-gray-300">Confirmed stolen funds reports</span>
          </li>
        </ul>
      )
    },
    {
      id: 2,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Severity Levels",
      hoverTitle: "Risk Levels",
      description: "Hover to understand risks",
      content: (
        <div className="space-y-3">
          <div className="flex items-center">
            <span className="w-3 h-3 rounded-full bg-red-500 mr-3"></span>
            <div>
              <div className="font-medium text-sm text-white">High Risk</div>
              <div className="text-gray-400 text-xs">Confirmed malicious activity</div>
            </div>
          </div>
          <div className="flex items-center">
            <span className="w-3 h-3 rounded-full bg-yellow-500 mr-3"></span>
            <div>
              <div className="font-medium text-sm text-white">Medium Risk</div>
              <div className="text-gray-400 text-xs">Suspicious behavior</div>
            </div>
          </div>
          <div className="flex items-center">
            <span className="w-3 h-3 rounded-full bg-green-500 mr-3"></span>
            <div>
              <div className="font-medium text-sm text-white">Low Risk</div>
              <div className="text-gray-400 text-xs">Potential risk</div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 3,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 极 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      ),
      title: "How to Report",
      hoverTitle: "Report Scams",
      description: "Hover for reporting process",
      content: (
        <ul className="space-y-2 text-sm">
          <li className="flex items-start">
            <span className="text-blue-400 mr-2">•</span>
            <span className="text-gray-300">Join our Discord community</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-400 mr-2">•</span>
            <span className="text-gray-300">Submit in #report-scam channel</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-400 mr-2">•</span>
            <span className="text-gray-300">Include contract addresses</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-400 mr-2">•</span>
            <span className="text-gray-300">Our team will review</span>
          </li>
        </ul>
      )
    },
    {
      id: 4,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Disclaimer",
      hoverTitle: "Important Notice",
      description: "Hover for important info",
      content: (
        <ul className="space-y-2 text-sm">
          <li className="flex items-start">
            <span className="text-yellow-400 mr-2">•</span>
            <span className="text-gray-300">Always do your own research (DYOR)</span>
          </li>
          <li className="flex items-start">
            <span className="text-yellow-400 mr-2">•</span>
            <span className="text-gray-300">Not financial advice</span>
          </li>
          <li className="flex items-start">
            <span className="text-yellow-400 mr-2">•</span>
            <span className="text-gray-300">Information may not be complete</span>
          </li>
          <li className="flex items-start">
            <span className="text-yellow-400 mr-2">•</span>
            <span className="text-gray-300">Projects may appeal their listing</span>
          </li>
        </ul>
      )
    }
  ];

  return (
    <>
      <Head>
        <title>Pedro | Report Injective Scam</title>
        <meta name="description" content="Report suspicious projects or scams on Injective" />
        <meta property="og:image" content="/pedro_logo4.png" />
      </Head>

      <div className="min-h-screen bg-black text-white overflow-hidden font-mono selection:bg-white selection:text-black">
        
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0">
            <Image
              src="/wallpaper1.webp"
              alt="Background texture"
              layout="fill"
              objectFit="cover"
              className="opacity-40 mix-blend-overlay"
              priority
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80"></div>
        </div>

        <section className="flex items-center justify-center pt-10 text-center relative overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="px-6 max-w-4xl relative z-10"
          >
            <motion.h1
              className="text-4xl md:text-7xl font-bold mb-8 text-white bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Report Scam
            </motion.h1>
            
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 0.2, duration: 1.2, ease: "circOut" }}
              className="h-px w-full bg-gradient-to-r from-transparent via-white to-transparent mb-12"
            />
          </motion.div>
        </section>

        <section className="px-4 max-w-[1500px] mx-auto pb-16 relative z-10">
          <AnimatePresence mode="wait">
            {submitSuccess ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-gradient-to-br from-gray-900/70 to-gray-800/50 border border-gray-700 rounded-2xl p-8 text-center backdrop-blur-sm"
              >
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <svg className="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </motion.div>
                <h3 className="text-2xl font-bold mb-4 text-white">Check Pedro Discord Server!</h3>
                <p className="mb-4 text-gray-300">Thank you for helping to protect the Injective community.</p>
                <p className="mb-6 text-sm text-gray-400">You can continue the conversation in our Discord server.</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSubmitSuccess(false)}
                  className="px-6 py-2 bg-gray-800 hover:bg-gray-700 rounded-xl transition-colors text-white border border-gray-600"
                >
                  Back
                </motion.button>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-gradient-to-br from-black/70 to-gray-900/70 border border-white/20 rounded-2xl p-6 md:p-8 backdrop-blur-sm"
              >
                <div className="mb-8 text-center">
                  <motion.p 
                    className="text-gray-300 max-w-[1500px] mx-auto"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    Help protect the Injective community by reporting suspicious projects or scams.
                  </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {cardData.map((card) => (
                    <motion.div 
                      key={card.id}
                      className="group relative bg-gradient-to-br from-gray-900/20 to-gray-800/10 rounded-xl p-1 h-48 cursor-pointer border border-gray-700/30"
                      whileHover={{ y: -5 }}
                      onHoverStart={() => setActiveCard(card.id)}
                      onHoverEnd={() => setActiveCard(null)}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/70 to-gray-800/50 rounded-xl group-hover:opacity-0 transition-opacity duration-300 flex flex-col items-center justify-center p-6">
                        <div className="bg-white/10 p-3 rounded-lg mb-4 backdrop-blur-sm">
                          {card.icon}
                        </div>
                        <h3 className="text-lg font-bold text-center mb-2">{card.title}</h3>
                        <p className="text-gray-400 text-center text-sm">{card.description}</p>
                      </div>
                      
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-5 flex flex-col justify-center">
                        <h3 className="text-lg font-bold mb-4 text-white flex items-center">
                          {card.icon}
                          <span className="ml-2">{card.hoverTitle}</span>
                        </h3>
                        {card.content}
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <motion.div 
                    className="group relative bg-gradient-to-br from-gray-900/20 to-gray-800/10 rounded-xl p-1 h-48 cursor-pointer border border-gray-700/30"
                    whileHover={{ y: -5 }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-900/70 to-gray-800/50 rounded-xl group-hover:opacity-0 transition-opacity duration-300 flex flex-col items-center justify-center p-6">
                      <div className="bg-white/10 p-3 rounded-lg mb-4 backdrop-blur-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-bold text-center mb-2 text-white">Submission Process</h3>
                      <p className="text-gray-400 text-center text-sm">Hover for details</p>
                    </div>
                    
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-5 flex flex-col justify-center">
                      <h3 className="text-lg font-bold mb-4 text-white flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        How to Report
                      </h3>
                      <ol className="list-decimal list-inside space-y-2 text-sm text-gray-300">
                        <li>Click the Discord button below</li>
                        <li>Join our server</li>
                        <li>Navigate to #report-scam channel</li>
                        <li>Use the form to submit your report</li>
                      </ol>
                    </div>
                  </motion.div>

                  <motion.div 
                    className="group relative bg-gradient-to-br from-gray-900/20 to-gray-800/10 rounded-xl p-1 h-48 cursor-pointer border border-gray-700/30"
                    whileHover={{ y: -5 }}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-900/70 to-gray-800/50 rounded-xl group-hover:opacity-0 transition-opacity duration-300 flex flex-col items-center justify-center p-6">
                      <div className="bg-white/10 p-3 rounded-lg mb-4 backdrop-blur-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-bold text-center mb-2 text-white">What to Include</h3>
                      <p className="text-gray-400 text-center text-sm">Hover for details</p>
                    </div>
                    
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-5 flex flex-col justify-center">
                      <h3 className="text-lg font-bold mb-4 text-white flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Evidence Needed
                      </h3>
                      <ul className="space-y-2 text-sm text-gray-300">
                        <li className="flex items-start">
                          <span className="text-blue-400 mr-2 mt-1 text-xs">✓</span>
                          <span>Contract addresses</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-blue-400 mr-2 mt-1 text-xs">✓</span>
                          <span>Transaction hashes</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-blue-400 mr-2 mt-1 text-xs">✓</span>
                          <span>Screenshots</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-blue-400 mr-2 mt-1 text-xs">✓</span>
                          <span>Project details</span>
                        </li>
                      </ul>
                    </div>
                  </motion.div>
                </div>

                <div className="text-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleDiscordRedirect}
                    disabled={isSubmitting}
                    className={`px-8 py-4 rounded-xl font-medium text-lg flex items-center justify-center mx-auto ${
                      isSubmitting 
                        ? 'bg-gray-700 cursor-not-allowed' 
                        : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg'
                    } transition-all duration-300`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Redirecting to Discord...
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19.27 5.33C17.94 4.71 16.5 4.26 15 4a.09.09 0 0 0-.07.03c-.18.33-.39.76-.53 1.09a16.09 16.09 0 0 0-4.8 0c-.14-.34-.35-.76-.54-1.09c-.01-.02-.04-.03-.07-.03c-1.5.26-2.93.71-4.27 1.33c-.01 0-.02.01-.03.02c-2.72 4.07-3.47 8.03-3.1 11.95c0 .02.01.04.03.05c1.8 1.32 3.53 2.12 5.24 2.65c.03.01.06 0 .07-.02c.4-.55.76-1.13 1.07-1.74c.02-.04 0-.08-.04-.09c-.57-.22-1.11-.48-1.64-.78c-.04-.02-.04-.08-.01-.11c.11-.08.22-.17.33-.25c.02-.02.05-.02.07-.01c3.44 1.57 7.15 1.57 10.55 0c.02-.01.05-.01.07.01c.11.09.22.17.33.26c.04.03.04.09-.01.11c-.52.31-1.07.56-1.64.78c-.04.01-.05.06-.04.09c.32.61.68 1.19 1.07 1.74c.03.01.06.02.09.01c1.72-.53 3.45-1.33 5.25-2.65c.02-.01.03-.03.03-.05c.44-4.53-.73-8.46-3.1-11.95c-.01-.01-.02-.02-.04-.02zM8.52 14.91c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.84 2.12-1.89 2.12zm6.97 0c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.83 2.12-1.89 2.12z"/>
                        </svg>
                        Submit Report via Discord
                      </span>
                    )}
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </div>
    </>
  );
}