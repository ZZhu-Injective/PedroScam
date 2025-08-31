'use client';
import { motion } from "framer-motion";
import Head from "next/head";
import Image from "next/image";
import { useState } from 'react';

export default function ReportScamPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleDiscordRedirect = () => {
    setIsSubmitting(true);
    // Open Discord in a new tab
    window.open('https://discord.gg/your-pedro-server-invite', '_blank');
    
    // Simulate submission process
    setTimeout(() => {
      setSubmitSuccess(true);
      setIsSubmitting(false);
    }, 2000);
  };

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
        </div>

        <section className="flex items-center justify-center pt-10 text-center relative overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="px-6 max-w-4xl relative z-10"
          >
            <motion.h1
              className="text-4xl md:text-7xl font-bold mb-8 text-white"
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

        <section className="px-4 max-w-[1500px] mx-auto pb-16">
          {submitSuccess ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-900/20 border border-gray-700 rounded-2xl p-8 text-center"
            >
              <h3 className="text-2xl font-bold mb-4 text-white">Report Submitted!</h3>
              <p className="mb-4 text-gray-300">Thank you for helping protect the Injective community. Our team will review your submission.</p>
              <p className="mb-6 text-sm text-gray-400">You can continue the conversation in our Discord server.</p>
              <button
                onClick={() => setSubmitSuccess(false)}
                className="px-6 py-2 bg-gray-800 hover:bg-gray-700 rounded-xl transition-colors text-white"
              >
                Back to Report Page
              </button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-black/50 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-sm"
            >
              <div className="mb-8 text-center">
                <h2 className="text-3xl font-bold mb-4 text-white">Report a Scam Project</h2>
                <p className="text-gray-300">
                  Help protect the Injective community by reporting suspicious projects or scams.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="group relative bg-gradient-to-br from-gray-900/20 to-gray-800/10 rounded-xl p-1 h-48 cursor-pointer">
                  <div className="absolute inset-0 bg-black/70 rounded-xl group-hover:opacity-0 transition-opacity duration-300 flex flex-col items-center justify-center p-6">
                    <div className="bg-gray-700/20 p-3 rounded-lg mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                </div>

                <div className="group relative bg-gradient-to-br from-gray-900/20 to-gray-800/10 rounded-xl p-1 h-48 cursor-pointer">
                  <div className="absolute inset-0 bg-black/70 rounded-xl group-hover:opacity-0 transition-opacity duration-300 flex flex-col items-center justify-center p-6">
                    <div className="bg-gray-700/20 p-3 rounded-lg mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                        <span className="text-white mr-2 mt-1 text-xs">✓</span>
                        <span>Contract addresses</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-white mr-2 mt-1 text-xs">✓</span>
                        <span>Transaction hashes</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-white mr-2 mt-1 text-xs">✓</span>
                        <span>Screenshots</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-white mr-2 mt-1 text-xs">✓</span>
                        <span>Project details</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <button
                  onClick={handleDiscordRedirect}
                  disabled={isSubmitting}
                  className={`px-8 py-4 rounded-xl font-medium text-lg flex items-center justify-center mx-auto ${
                    isSubmitting 
                      ? 'bg-gray-700 cursor-not-allowed' 
                      : 'bg-white hover:bg-gray-200 text-black'
                  } transition-colors`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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
                </button>

                <p className="mt-6 text-sm text-gray-400">
                  Don't have Discord? <a href="https://discord.com/download" className="text-white hover:underline">Download it here</a>
                </p>
              </div>
            </motion.div>
          )}
        </section>

        <section className="px-4 max-w-[1500px] mx-auto pb-16">
          <div className="bg-black/50 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
            <h2 className="text-2xl font-bold mb-8 text-center text-white">What to Report</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-bold mb-4 text-white flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  Common Scam Types
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start p-3 bg-gray-900/50 rounded-lg border border-gray-700">
                    <span className="text-white mr-3 mt-0.5">•</span>
                    <span className="text-gray-300">Rug pulls (projects that suddenly disappear with funds)</span>
                  </li>
                  <li className="flex items-start p-3 bg-gray-900/50 rounded-lg border border-gray-700">
                    <span className="text-white mr-3 mt-0.5">•</span>
                    <span className="text-gray-300">Phishing sites impersonating legitimate projects</span>
                  </li>
                  <li className="flex items-start p-3 bg-gray-900/50 rounded-lg border border-gray-700">
                    <span className="text-white mr-3 mt-0.5">•</span>
                    <span className="text-gray-300">Malicious smart contracts with hidden functions</span>
                  </li>
                  <li className="flex items-start p-3 bg-gray-900/50 rounded-lg border border-gray-700">
                    <span className="text-white mr-3 mt-0.5">•</span>
                    <span className="text-gray-300">Fake airdrops or token giveaways</span>
                  </li>
                  <li className="flex items-start p-3 bg-gray-900/50 rounded-lg border border-gray-700">
                    <span className="text-white mr-3 mt-0.5">•</span>
                    <span className="text-gray-300">Ponzi schemes or unsustainable yield promises</span>
                  </li>
                  <li className="flex items-start p-3 bg-gray-900/50 rounded-lg border border-gray-700">
                    <span className="text-white mr-3 mt-0.5">•</span>
                    <span className="text-gray-300">Fake KYC requests or impersonation scams</span>
                  </li>
                  <li className="flex items-start p-3 bg-gray-900/50 rounded-lg border border-gray-700">
                    <span className="text-white mr-3 mt-0.5">•</span>
                    <span className="text-gray-300">Fake support accounts on social media</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-4 text-white flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  How to Provide Good Evidence
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start p-3 bg-gray-900/50 rounded-lg border border-gray-700">
                    <span className="text-white mr-3 mt-0.5">✓</span>
                    <span className="text-gray-300">Transaction hashes showing fund movement</span>
                  </li>
                  <li className="flex items-start p-3 bg-gray-900/50 rounded-lg border border-gray-700">
                    <span className="text-white mr-3 mt-0.5">✓</span>
                    <span className="text-gray-300">Screenshots of suspicious messages or promises</span>
                  </li>
                  <li className="flex items-start p-3 bg-gray-900/50 rounded-lg border border-gray-700">
                    <span className="text-white mr-3 mt-0.5">✓</span>
                    <span className="text-gray-300">Links to social media posts or websites</span>
                  </li>
                  <li className="flex items-start p-3 bg-gray-900/50 rounded-lg border border-gray-700">
                    <span className="text-white mr-3 mt-0.5">✓</span>
                    <span className="text-gray-300">Contract addresses and verification links</span>
                  </li>
                  <li className="flex items-start p-3 bg-gray-900/50 rounded-lg border border-gray-700">
                    <span className="text-white mr-3 mt-0.5">✓</span>
                    <span className="text-gray-300">Detailed description of your experience</span>
                  </li>
                  <li className="flex items-start p-3 bg-gray-900/50 rounded-lg border border-gray-700">
                    <span className="text-white mr-3 mt-0.5">✓</span>
                    <span className="text-gray-300">Wallet addresses involved in the scam</span>
                  </li>
                  <li className="flex items-start p-3 bg-gray-900/50 rounded-lg border border-gray-700">
                    <span className="text-white mr-3 mt-0.5">✓</span>
                    <span className="text-gray-300">Timeline of events with approximate dates</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}