'use client';
import { motion } from "framer-motion";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState, useRef } from 'react';
import Button from '@/components/basic_button';

interface Transaction {
  hash: string;
  type: string;
  amount: number;
  date: string;
  message: string;
  isScam: boolean;
}

interface ScamWallet {
  address: string;
  projectName: string;
  type: 'wallet' | 'contract';
  dateReported: string;
  reportedBy: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

interface WalletInfo {
  address: string;
  total_transactions: number;
  first_transaction_date: string;
  last_transaction_date: string;
  block_range: {
    min: number;
    max: number;
  };
  transaction_types: Record<string, number>;
  dapp_usage: Record<string, number>;
  contracts_interacted: Record<string, number>;
  actions_performed: Record<string, number>;
  suspicious_transactions: Array<{
    block_number: number;
    timestamp: string;
    type: string;
    flags: string[];
    hash: string;
    risk_score: number;
  }>;
  top_recipients: Array<{
    address: string;
    count: number;
  }>;
  monthly_activity: Record<string, number>;
  message_types: Record<string, number>;
  risk_score: number;
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80 } },
};

const TransactionCard = ({ transaction, index }: { transaction: Transaction, index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  return (
    <motion.div
      ref={cardRef}
      variants={itemVariants}
      initial={{ opacity: 0.6 }}
      whileHover={{ 
        scale: 1.05,
        zIndex: 10,
        opacity: 1,
      }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className="group relative overflow-hidden rounded-2xl bg-black/20 shadow-2xl hover:shadow-white/20 transition-all duration-500 backdrop-blur-sm border border-white/10 hover:border-white/30 w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      <motion.div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        animate={{
          background: isHovered 
            ? `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.15), transparent 70%)`
            : 'transparent'
        }}
      />
      
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-white/40 transition-all duration-500 z-20 pointer-events-none rounded-2xl" />
      
      {isHovered && (
        <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-white rounded-full"
              initial={{
                opacity: 0,
                scale: 0,
                x: Math.random() * 100,
                y: Math.random() * 100,
              }}
              animate={{
                opacity: [0, 0.8, 0],
                scale: [0, 0.5 + Math.random() * 0.5, 0],
                x: Math.random() * 100,
                y: Math.random() * 100,
              }}
              transition={{
                duration: 1.5 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 0.5,
                ease: "easeOut"
              }}
              style={{
                width: `${1 + Math.random() * 4}px`,
                height: `${1 + Math.random() * 4}px`,
              }}
            />
          ))}
        </div>
      )}
      
      <div className="relative w-full aspect-[4/3] overflow-hidden rounded-t-2xl bg-gradient-to-br from-purple-900/50 to-black/70">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center p-6">
            <motion.h3 className="text-white text-2xl font-bold mb-2">
              {transaction.type}
            </motion.h3>
            <motion.p className={`text-4xl font-bold mb-4 ${transaction.isScam ? 'text-red-400' : 'text-green-400'}`}>
              {transaction.amount.toFixed(2)} INJ
            </motion.p>
            <motion.p className="text-gray-300 text-sm">
              {transaction.date}
            </motion.p>
          </div>
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
      
      <div className="bg-gradient-to-t from-black/95 via-black/70 p-5 to-transparent rounded-b-2xl">
        <motion.h3 className="text-white text-lg font-bold text-center py-3 tracking-tight">
          {transaction.message}
        </motion.h3>
        
        <div className="flex justify-between items-center mt-4">
          <motion.p className="text-gray-400 text-sm truncate">
            {transaction.hash}
          </motion.p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              transaction.isScam 
                ? 'bg-red-900/50 text-red-200' 
                : 'bg-green-900/50 text-green-200'
            }`}>
              {transaction.isScam ? 'SCAM' : 'SAFE'}
            </span>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

const ScamWalletCard = ({ wallet }: { wallet: ScamWallet }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  const getSeverityColor = () => {
    switch(wallet.severity) {
      case 'low': return 'bg-yellow-900/50 text-yellow-200';
      case 'medium': return 'bg-orange-900/50 text-orange-200';
      case 'high': return 'bg-red-900/50 text-red-200';
      case 'critical': return 'bg-purple-900/50 text-purple-200';
      default: return 'bg-gray-900/50 text-gray-200';
    }
  };

  return (
    <motion.div
      ref={cardRef}
      variants={itemVariants}
      initial={{ opacity: 0.6 }}
      whileHover={{ 
        scale: 1.03,
        zIndex: 10,
        opacity: 1,
      }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className="group relative overflow-hidden rounded-2xl bg-black/20 shadow-2xl hover:shadow-white/20 transition-all duration-500 backdrop-blur-sm border border-white/10 hover:border-white/30 w-full p-6"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      <motion.div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        animate={{
          background: isHovered 
            ? `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.15), transparent 70%)`
            : 'transparent'
        }}
      />
      
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-white/40 transition-all duration-500 z-20 pointer-events-none rounded-2xl" />
      
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-bold mb-1">{wallet.projectName}</h3>
          <p className="text-sm text-gray-400">{wallet.type.toUpperCase()}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getSeverityColor()}`}>
          {wallet.severity.toUpperCase()}
        </span>
      </div>
      
      <div className="mb-4">
        <p className="text-sm text-gray-300 break-all">{wallet.address}</p>
      </div>
      
      <div className="text-sm text-gray-400 mb-4">
        <p>{wallet.description}</p>
      </div>
      
      <div className="flex justify-between items-center text-xs text-gray-500">
        <span>Reported: {wallet.dateReported}</span>
        <span>By: {wallet.reportedBy}</span>
      </div>
    </motion.div>
  );
};

