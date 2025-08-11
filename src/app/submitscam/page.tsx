'use client';
import { motion } from "framer-motion";
import Head from "next/head";
import { useState } from 'react';
import Image from "next/image";

type FormData = {
  projectName: string;
  projectUrl: string;
  contractAddress: string;
  description: string;
  evidence: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  reporterEmail?: string;
  socialLinks?: string;
  agreeTerms: boolean;
};

export default function ReportScamPage() {
  const [formData, setFormData] = useState<FormData>({
    projectName: '',
    projectUrl: '',
    contractAddress: '',
    description: '',
    evidence: '',
    severity: 'medium',
    agreeTerms: false
  });
  
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const validateForm = () => {
    const newErrors: Partial<FormData> = {};
    
    if (!formData.projectName.trim()) {
      newErrors.projectName = 'Project name is required';
    }
    
    if (!formData.contractAddress.trim()) {
      newErrors.contractAddress = 'Contract address is required';
    } else if (!/^(inj1|0x)[a-zA-Z0-9]+$/.test(formData.contractAddress)) {
      newErrors.contractAddress = 'Please enter a valid Injective address (inj1...) or EVM address (0x...)';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.length < 50) {
      newErrors.description = 'Please provide at least 50 characters of details';
    }
    
    if (!formData.evidence.trim()) {
      newErrors.evidence = 'Evidence is required';
    } else if (formData.evidence.length < 30) {
      newErrors.evidence = 'Please provide at least 30 characters of evidence';
    }
    
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = true;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Form submitted:', { ...formData, attachments: selectedFiles });
      setSubmitSuccess(true);
      setFormData({
        projectName: '',
        projectUrl: '',
        contractAddress: '',
        description: '',
        evidence: '',
        severity: 'medium',
        agreeTerms: false
      });
      setSelectedFiles([]);
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles(Array.from(e.target.files));
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
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

        <section className="px-4 max-w-3xl mx-auto pb-16">
          {submitSuccess ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-green-900/20 border border-green-700 rounded-2xl p-8 text-center"
            >
              <h3 className="text-2xl font-bold mb-4 text-green-400">Report Submitted!</h3>
              <p className="mb-6">Thank you for helping protect the Injective community. Our team will review your submission.</p>
              <button
                onClick={() => setSubmitSuccess(false)}
                className="px-6 py-2 bg-green-900/50 hover:bg-green-900/70 rounded-xl transition-colors"
              >
                Submit Another Report
              </button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-black/50 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-sm"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Project Name Field */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Project Name *
                  </label>
                  <input
                    name="projectName"
                    value={formData.projectName}
                    onChange={handleChange}
                    type="text"
                    placeholder="Enter the scam project name"
                    className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-white/50"
                  />
                  {errors.projectName && (
                    <p className="mt-1 text-sm text-red-400">{errors.projectName}</p>
                  )}
                </div>

                {/* Project URL Field */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Project Website/URL
                  </label>
                  <input
                    name="projectUrl"
                    value={formData.projectUrl}
                    onChange={handleChange}
                    type="url"
                    placeholder="https://"
                    className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-white/50"
                  />
                </div>

                {/* Contract Address Field */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Contract Address(es) *
                  </label>
                  <input
                    name="contractAddress"
                    value={formData.contractAddress}
                    onChange={handleChange}
                    type="text"
                    placeholder="inj1... or 0x..."
                    className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-white/50"
                  />
                  {errors.contractAddress && (
                    <p className="mt-1 text-sm text-red-400">{errors.contractAddress}</p>
                  )}
                </div>

                {/* Description Field */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Description of the Scam *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Provide detailed information about why you believe this is a scam..."
                    className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-white/50"
                  />
                  {errors.description && (
                    <p className="mt-1 text-sm text-red-400">{errors.description}</p>
                  )}
                </div>

                {/* Evidence Field */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Evidence/Proof *
                  </label>
                  <textarea
                    name="evidence"
                    value={formData.evidence}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Links to transactions, screenshots, chat logs, etc."
                    className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-white/50"
                  />
                  {errors.evidence && (
                    <p className="mt-1 text-sm text-red-400">{errors.evidence}</p>
                  )}
                </div>

                {/* Severity Field */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Severity Level *
                  </label>
                  <select
                    name="severity"
                    value={formData.severity}
                    onChange={handleChange}
                    className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-white/50"
                  >
                    <option value="low">Low - Suspicious but no confirmed loss</option>
                    <option value="medium">Medium - Some evidence of malicious intent</option>
                    <option value="high">High - Confirmed losses or theft</option>
                    <option value="critical">Critical - Large-scale scam or ongoing attack</option>
                  </select>
                </div>

                {/* Attachments Field */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Attachments (Screenshots, Documents)
                  </label>
                  <div className="border border-dashed border-white/20 rounded-xl p-4">
                    <input
                      type="file"
                      id="attachments"
                      multiple
                      onChange={handleFileChange}
                      className="hidden"
                      accept="image/*,.pdf,.doc,.docx"
                    />
                    <label
                      htmlFor="attachments"
                      className="block text-center cursor-pointer p-4 border border-white/10 rounded-lg hover:bg-white/5 transition-colors"
                    >
                      <div className="flex flex-col items-center justify-center">
                        <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        <span>Click to upload files</span>
                        <span className="text-xs text-gray-400 mt-1">PNG, JPG, PDF up to 10MB</span>
                      </div>
                    </label>
                  </div>
                  {selectedFiles.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {selectedFiles.map((file, index) => (
                        <div key={index} className="flex items-center justify-between bg-black/20 px-3 py-2 rounded-lg">
                          <span className="text-sm truncate max-w-xs">{file.name}</span>
                          <button 
                            type="button" 
                            onClick={() => removeFile(index)}
                            className="text-red-400 hover:text-red-300"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Your Email (Optional)
                  </label>
                  <input
                    name="reporterEmail"
                    value={formData.reporterEmail || ''}
                    onChange={handleChange}
                    type="email"
                    placeholder="email@example.com"
                    className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-white/50"
                  />
                  <p className="mt-1 text-xs text-gray-400">
                    Only needed if you want updates about this report
                  </p>
                </div>

                {/* Social Links Field */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Social Links (Twitter, Telegram, etc.)
                  </label>
                  <input
                    name="socialLinks"
                    value={formData.socialLinks || ''}
                    onChange={handleChange}
                    type="text"
                    placeholder="https://twitter.com/..."
                    className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-white/50"
                  />
                </div>

                {/* Terms Checkbox */}
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      name="agreeTerms"
                      checked={formData.agreeTerms}
                      onChange={handleChange}
                      type="checkbox"
                      className="w-4 h-4 rounded bg-black/30 border border-white/10 focus:ring-white/50"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label className="text-gray-300">
                      I confirm that the information provided is accurate to the best of my knowledge and agree to the{' '}
                      <a href="#" className="text-purple-400 hover:underline">submission terms</a>.
                    </label>
                  </div>
                </div>
                {errors.agreeTerms && (
                  <p className="mt-1 text-sm text-red-400">You must agree to the terms</p>
                )}

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full px-6 py-4 rounded-xl font-medium text-lg ${
                      isSubmitting 
                        ? 'bg-white/50 cursor-not-allowed' 
                        : 'bg-white hover:bg-white/90 text-black'
                    } transition-colors`}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Submitting...
                      </span>
                    ) : (
                      'Submit Report'
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </section>

          <section className="px-4 max-w-3xl mx-auto pb-16">
            <div className="bg-black/50 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
              <h2 className="text-2xl font-bold mb-6">What to Report</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold mb-3 text-red-400">Common Scam Types</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-red-400 mr-2">•</span>
                      <span>Rug pulls (projects that suddenly disappear with funds)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-400 mr-2">•</span>
                      <span>Phishing sites impersonating legitimate projects</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-400 mr-2">•</span>
                      <span>Malicious smart contracts with hidden functions</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-400 mr-2">•</span>
                      <span>Fake airdrops or token giveaways</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-400 mr-2">•</span>
                      <span>Ponzi schemes or unsustainable yield promises</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-bold mb-3 text-green-400">How to Provide Good Evidence</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-green-400 mr-2">✓</span>
                      <span>Transaction hashes showing fund movement</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-400 mr-2">✓</span>
                      <span>Screenshots of suspicious messages or promises</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-400 mr-2">✓</span>
                      <span>Links to social media posts or websites</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-400 mr-2">✓</span>
                      <span>Contract addresses and verification links</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-400 mr-2">✓</span>
                      <span>Detailed description of your experience</span>
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