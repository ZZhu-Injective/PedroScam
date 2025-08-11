'use client';
import { motion } from "framer-motion";
import Head from "next/head";
import Image from "next/image";
import { useState, useEffect } from 'react';

interface ScamProject {
  id: string;
  name: string;
  imageUrl: string;
  category: string;
  dateReported: string;
  reportedBy: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  website?: string;
  socials?: {
    twitter?: string;
    telegram?: string;
    discord?: string;
  };
  chain: string;
  contracts: string[];
}

const ScamProjectCard = ({ project }: { project: ScamProject }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getSeverityColor = () => {
    switch(project.severity) {
      case 'low': return 'bg-yellow-900/50 text-yellow-200';
      case 'medium': return 'bg-orange-900/50 text-orange-200';
      case 'high': return 'bg-red-900/50 text-red-200';
      case 'critical': return 'bg-purple-900/50 text-purple-200';
      default: return 'bg-gray-900/50 text-gray-200';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="relative overflow-hidden rounded-2xl bg-black/20 shadow-2xl backdrop-blur-sm border border-white/10 hover:border-white/30 transition-all duration-300"
    >
      <div className="relative w-full h-48 overflow-hidden">
        <Image
          src={project.imageUrl}
          alt={project.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex justify-between items-end">
            <h3 className="text-xl font-bold truncate">{project.name}</h3>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getSeverityColor()}`}>
              {project.severity.toUpperCase()}
            </span>
          </div>
          <div className="flex items-center mt-1">
            <span className="text-xs bg-black/50 px-2 py-1 rounded">{project.chain}</span>
            <span className="text-xs ml-2 text-gray-300">{project.category}</span>
          </div>
        </div>
      </div>

      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <div>
            <p className="text-sm text-gray-400">Reported: {project.dateReported}</p>
            <p className="text-sm text-gray-400">By: {project.reportedBy}</p>
          </div>
          {project.website && (
            <a 
              href={project.website} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs bg-white/10 hover:bg-white/20 px-2 py-1 rounded transition-colors"
            >
              Website
            </a>
          )}
        </div>

        <p className="text-sm mb-4 line-clamp-3">{project.description}</p>

        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-xs text-gray-400 hover:text-white transition-colors"
        >
          {isExpanded ? 'Show less' : 'Show more'}
        </button>

        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.3 }}
            className="mt-4 space-y-3"
          >
            {project.contracts.length > 0 && (
              <div>
                <h4 className="text-xs font-bold text-gray-400 mb-1">CONTRACTS</h4>
                <div className="space-y-1">
                  {project.contracts.map((contract, i) => (
                    <div key={i} className="text-xs bg-black/50 p-2 rounded break-all font-mono">
                      {contract}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {project.socials && (
              <div>
                <h4 className="text-xs font-bold text-gray-400 mb-1">SOCIALS</h4>
                <div className="flex gap-2">
                  {project.socials.twitter && (
                    <a 
                      href={project.socials.twitter} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-xs bg-blue-900/50 hover:bg-blue-900/70 px-2 py-1 rounded transition-colors"
                    >
                      Twitter
                    </a>
                  )}
                  {project.socials.telegram && (
                    <a 
                      href={project.socials.telegram} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-xs bg-blue-500/50 hover:bg-blue-500/70 px-2 py-1 rounded transition-colors"
                    >
                      Telegram
                    </a>
                  )}
                  {project.socials.discord && (
                    <a 
                      href={project.socials.discord} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-xs bg-indigo-500/50 hover:bg-indigo-500/70 px-2 py-1 rounded transition-colors"
                    >
                      Discord
                    </a>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default function ScamProjectsPage() {
  const [projects, setProjects] = useState<ScamProject[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<ScamProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [severityFilter, setSeverityFilter] = useState('all');
  const [chainFilter, setChainFilter] = useState('all');

  useEffect(() => {
    // Simulate API fetch
    const fetchScamProjects = async () => {
      setIsLoading(true);
      try {
        // Mock data - in a real app, this would come from an API
        const mockProjects: ScamProject[] = [
          {
            id: '1',
            name: 'Injective Yield Farm',
            imageUrl: '/scam1.webp', // Replace with actual images
            category: 'DeFi',
            dateReported: '2023-06-15',
            reportedBy: 'Community',
            description: 'Promised unrealistic yields and disappeared with user funds after 2 weeks of operation. The team deleted all social media accounts and the website went offline.',
            severity: 'critical',
            website: 'https://fake-injective-yield.com',
            socials: {
              twitter: 'https://twitter.com/fakeinjective',
              telegram: 'https://t.me/fakeinjective',
            },
            chain: 'Injective',
            contracts: ['inj1xyz...abc123', 'inj1def...ghi456']
          },
          {
            id: '2',
            name: 'Cosmos NFT Scam',
            imageUrl: '/scam2.webp',
            category: 'NFT',
            dateReported: '2023-06-10',
            reportedBy: 'Security Team',
            description: 'Fake NFT collection that copied artwork from legitimate projects. After selling out, the creators rug pulled and abandoned the project.',
            severity: 'high',
            chain: 'Cosmos',
            contracts: ['cosmos1xyz...abc123']
          },
          {
            id: '3',
            name: 'Ethereum Token Scam',
            imageUrl: '/scam3.webp',
            category: 'Token',
            dateReported: '2023-06-05',
            reportedBy: 'User Report',
            description: 'Token with hidden transfer fees that drained wallets when users tried to sell. The contract had malicious code that wasn\'t visible in the verified source.',
            severity: 'high',
            chain: 'Ethereum',
            contracts: ['0x1234...5678']
          },
          {
            id: '4',
            name: 'Polygon Fake Airdrop',
            imageUrl: '/scam4.webp',
            category: 'Airdrop',
            dateReported: '2023-05-28',
            reportedBy: 'Security Team',
            description: 'Fake airdrop that required users to connect wallets and sign transactions that drained funds.',
            severity: 'medium',
            chain: 'Polygon',
            contracts: ['0xabcd...efgh']
          },
          {
            id: '5',
            name: 'BSC Honeypot',
            imageUrl: '/scam5.webp',
            category: 'Token',
            dateReported: '2023-05-20',
            reportedBy: 'Community',
            description: 'Token that could be bought but not sold due to hidden contract restrictions.',
            severity: 'medium',
            chain: 'BSC',
            contracts: ['0x9876...5432']
          },
          {
            id: '6',
            name: 'Solana Fake Wallet',
            imageUrl: '/scam6.webp',
            category: 'Wallet',
            dateReported: '2023-05-15',
            reportedBy: 'Security Team',
            description: 'Fake wallet app that stole seed phrases when users tried to import wallets.',
            severity: 'critical',
            chain: 'Solana',
            contracts: []
          },
          {
            id: '7',
            name: 'Avalanche Fake DEX',
            imageUrl: '/scam7.webp',
            category: 'Exchange',
            dateReported: '2023-05-10',
            reportedBy: 'User Report',
            description: 'Fake decentralized exchange that front-ran trades and stole funds.',
            severity: 'high',
            chain: 'Avalanche',
            contracts: ['0x2468...1357']
          },
          {
            id: '8',
            name: 'Fantom Phishing',
            imageUrl: '/scam8.webp',
            category: 'Phishing',
            dateReported: '2023-05-01',
            reportedBy: 'Security Team',
            description: 'Phishing site impersonating a legitimate Fantom project to steal wallet credentials.',
            severity: 'low',
            chain: 'Fantom',
            contracts: []
          }
        ];
        
        setProjects(mockProjects);
        setFilteredProjects(mockProjects);
      } catch (error) {
        console.error('Error fetching scam projects:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchScamProjects();
  }, []);

  useEffect(() => {
    const filtered = projects.filter(project => {
      const matchesSearch = searchTerm === '' || 
        project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = categoryFilter === 'all' || 
        project.category.toLowerCase() === categoryFilter.toLowerCase();
      
      const matchesSeverity = severityFilter === 'all' || 
        project.severity === severityFilter;
      
      const matchesChain = chainFilter === 'all' || 
        project.chain.toLowerCase() === chainFilter.toLowerCase();
      
      return matchesSearch && matchesCategory && matchesSeverity && matchesChain;
    });
    
    setFilteredProjects(filtered);
  }, [searchTerm, categoryFilter, severityFilter, chainFilter, projects]);

  const categories = [...new Set(projects.map(p => p.category))];
  const chains = [...new Set(projects.map(p => p.chain))];
  const severities: ('low' | 'medium' | 'high' | 'critical')[] = ['low', 'medium', 'high', 'critical'];

  return (
    <>
      <Head>
        <title>Pedro | Scam Projects Database</title>
        <meta name="description" content="Database of known scam projects in the crypto space" />
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
                Scam Projects Database
              </motion.h1>
              
              <motion.p
                className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                A community-maintained database of known scam projects, fake airdrops, and malicious contracts.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ delay: 0.2, duration: 1.2, ease: "circOut" }}
                className="h-px w-full bg-gradient-to-r from-transparent via-white to-transparent mb-12"
              />
            </motion.div>
          </section>

          <section className="px-4 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <div className="md:col-span-2">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search projects..."
                  className="w-full bg-black/70 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-white/50"
                />
              </div>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="bg-black/70 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-white/50"
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <select
                value={severityFilter}
                onChange={(e) => setSeverityFilter(e.target.value)}
                className="bg-black/70 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-white/50"
              >
                <option value="all">All Severities</option>
                {severities.map(severity => (
                  <option key={severity} value={severity}>{severity.charAt(0).toUpperCase() + severity.slice(1)}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {isLoading ? (
                Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="h-80 bg-black/20 rounded-2xl animate-pulse" />
                ))
              ) : filteredProjects.length > 0 ? (
                filteredProjects.map(project => (
                  <ScamProjectCard key={project.id} project={project} />
                ))
              ) : (
                <div className="col-span-full text-center py-16">
                  <h3 className="text-xl font-bold mb-2">No projects found</h3>
                  <p className="text-gray-400">Try adjusting your filters</p>
                </div>
              )}
            </div>
          </section>

          <section className="py-16 px-4 max-w-7xl mx-auto">
            <div className="bg-black/50 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
              <h2 className="text-2xl font-bold mb-6">About This Database</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-bold mb-4">How We Identify Scams</h3>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-start">
                      <span className="text-green-400 mr-2">✓</span>
                      <span>Community reports from verified sources</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-400 mr-2">✓</span>
                      <span>Smart contract analysis for malicious code</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-400 mr-2">✓</span>
                      <span>Verification of team disappearance or fund movement</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-400 mr-2">✓</span>
                      <span>Confirmed reports of stolen funds</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-4">Severity Levels</h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <span className="w-3 h-3 rounded-full bg-purple-500 mr-2"></span>
                      <span className="font-medium">Critical</span>
                      <span className="text-gray-400 ml-2">Funds stolen or high risk</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-3 h-3 rounded-full bg-red-500 mr-2"></span>
                      <span className="font-medium">High</span>
                      <span className="text-gray-400 ml-2">Confirmed malicious activity</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-3 h-3 rounded-full bg-orange-500 mr-2"></span>
                      <span className="font-medium">Medium</span>
                      <span className="text-gray-400 ml-2">Suspicious behavior</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></span>
                      <span className="font-medium">Low</span>
                      <span className="text-gray-400 ml-2">Potential risk</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}