const StatCard = ({ title, value, children, tooltip }: { title: string, value: string | number, children?: React.ReactNode, tooltip?: string }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showTooltip, setShowTooltip] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  return (
    <motion.div
      ref={cardRef}
      variants={itemVariants}
      initial={{ opacity: 0.6 }}
      whileHover={{ 
        scale: 1.03,
        zIndex: 10,
        opacity: 1,
      }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className="group relative overflow-hidden rounded-2xl bg-black/20 shadow-2xl hover:shadow-white/20 transition-all duration-500 backdrop-blur-sm border border-white/10 hover:border-white/30 w-full p-6"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      <motion.div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        animate={{
          background: isHovered 
            ? `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.15), transparent 70%)`
            : 'transparent'
        }}
      />
      
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-white/40 transition-all duration-500 z-20 pointer-events-none rounded-2xl" />
      
      <div className="flex items-center justify-between">
        <h3 className="text-gray-400 text-sm uppercase tracking-wider mb-2">{title}</h3>
        {tooltip && (
          <div 
            className="relative"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            <svg className="w-4 h-4 text-gray-500 cursor-help" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path>
            </svg>
            {showTooltip && (
              <div className="absolute z-50 w-64 p-2 text-sm text-white bg-gray-900 rounded-lg shadow-lg -top-12 left-6">
                {tooltip}
              </div>
            )}
          </div>
        )}
      </div>
      <p className="text-3xl font-bold mb-4">{value}</p>
      {children}
    </motion.div>
  );
};

