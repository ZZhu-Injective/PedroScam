'use client';
import { motion } from "framer-motion";
import Head from "next/head";
import Image from "next/image";
import { useState, useEffect } from 'react';

// Import JSON data directly
import nftData from '@/app/scam/nft.json';

// Define the new interface based on your JSON structure
interface ScamProject {
  contractAddress: string;
  metadata: {
    name: string;
    address_created: string;
    total: string;
    images: string;
    link: string;
    reason: string;
    signed: string;
    risk?: 'low' | 'medium' | 'high' 
  };
}

// Define socials interface
interface Socials {
  twitter?: string;
  telegram?: string;
  discord?: string;
}

const mapToLegacyStructure = (project: ScamProject, category: string) => {
  const imagePath = project.metadata.images.replace(/\\/g, '/');
  const cleanPath = imagePath.replace(/^public\//, '');
  const imageName = cleanPath.split('/').pop() || 'default.jpg';
  
  return {
    id: project.contractAddress,
    name: project.metadata.name,
    imageUrl: `/${cleanPath}`,
    category: category,
    dateReported: "Unknown",
    reportedBy: project.metadata.signed,
    description: project.metadata.reason,
    severity: project.metadata.risk || 'high', 
    website: project.metadata.link,
    socials: {} as Socials,
    chain: "Injective",
    contracts: [project.contractAddress]
  };
};

interface ProjectCardProps {
  project: ReturnType<typeof mapToLegacyStructure>;
  index: number;
}

const ScamProjectCard = ({ project, index }: ProjectCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const getSeverityColor = () => {
    switch(project.severity) {
      case 'low': return 'bg-yellow-900/50 text-yellow-200';
      case 'medium': return 'bg-orange-900/50 text-orange-200';
      case 'high': return 'bg-red-900/50 text-red-200';
      default: return 'bg-gray-900/50 text-gray-200';
    }
  };

  const hasSocials = project.socials && (
    project.socials.twitter || 
    project.socials.telegram || 
    project.socials.discord
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="relative overflow-hidden rounded-2xl bg-black/20 shadow-2xl backdrop-blur-sm border border-white/10 hover:border-white/30 transition-all duration-300"
    >
      <div className="relative w-full h-48 overflow-hidden">
        {imageError ? (
          <div className="w-full h-full bg-gray-800 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        ) : (
          <Image
            src={project.imageUrl}
            alt={project.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onError={() => setImageError(true)}
          />
        )}
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
            <p className="text-sm text-gray-400">Reported by: {project.reportedBy}</p>
          </div>
          {project.website && (
            <a 
              href={project.website} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs bg-white/10 hover:bg-white/20 px-2 py-1 rounded transition-colors"
            >
              Talis
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
                <h4 className="text-xs font-bold text-gray-400 mb-1">CONTRACT ADDRESS</h4>
                <div className="space-y-1">
                  {project.contracts.map((contract, i) => (
                    <div key={i} className="text-xs bg-black/50 p-2 rounded break-all font-mono">
                      {contract}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {hasSocials && (
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

// Fisher-Yates shuffle algorithm for randomizing array
const shuffleArray = (array: any[]) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export default function ScamProjectsPage() {
  const [projects, setProjects] = useState<ReturnType<typeof mapToLegacyStructure>[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<ReturnType<typeof mapToLegacyStructure>[]>([]);
  const [displayedProjects, setDisplayedProjects] = useState<ReturnType<typeof mapToLegacyStructure>[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [severityFilter, setSeverityFilter] = useState('all');
  const [chainFilter, setChainFilter] = useState('all');
  const [isShuffling, setIsShuffling] = useState(false);

  useEffect(() => {
    const loadScamProjects = () => {
      setIsLoading(true);
      try {
        const allProjects: ReturnType<typeof mapToLegacyStructure>[] = [];
        
        const categoryData = [
          { data: nftData, category: 'nft' },
        ];
        
        // Process each category
        categoryData.forEach(({ data, category }) => {
          if (data && Array.isArray(data)) {
            const mappedData = data.map(project => mapToLegacyStructure(project, category));
            allProjects.push(...mappedData);
          }
        });
        
        // If no data was loaded, use fallback data
        if (allProjects.length === 0) {
          console.log("Using fallback data");
          const fallbackData: ScamProject[] = [
            {
              contractAddress: "inj1dam75drlqmg2hll0pt37005dlc3a5t9dqsme8y",
              metadata: {
                name: "Takeda",
                address_created: "inj1d4secujm9c5wq3frcp9ssfcjqv0f9ul434tnvt",
                total: "352",
                images: "scam_images/takeda.jpg",
                link: "https://injective.talis.art/collection/64b52d28f71ecb27c797cc00",
                reason: "No visible buzz on social platforms, not active anymore.",
                signed: "Pedro The Raccoon",
                risk: "high"
              }
            },
            {
              contractAddress: "inj1xp4wlleaj05rd5hp9r4rg5vhuahpm37qaq9z0h",
              metadata: {
                name: "Injective Monkeys",
                address_created: "inj1mque2syfzukfeymva0nrhgtmypykp96mzt744h",
                total: "538",
                images: "scam_images/injective_monkeys.jpg",
                link: "https://injective.talis.art/collection/64b7cf9809c1610f87cc6e22",
                reason: "No visible buzz on social platforms, not active anymore.",
                signed: "Pedro The Raccoon",
                risk: "high"
              }
            }
          ];
          
          const mappedFallback = fallbackData.map(project => mapToLegacyStructure(project, 'nft'));
          allProjects.push(...mappedFallback);
        }
        
        setProjects(allProjects);
        setFilteredProjects(allProjects);
        // Randomize the initial display order
        setDisplayedProjects(shuffleArray(allProjects));
      } catch (error) {
        console.error('Error loading scam projects:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadScamProjects();
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
    setDisplayedProjects(shuffleArray(filtered));
  }, [searchTerm, categoryFilter, severityFilter, chainFilter, projects]);

  const handleShuffle = () => {
    setIsShuffling(true);
    setDisplayedProjects(shuffleArray([...filteredProjects]));
    
    // Reset shuffling state after animation completes
    setTimeout(() => setIsShuffling(false), 500);
  };

  const categories = [...new Set(projects.map(p => p.category))];
  const chains = [...new Set(projects.map(p => p.chain))];
  const severities: ('low' | 'medium' | 'high')[] = ['low', 'medium', 'high'];

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
          <section className="flex items-center justify-center pt-10 text-center relative overflow-hidden">
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
                Scam Projects
              </motion.h1>
              
              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ delay: 0.2, duration: 1.2, ease: "circOut" }}
                className="h-px w-full bg-gradient-to-r from-transparent via-white to-transparent mb-12"
              />
            </motion.div>
          </section>

          <section className="py-4 px-4 max-w-[1500px] mx-auto">
            <div className="bg-black/50 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="group relative bg-gradient-to-br from-blue-900/20 to-blue-800/10 rounded-xl p-1 h-48 cursor-pointer">
                  <div className="absolute inset-0 bg-black/70 rounded-xl group-hover:opacity-0 transition-opacity duration-300 flex flex-col items-center justify-center p-6">
                    <div className="bg-blue-500/20 p-3 rounded-lg mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-bold text-center mb-2">How We Identify Scams</h3>
                    <p className="text-gray-300 text-center text-sm">Hover to see our methods</p>
                  </div>
                  
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-5 flex flex-col justify-center">
                    <h3 className="text-lg font-bold mb-4 text-blue-400 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      Identification Methods
                    </h3>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <span className="text-green-400 mr-2 mt-1 text-xs">✓</span>
                        <span className="text-sm">Community reports from verified sources</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-400 mr-2 mt-1 text-xs">✓</span>
                        <span className="text-sm">Protecting Injective Fam</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-400 mr-2 mt-1 text-xs">✓</span>
                        <span className="text-sm">Team disappearance verification</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-400 mr-2 mt-1 text-xs">✓</span>
                        <span className="text-sm">Confirmed stolen funds reports</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="group relative bg-gradient-to-br from-purple-900/20 to-purple-800/10 rounded-xl p-1 h-48 cursor-pointer">
                  <div className="absolute inset-0 bg-black/70 rounded-xl group-hover:opacity-0 transition-opacity duration-300 flex flex-col items-center justify-center p-6">
                    <div className="bg-purple-500/20 p-3 rounded-lg mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-bold text-center mb-2">Severity Levels</h3>
                    <p className="text-gray-300 text-center text-sm">Hover to understand risks</p>
                  </div>
                  
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-5 flex flex-col justify-center">
                    <h3 className="text-lg font-bold mb-4 text-purple-400 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Risk Levels
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <span className="w-3 h-3 rounded-full bg-red-500 mr-3"></span>
                        <div>
                          <div className="font-medium text-sm">High</div>
                          <div className="text-gray-400 text-xs">Confirmed malicious activity</div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className="w-3 h-3 rounded-full bg-orange-500 mr-3"></span>
                        <div>
                          <div className="font-medium text-sm">Medium</div>
                          <div className="text-gray-400 text-xs">Suspicious behavior</div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className="w-3 h-3 rounded-full bg-yellow-500 mr-3"></span>
                        <div>
                          <div className="font-medium text-sm">Low</div>
                          <div className="text-gray-400 text-xs">Potential risk</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="group relative bg-gradient-to-br from-green-900/20 to-green-800/10 rounded-xl p-1 h-48 cursor-pointer">
                  <div className="absolute inset-0 bg-black/70 rounded-xl group-hover:opacity-0 transition-opacity duration-300 flex flex-col items-center justify-center p-6">
                    <div className="bg-green-500/20 p-3 rounded-lg mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-bold text-center mb-2">How to Report</h3>
                    <p className="text-gray-300 text-sm">Hover for reporting process</p>
                  </div>
                  
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-5 flex flex-col justify-center">
                    <h3 className="text-lg font-bold mb-4 text-green-400 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m3 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      Report Scams
                    </h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <span className="text-blue-400 mr-2">•</span>
                        <span>Join our Discord community</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-400 mr-2">•</span>
                        <span>Submit in #report-scam channel</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-400 mr-2">•</span>
                        <span>Include contract addresses</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-400 mr-2">•</span>
                        <span>Our team will review</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="group relative bg-gradient-to-br from-yellow-900/20 to-yellow-800/10 rounded-xl p-13 h-48 cursor-pointer">
                  <div className="absolute inset-0 bg-black/70 rounded-xl group-hover:opacity-0 transition-opacity duration-300 flex flex-col items-center justify-center p-6">
                    <div className="bg-yellow-500/20 p-3 rounded-lg mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-bold text-center mb-2">Disclaimer</h3>
                    <p className="text-gray-300 text-center text-sm">Hover for important info</p>
                  </div>
                  
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-5 flex flex-col justify-center">
                    <h3 className="text-lg font-bold mb-4 text-yellow-400 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 13 9 9 0 0118 0z" />
                      </svg>
                      Important Notice
                    </h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <span className="text-red-400 mr-2">•</span>
                        <span>Always do your own research (DYOR)</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-red-400 mr-2">•</span>
                        <span>Not financial advice</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-red-400 mr-2">•</span>
                        <span>Information may not be complete</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-red-400 mr-2">•</span>
                        <span>Projects may appeal their listing</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="px-4 max-w-[1500px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
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
              <button
                onClick={handleShuffle}
                disabled={isShuffling}
                className="bg-black/70 border border-white/20 rounded-xl px-4 py-3 text-white hover:bg-white/10 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <motion.svg
                  animate={{ rotate: isShuffling ? 180 : 0 }}
                  transition={{ duration: 0.5 }}
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </motion.svg>
                Shuffle
              </button>
            </div>

            <motion.div 
              key={displayedProjects.length} // This forces re-animation when projects change
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {isLoading ? (
                Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="h-80 bg-black/20 rounded-2xl animate-pulse" />
                ))
              ) : displayedProjects.length > 0 ? (
                displayedProjects.map((project, index) => (
                  <ScamProjectCard key={project.id} project={project} index={index} />
                ))
              ) : (
                <div className="col-span-full text-center py-16">
                  <h3 className="text-xl font-bold mb-2">No projects found</h3>
                  <p className="text-gray-400">Try adjusting your filters</p>
                </div>
              )}
            </motion.div>
          </section>
        </div>
      </div>
    </>
  );
}