const SuspiciousTransactionCard = ({ transaction }: { transaction: any }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  const getRiskColor = (score: number) => {
    if (score <= 20) return 'text-yellow-400';
    if (score <= 40) return 'text-orange-400';
    return 'text-red-400';
  };

  const getRiskBgColor = (score: number) => {
    if (score <= 20) return 'bg-yellow-900/50';
    if (score <= 40) return 'bg-orange-900/50';
    return 'bg-red-900/50';
  };

  return (
    <motion.div
      ref={cardRef}
      variants={itemVariants}
      initial={{ opacity: 0.6 }}
      whileHover={{ 
        scale: 1.03,
        zIndex: 10,
        opacity: 1,
      }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className="group relative overflow-hidden rounded-2xl bg-black/20 shadow-2xl hover:shadow-white/20 transition-all duration-500 backdrop-blur-sm border border-white/10 hover:border-white/30 w-full p-6"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      <motion.div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        animate={{
          background: isHovered 
            ? `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.15), transparent 70%)`
            : 'transparent'
        }}
      />
      
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-white/40 transition-all duration-500 z-20 pointer-events-none rounded-2xl" />
      
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-bold mb-1">Block #{transaction.block_number}</h3>
          <p className="text-sm text-gray-400">{transaction.timestamp}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getRiskBgColor(transaction.risk_score)} ${getRiskColor(transaction.risk_score)}`}>
          Risk: {transaction.risk_score}
        </span>
      </div>
      
      <div className="mb-4">
        <p className="text-sm text-gray-300 break-all">Hash: {transaction.hash}</p>
      </div>
      
      <div className="mb-4">
        <h4 className="text-sm font-bold text-gray-400 mb-2">Flags:</h4>
        <div className="flex flex-wrap gap-2">
          {transaction.flags.map((flag: string, index: number) => (
            <span key={index} className="px-2 py-1 bg-red-900/30 text-red-200 rounded-full text-xs">
              {flag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const DataVisualizationCard = ({ title, data, type }: { title: string, data: Record<string, any>, type: 'bar' | 'pie' | 'list' }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  const total = Object.values(data).reduce((sum, value) => sum + value, 0);
  
  return (
    <motion.div
      ref={cardRef}
      variants={itemVariants}
      initial={{ opacity: 0.6 }}
      whileHover={{ 
        scale: 1.03,
        zIndex: 10,
        opacity: 1,
      }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className="group relative overflow-hidden rounded-2xl bg-black/20 shadow-2xl hover:shadow-white/20 transition-all duration-500 backdrop-blur-sm border border-white/10 hover:border-white/30 w-full p-6"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      <motion.div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        animate={{
          background: isHovered 
            ? `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.15), transparent 70%)`
            : 'transparent'
        }}
      />
      
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-white/40 transition-all duration-500 z-20 pointer-events-none rounded-2xl" />
      
      <h3 className="text-lg font-bold mb-4">{title}</h3>
      
      {type === 'bar' && (
        <div className="space-y-2">
          {Object.entries(data).map(([key, value], index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-sm text-gray-300 truncate max-w-[40%]">{key}</span>
              <div className="flex-1 mx-2 bg-gray-800 rounded-full h-2">
                <div 
                  className="bg-purple-500 h-2 rounded-full" 
                  style={{ width: `${(value / total) * 100}%` }}
                ></div>
              </div>
              <span className="text-sm text-gray-400 w-10 text-right">{value}</span>
            </div>
          ))}
        </div>
      )}
      
      {type === 'list' && (
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {Object.entries(data).map(([key, value], index) => (
            <div key={index} className="flex justify-between items-center py-1 border-b border-white/10">
              <span className="text-sm text-gray-300 truncate max-w-[70%]">{key}</span>
              <span className="text-sm text-gray-400">{value}</span>
            </div>
          ))}
        </div>
      )}
      
      {type === 'pie' && (
        <div className="grid grid-cols-2 gap-4">
          {Object.entries(data).slice(0, 6).map(([key, value], index) => (
            <div key={index} className="flex items-center">
              <div 
                className="w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: `hsl(${index * 60}, 70%, 50%)` }}
              ></div>
              <span className="text-sm text-gray-300 truncate flex-1">{key}</span>
              <span className="text-sm text-gray-400 ml-2">{value}</span>
            </div>
          ))}
          {Object.entries(data).length > 6 && (
            <div className="col-span-2 text-center text-sm text-gray-500">
              +{Object.entries(data).length - 6} more
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default function WalletScanner() {
  const [walletAddress, setWalletAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [scamScore, setScamScore] = useState<number | null>(null);
  const [blockHeight, setBlockHeight] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'scanner' | 'database'>('scanner');
  const [scamWallets, setScamWallets] = useState<ScamWallet[]>([]);
  const [filterProject, setFilterProject] = useState<string>('');
  const [filterType, setFilterType] = useState<'all' | 'wallet' | 'contract'>('all');
  const [filterDate, setFilterDate] = useState<string>('');
  const [filterAddress, setFilterAddress] = useState<string>('');
  const [walletInfo, setWalletInfo] = useState<WalletInfo | null>(null);
  
  const scannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchBlockHeight = async () => {
      try {
        const mockHeight = Math.floor(Math.random() * 10000000) + 5000000;
        setBlockHeight(mockHeight);
      } catch (error) {
        console.error('Error fetching block height:', error);
      }
    };

    const fetchScamWallets = async () => {
      try {
        // Mock data for scam wallets
        const mockScamWallets: ScamWallet[] = [
          {
            address: 'inj1xyz...abc123',
            projectName: 'Fake Injective Project',
            type: 'wallet',
            dateReported: '2023-06-15',
            reportedBy: 'Community',
            description: 'Phishing scam targeting INJ holders',
            severity: 'high'
          },
          {
            address: '0x1234...5678',
            projectName: 'Scam Token',
            type: 'contract',
            dateReported: '2023-06-10',
            reportedBy: 'Security Team',
            description: 'Malicious token contract with hidden transfer fees',
            severity: 'critical'
          },
          {
            address: 'inj1def...ghi456',
            projectName: 'Fake Airdrop',
            type: 'wallet',
            dateReported: '2023-06-05',
            reportedBy: 'User Report',
            description: 'Promising fake airdrops for INJ deposits',
            severity: 'medium'
          },
          {
            address: '0xabcd...efgh',
            projectName: 'Rug Pull',
            type: 'contract',
            dateReported: '2023-05-28',
            reportedBy: 'Security Team',
            description: 'Project abandoned after raising funds',
            severity: 'critical'
          },
          {
            address: 'inj1jkl...mno789',
            projectName: 'Impersonator',
            type: 'wallet',
            dateReported: '2023-05-20',
            reportedBy: 'Community',
            description: 'Impersonating official Injective team members',
            severity: 'high'
          },
          {
            address: '0x9876...5432',
            projectName: 'Fake DEX',
            type: 'contract',
            dateReported: '2023-05-15',
            reportedBy: 'Security Team',
            description: 'Front-running trades and stealing funds',
            severity: 'critical'
          },
          {
            address: 'inj1pqr...stu012',
            projectName: 'Phishing Site',
            type: 'wallet',
            dateReported: '2023-05-10',
            reportedBy: 'User Report',
            description: 'Connected to fake Injective dashboard',
            severity: 'medium'
          },
          {
            address: '0x2468...1357',
            projectName: 'Honeypot',
            type: 'contract',
            dateReported: '2023-05-01',
            reportedBy: 'Security Team',
            description: 'Cannot sell tokens after purchase',
            severity: 'high'
          }
        ];
        
        setScamWallets(mockScamWallets);
      } catch (error) {
        console.error('Error fetching scam wallets:', error);
      }
    };

    fetchBlockHeight();
    fetchScamWallets();
    const interval = setInterval(fetchBlockHeight, 15000);

    return () => clearInterval(interval);
  }, []);

  const scanWallet = async () => {
    if (!walletAddress) return;
    
    setIsLoading(true);
    
    try {
      // Fetch data from the API
      const response = await fetch(`https://api.injectivepedro.com/walletinfo/${walletAddress}/`);
      const data: WalletInfo = await response.json();
      setWalletInfo(data);
      
      // Generate mock transactions based on the API data
      const mockTransactions: Transaction[] = [
        {
          hash: data.suspicious_transactions[0]?.hash || '0x4a3b...c82d',
          type: 'Token Transfer',
          amount: 125.42,
          date: data.first_transaction_date,
          message: 'First transaction',
          isScam: false
        },
        {
          hash: data.suspicious_transactions[1]?.hash || '0x8f2e...9d1a',
          type: 'NFT Purchase',
          amount: 42.0,
          date: data.last_transaction_date,
          message: 'Latest transaction',
          isScam: false
        },
        ...data.suspicious_transactions.slice(0, 3).map(tx => ({
          hash: tx.hash,
          type: 'Suspicious',
          amount: 0.1,
          date: tx.timestamp,
          message: tx.flags.join(', '),
          isScam: true
        }))
      ];

      const mockStats = {
        totalTransactions: data.total_transactions,
        largestTransaction: 500, // Mock value
        smallestTransaction: 0.01, // Mock value
        lastTransaction: mockTransactions[0],
        transactionTypes: Object.keys(data.transaction_types)
      };

      setTransactions(mockTransactions);
      setStats(mockStats);
      setScamScore(data.risk_score);
    } catch (error) {
      console.error('Error scanning wallet:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fadeIn');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (scannerRef.current) {
      observer.observe(scannerRef.current);
    }

    return () => {
      if (scannerRef.current) {
        observer.unobserve(scannerRef.current);
      }
    };
  }, []);

  const getScamColor = (score: number) => {
    if (score <= 3) return 'text-green-400';
    if (score <= 6) return 'text-yellow-400';
    return 'text-red-400';
  };

  const filteredScamWallets = scamWallets.filter(wallet => {
    const matchesProject = filterProject === '' || 
      wallet.projectName.toLowerCase().includes(filterProject.toLowerCase());
    const matchesType = filterType === 'all' || wallet.type === filterType;
    const matchesDate = filterDate === '' || wallet.dateReported === filterDate;
    const matchesAddress = filterAddress === '' || 
      wallet.address.toLowerCase().includes(filterAddress.toLowerCase());
    
    return matchesProject && matchesType && matchesDate && matchesAddress;
  });

  return (
    <>
      <Head>
        <title>Pedro | Injective Wallet Scanner</title>
        <meta name="description" content="Scan Injective wallet addresses for transactions and security analysis" />
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

        <div className="relative z-10">
          <section className="flex items-center justify-center py-16 text-center relative overflow-hidden">
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="px-6 max-w-4xl relative z-10"
            >
              <motion.h1
                className="text-4xl md:text-7xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                Pedro Scan
              </motion.h1>
              
              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ delay: 0.2, duration: 1.2, ease: "circOut" }}
                className="h-px w-full bg-gradient-to-r from-transparent via-white to-transparent mb-12"
              />
            </motion.div>
          </section>

          <div className="flex justify-center mb-8">
            <div className="inline-flex rounded-xl bg-black/50 border border-white/10 backdrop-blur-sm overflow-hidden">
              <button
                onClick={() => setActiveTab('scanner')}
                className={`px-6 py-3 font-medium transition-colors ${
                  activeTab === 'scanner' 
                    ? 'bg-white text-black' 
                    : 'text-white hover:bg-white/10'
                }`}
              >
                Wallet Scanner
              </button>
              <button
                onClick={() => setActiveTab('database')}
                className={`px-6 py-3 font-medium transition-colors ${
                  activeTab === 'database' 
                    ? 'bg-white text-black' 
                    : 'text-white hover:bg-white/10'
                }`}
              >
                Scam Database
              </button>
            </div>
          </div>

          {activeTab === 'scanner' && (
            <section className="flex items-center justify-center pb-16 text-center relative overflow-hidden">
              <motion.div 
                className="flex flex-col gap-8 justify-center w-full max-w-4xl mx-auto px-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                <div className="w-full">
                  <input
                    type="text"
                    value={walletAddress}
                    onChange={(e) => setWalletAddress(e.target.value)}
                    placeholder="inj1... or 0x..."
                    className="w-full bg-black/70 border border-white rounded-xl px-6 py-3 text-white focus:outline-none focus:ring-2 text-lg"
                  />
                </div>
                <div className="w-full">
                  <Button
                    onClick={scanWallet}
                    disabled={isLoading || !walletAddress}
                    className={`w-full px-8 py-5 rounded-xl font-medium text-lg ${isLoading ? 'bg-white' : 'bg-white'} transition-colors`}
                    label={isLoading ? "SCANNING..." : "SCAN WALLET"}
                  />
                </div>
              </motion.div>
            </section>
          )}

          {activeTab === 'database' && (
            <section className="flex items-center justify-center pb-16 text-center relative overflow-hidden">
              <motion.div 
                className="flex flex-col gap-8 justify-center w-full max-w-6xl mx-auto px-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <input
                    type="text"
                    value={filterProject}
                    onChange={(e) => setFilterProject(e.target.value)}
                    placeholder="Filter by project"
                    className="bg-black/70 border border-white/20 rounded-xl px-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-white/50"
                  />
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value as any)}
                    className="bg-black/70 border border-white/20 rounded-xl px-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-white/50"
                  >
                    <option value="all">All Types</option>
                    <option value="wallet">Wallet</option>
                    <option value="contract">Contract</option>
                  </select>
                  <input
                    type="date"
                    value={filterDate}
                    onChange={(e) => setFilterDate(e.target.value)}
                    placeholder="Filter by date"
                    className="bg-black/70 border border-white/20 rounded-xl px-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-white/50"
                  />
                  <input
                    type="text"
                    value={filterAddress}
                    onChange={(e) => setFilterAddress(e.target.value)}
                    placeholder="Filter by address"
                    className="bg-black/70 border border-white/20 rounded-xl px-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-white/50"
                  />
                </div>
              </motion.div>
            </section>
          )}

          <section className="relative sm:py-8 py-2 px-2 sm: mx-auto max-w-[1500px]" ref={scannerRef}>
            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-center items-center py-20"
              >
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
              </motion.div>
            )}

            {!isLoading && activeTab === 'scanner' && walletInfo && (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="space-y-12 px-4"
              >
                <motion.div 
                  variants={itemVariants}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                  <StatCard 
                    title="Total Transactions" 
                    value={walletInfo.total_transactions}
                    tooltip="Total number of transactions for this wallet"
                  />
                  
                  <StatCard 
                    title="Risk Score" 
                    value={`${walletInfo.risk_score}/10`}
                    tooltip="Overall risk assessment score for this wallet"
                  >
                    <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                      <div 
                        className={`h-2 rounded-full ${getScamColor(walletInfo.risk_score).replace('text', 'bg')}`} 
                        style={{ width: `${walletInfo.risk_score * 10}%` }}
                      ></div>
                    </div>
                  </StatCard>
                  
                  <StatCard 
                    title="First TX" 
                    value={new Date(walletInfo.first_transaction_date).toLocaleDateString()}
                    tooltip="Date of the first transaction for this wallet"
                  />
                  
                  <StatCard 
                    title="Last TX" 
                    value={new Date(walletInfo.last_transaction_date).toLocaleDateString()}
                    tooltip="Date of the most recent transaction for this wallet"
                  />
                </motion.div>

                {walletInfo.suspicious_transactions.length > 0 && (
                  <motion.div variants={itemVariants}>
                    <div className="bg-black/50 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
                      <h3 className="text-xl font-bold mb-6">Suspicious Transactions</h3>
                      <motion.div
                        variants={containerVariants}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                      >
                        {walletInfo.suspicious_transactions.map((tx, index) => (
                          <SuspiciousTransactionCard 
                            key={index}
                            transaction={tx}
                          />
                        ))}
                      </motion.div>
                    </div>
                  </motion.div>
                )}

                <motion.div variants={itemVariants}>
                  <div className="bg-black/50 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
                    <h3 className="text-xl font-bold mb-6">Wallet Analytics</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      <DataVisualizationCard 
                        title="DApp Usage" 
                        data={walletInfo.dapp_usage} 
                        type="bar"
                      />
                      <DataVisualizationCard 
                        title="Message Types" 
                        data={walletInfo.message_types} 
                        type="pie"
                      />
                      <DataVisualizationCard 
                        title="Monthly Activity" 
                        data={walletInfo.monthly_activity} 
                        type="bar"
                      />
                    </div>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <div className="bg-black/50 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
                    <h3 className="text-xl font-bold mb-6">Contracts Interacted With</h3>
                    <DataVisualizationCard 
                      title="Contract Addresses" 
                      data={walletInfo.contracts_interacted} 
                      type="list"
                    />
                  </div>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <div className="bg-black/50 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
                    <h3 className="text-xl font-bold mb-6">Top Recipients</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-white/10">
                            <th className="text-left py-2">Address</th>
                            <th className="text-right py-2">Count</th>
                          </tr>
                        </thead>
                        <tbody>
                          {walletInfo.top_recipients.map((recipient, index) => (
                            <tr key={index} className="border-b border-white/5">
                              <td className="py-2 text-sm text-gray-300 truncate max-w-xs">
                                {recipient.address}
                              </td>
                              <td className="py-2 text-sm text-gray-400 text-right">
                                {recipient.count}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}

            {!isLoading && activeTab === 'database' && (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="space-y-12 px-4"
              >
                <motion.div variants={itemVariants}>
                  <div className="bg-black/50 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-xl font-bold">Scam Wallet Database</h3>
                      <span className="text-sm text-gray-400">
                        {filteredScamWallets.length} records found
                      </span>
                    </div>
                    
                    {filteredScamWallets.length > 0 ? (
                      <motion.div
                        variants={containerVariants}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                      >
                        {filteredScamWallets.map((wallet, index) => (
                          <ScamWalletCard 
                            key={index}
                            wallet={wallet}
                          />
                        ))}
                      </motion.div>
                    ) : (
                      <div className="text-center py-12">
                        <p className="text-gray-400">No scam wallets match your filters</p>
                      </div>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            )}

            {!isLoading && !walletInfo && activeTab === 'scanner' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.0, duration: 0.8 }}
                className="mt-12 px-4"
              >
                <h3 className="text-xl font-bold mb-6 text-white text-center">How It Works</h3>
                
                <div className="w-full mb-12">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <motion.div
                      whileHover={{ y: -5 }}
                      className="w-full bg-black/30 backdrop-blur-sm p-6 rounded-2xl border border-white/10"
                    >
                      <div className="flex items-center mb-3">
                        <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center mr-3">
                          <span className="font-bold">1</span>
                        </div>
                        <h4 className="font-bold">Enter Address</h4>
                      </div>
                      <p className="text-gray-300 text-sm">
                        Paste any Injective wallet address into the scanner
                      </p>
                    </motion.div>

                    <motion.div
                      whileHover={{ y: -5 }}
                      className="w-full bg-black/30 backdrop-blur-sm p-6 rounded-2xl border border-white/10"
                    >
                      <div className="flex items-center mb-3">
                        <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center mr-3">
                          <span className="font-bold">2</span>
                        </div>
                        <h4 className="font-bold">Scan Transactions</h4>
                      </div>
                      <p className="text-gray-300 text-sm">
                        We analyze all transactions and token movements
                      </p>
                    </motion.div>

                    <motion.div
                      whileHover={{ y: -5 }}
                      className="w-full bg-black/30 backdrop-blur-sm p-6 rounded-2xl border border-white/10"
                    >
                      <div className="flex items-center mb-3">
                        <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center mr-3">
                          <span className="font-bold">3</span>
                        </div>
                        <h4 className="font-bold">Get Results</h4>
                      </div>
                      <p className="text-gray-300 text-sm">
                        View detailed analytics and security assessment
                      </p>
                    </motion.div>
                  </div>
                </div>

                <div className="w-full mb-16">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-black/30 border border-white/10 rounded-xl p-6 backdrop-blur-sm">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                        <h3 className="text-lg font-bold">Network Status</h3>  
                      </div>
                      <p className="text-2xl font-bold tracking-tight">
                        Operational
                      </p>
                    </div>

                    <div className="bg-black/30 border border-white/10 rounded-xl p-6 backdrop-blur-sm">
                      <h3 className="text-lg font-bold mb-4">Blockchain Data</h3>
                      <p className="text-2xl font-bold tracking-tight">
                        {blockHeight ? blockHeight.toLocaleString() : '--'}
                      </p>
                    </div>

                    <div className="bg-black/30 border border-white/10 rounded-xl p-6 backdrop-blur-sm">
                      <h3 className="text-lg font-bold mb-4">Scammers Project</h3>
                      <p className="text-2xl font-bold tracking-tight">
                        63
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </section>
        </div>
      </div>
    </>
  );
};