import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Linkedin, ChevronDown, ExternalLink } from 'lucide-react';

export default function PMPortfolio() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [navVisible, setNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // FEATURE FLAG: Toggle to true when Product Playground is ready
  const SHOW_PLAYGROUND = false;

  // 1. Scroll-Hide Navigation Logic
  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== 'undefined') {
        // Hide nav if scrolling down, show if scrolling up
        if (window.scrollY > lastScrollY && window.scrollY > 100) { 
          setNavVisible(false); 
        } else {
          setNavVisible(true); 
        }
        setLastScrollY(window.scrollY);
      }
    };

    window.addEventListener('scroll', controlNavbar);
    return () => window.removeEventListener('scroll', controlNavbar);
  }, [lastScrollY]);

  // 2. Global Styling (Dark Mode & Font)
  useEffect(() => {
    document.body.style.fontFamily = '"Helvetica Neue", Helvetica, Arial, sans-serif';
    document.body.style.backgroundColor = '#0a0a0a';
    document.body.style.color = '#ffffff';
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  // 3. Animated Metrics Component
  const CountUpMetric = ({ item, delay }) => {
    const [count, setCount] = useState(0);
    const [hasAnimated, setHasAnimated] = useState(false);
    const elementRef = useRef(null);

    useEffect(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            const metricStr = item.metric;
            let targetValue = parseFloat(metricStr.replace(/[^0-9.]/g, '')) || 0;
            const duration = 2000;
            const steps = 60;
            const increment = targetValue / steps;
            let current = 0;

            setTimeout(() => {
              const timer = setInterval(() => {
                current += increment;
                if (current >= targetValue) {
                  setCount(targetValue);
                  clearInterval(timer);
                } else {
                  setCount(current);
                }
              }, duration / steps);
            }, delay);
          }
        },
        { threshold: 0.3 }
      );
      if (elementRef.current) observer.observe(elementRef.current);
      return () => observer.disconnect();
    }, [hasAnimated, item.metric, delay]);

    const formatCount = (val) => {
      const metricStr = item.metric;
      if (metricStr.includes('$') && metricStr.includes('M')) return `$${val.toFixed(0)}M+`;
      if (metricStr.includes('M')) return `${val.toFixed(0)}M+`;
      if (metricStr.includes('%')) return `${Math.round(val)}%`;
      return `${Math.round(val)}+`;
    };

    return (
      <div ref={elementRef}>
        <div className="text-2xl md:text-3xl font-light mb-1 text-blue-400">{formatCount(count)}</div>
        <div className="text-sm font-medium mb-1 text-gray-200">{item.label}</div>
        <div className="text-xs text-gray-400 font-light">{item.detail}</div>
      </div>
    );
  };

  // 4. Content Data
  const achievements = [
    { metric: '100+', label: 'Experiments', detail: 'A/B tests on onboarding & engagement' },
    { metric: '$27M+', label: 'Revenue Impact', detail: 'JustAnswer + Parallels combined' },
    { metric: '45%', label: 'Conversion Lift', detail: 'Subscription rate optimization' },
    { metric: '20%', label: 'Trial-to-Paid', detail: 'Lifecycle strategy improvement' }
  ];

  const caseStudies = [
    {
      company: 'JUSTANSWER',
      title: 'AI-Driven Customer Interaction Optimization',
      description: 'Led AI-powered features at JustAnswer optimizing customer interactions through 70+ experiments.',
      metrics: '$15M Net LTV increase',
      logo: '/images/ja-logo-dark.png'
    },
    {
      company: 'PARALLELS',
      title: 'Global Subscription Funnel Optimization',
      description: 'Owned end-to-end funnel optimization with data-driven testing framework at Parallels.',
      metrics: '45% conversion increase, $12M+ QRR',
      logo: '/images/parallels-logo-dark.png'
    }
  ];

  const sideProjects = [
    {
      title: 'Project Alpha',
      subtitle: 'A specialized tool for analyzing user churn patterns in SaaS.',
      image: '/images/project-alpha.png',
      fullContent: 'This side project focused on identifying early-warning signals for churn in subscription models. I built a predictive framework that analyzes high-frequency engagement data to trigger automated recovery workflows, specifically targeting users who show a 30% drop in session frequency over a 7-day rolling window.'
    },
    {
      title: 'Market Pulse AI',
      subtitle: 'LLM-powered dashboard for real-time competitor sentiment analysis.',
      image: '/images/project-beta.png',
      fullContent: 'Using a combination of web-scraping and LLM categorization, Market Pulse allows product teams to see how users are reacting to competitor feature launches in real-time. It transforms qualitative social sentiment into structured data, allowing for rapid-response product positioning.'
    },
    {
      title: 'OnboardFlow',
      subtitle: 'Custom framework for testing B2B onboarding friction points.',
      image: '/images/project-gamma.png',
      fullContent: 'OnboardFlow is a lightweight experimentation layer designed to isolate the "Aha! moment." It tracks user velocity through the initial setup and identifies specific UI elements causing drop-offs, reducing time-to-value by an average of 18% in initial beta tests.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-blue-500/30">
      
      {/* 5. Modernized Floating Pill Nav with High-Contrast Gradient */}
      <nav className={`fixed left-1/2 -translate-x-1/2 w-[90%] max-w-4xl z-50 transition-all duration-500 ease-in-out ${navVisible ? 'top-6' : '-top-24'}`}>
        <div className="bg-gradient-to-r from-blue-400/90 via-indigo-50/95 to-white backdrop-blur-2xl border border-white/40 rounded-full px-8 py-3 shadow-[0_10px_40px_rgba(59,130,246,0.2)] flex items-center justify-between transition-all duration-500 hover:scale-[1.01]">
          <div className="text-sm font-bold tracking-widest text-slate-900 uppercase">Bennett Dilly</div>
          
          <div className="hidden md:flex items-center gap-10">
            {['About', 'Work', 'Contact'].map((item) => (
              <button 
                key={item} 
                onClick={() => scrollToSection(item.toLowerCase())} 
                className="relative text-xs font-bold text-slate-700 hover:text-blue-700 transition-colors group tracking-wide uppercase"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
          </div>

          <button className="md:hidden text-slate-900" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="absolute top-16 left-0 right-0 bg-gradient-to-b from-white to-blue-50 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl animate-in fade-in zoom-in-95 duration-300">
            <div className="flex flex-col gap-6">
              {['About', 'Work', 'Contact'].map((item) => (
                <button 
                  key={item} 
                  onClick={() => scrollToSection(item.toLowerCase())} 
                  className="text-left text-base font-bold text-slate-800 hover:text-blue-600 uppercase"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* 6. Hero Section */}
      <section className="pt-16 md:pt-20 pb-16 px-6 min-h-screen flex flex-col justify-center">
        <div className="max-w-5xl mx-auto lg:px-0 w-full">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-7xl font-light mb-6 leading-tight text-white">
              Hi, I'm Bennett.
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 font-light mb-6">
              I make products less broken and more profitable.
            </p>
            <p className="text-lg text-gray-400 font-light leading-relaxed mb-6">
              Over the past decade, I've shipped products across SaaS and e-commerce that people actually use — and that move the revenue needle.
            </p>
            <p className="text-lg font-medium mb-3 text-blue-400">
              100+ experiments. $27M+ in revenue impact.
            </p>
            <p className="text-base text-gray-500 font-light italic mb-20 md:mb-24">
              Because good product decisions come from evidence, not opinions.
            </p>
          </div>
        </div>
        <div className="w-full flex justify-center">
          <button onClick={() => scrollToSection('about')} className="flex flex-col items-center gap-2 text-gray-500 hover:text-white transition-colors group">
            <span className="text-sm md:text-base font-light">Curious to learn more? Keep scrolling.</span>
            <ChevronDown size={24} className="animate-bounce" />
          </button>
        </div>
      </section>

      {/* 7. About Section */}
      <section id="about" className="py-24 px-6 border-t border-white/10">
        <div className="max-w-5xl mx-auto lg:px-0">
          <div className="mb-20">
            <h2 className="text-sm uppercase tracking-wider text-gray-500 mb-8 font-bold">About</h2>
            <p className="text-lg md:text-xl text-gray-300 font-light leading-relaxed mb-8 max-w-3xl">
              I build where ambiguity lives: early bets, messy funnels, unclear signals.
            </p>
            <p className="text-lg md:text-xl text-gray-300 font-light leading-relaxed mb-8 max-w-3xl">
              My approach? Stay curious, listen to what matters, and make decisions based on evidence, not guesswork.
            </p>
            <p className="text-lg md:text-xl text-gray-300 font-light leading-relaxed mb-8 max-w-3xl">
              I care about what works, why it works, and how to scale it.
            </p>
            <div className="text-sm text-gray-500 font-light italic tracking-wide">
              Experimentation · Conversational AI · Funnel Optimization · Lifecycle Strategy · Cross-functional Leadership
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {achievements.map((item, index) => (
              <CountUpMetric key={index} item={item} delay={index * 150} />
            ))}
          </div>
        </div>
      </section>

      {/* 8. Work Section */}
      <section id="work" className="py-24 px-6 border-t border-white/10">
        <div className="max-w-5xl mx-auto lg:px-0">
          <h2 className="text-sm uppercase tracking-wider text-gray-500 mb-16 font-bold">Work</h2>
          <div className="grid md:grid-cols-2 gap-20 text-white">
            {caseStudies.map((study, index) => (
              <div key={index} className="group">
                <div className="text-gray-500 font-bold tracking-tighter text-2xl mb-6 group-hover:text-white transition-colors uppercase">
                  {study.company}
                </div>
                <h3 className="text-2xl font-light mb-4">{study.title}</h3>
                <p className="text-gray-400 font-light leading-relaxed mb-6">
                  {study.description}
                </p>
                <div className="text-sm font-bold text-blue-400 tracking-wide uppercase">
                  {study.metrics}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Conditional Product Playground + Responsive Bottom Sheet */}
      {SHOW_PLAYGROUND && (
        <>
          <section id="playground" className="py-24 px-6 border-t border-white/10">
            <div className="max-w-5xl mx-auto lg:px-0">
              <h2 className="text-sm uppercase tracking-wider text-gray-500 mb-16 font-bold">Product Playground</h2>
              <div className="grid md:grid-cols-3 gap-10">
                {sideProjects.map((project, index) => (
                  <div 
                    key={index} 
                    onClick={() => setSelectedProject(project)} 
                    className="group cursor-pointer block"
                  >
                    <div className="aspect-video bg-slate-900 mb-6 overflow-hidden rounded-sm border border-white/5 group-hover:border-blue-500/50 transition-all duration-500">
                      <div className="w-full h-full flex items-center justify-center text-slate-700 italic text-xs">Project Preview</div>
                    </div>
                    <h3 className="text-lg font-medium mb-2 text-slate-200 group-hover:text-blue-400 transition-colors flex items-center gap-2">
                      {project.title} <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h3>
                    <p className="text-sm text-slate-500 font-light leading-relaxed">
                      {project.subtitle}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Detailed Project Overlay (Modal) */}
          {selectedProject && (
            <div className="fixed inset-0 z-[60] flex items-end md:items-center justify-center">
              <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={() => setSelectedProject(null)}></div>
              <div className="relative w-full md:max-w-2xl bg-[#0a0a0a] border-t md:border border-white/10 rounded-t-3xl md:rounded-2xl shadow-2xl p-8 md:p-12 animate-in slide-in-from-bottom md:zoom-in duration-300 max-h-[90vh] overflow-y-auto">
                <button onClick={() => setSelectedProject(null)} className="absolute top-6 right-6 p-2 text-gray-500 hover:text-white transition-colors">
                  <X size={24} />
                </button>
                <h2 className="text-3xl font-light mb-2 text-white">{selectedProject.title}</h2>
                <p className="text-xl text-blue-400 font-light mb-8">{selectedProject.subtitle}</p>
                <div className="text-gray-300 font-light leading-relaxed border-t border-white/10 pt-8 text-lg">
                  {selectedProject.fullContent}
                </div>
                <button onClick={() => setSelectedProject(null)} className="mt-12 w-full py-4 bg-white/5 text-gray-400 hover:text-white rounded-xl border border-white/10 transition-colors uppercase tracking-widest text-xs font-bold">
                  Close Project
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {/* 10. Contact Section */}
      <section id="contact" className="py-32 px-6 border-t border-white/10">
        <div className="max-w-5xl mx-auto lg:px-0">
          <h2 className="text-sm uppercase tracking-wider text-gray-500 mb-12 font-bold">Contact</h2>
          <div className="flex flex-col gap-8">
            <a href="https://linkedin.com/in/bennettdilly" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-gray-300 hover:text-white transition-all group py-2">
              <Linkedin size={24} className="text-blue-500 group-hover:scale-110 transition-transform" />
              <span className="text-xl md:text-2xl font-light underline underline-offset-8 decoration-white/10 group-hover:decoration-blue-500">linkedin.com/in/bennettdilly</span>
            </a>
          </div>
        </div>
      </section>

      {/* 11. Footer */}
      <footer className="py-16 px-6 border-t border-white/10">
        <div className="max-w-5xl mx-auto lg:px-0 flex justify-between items-center text-gray-600 text-[10px] tracking-[0.2em] uppercase font-bold">
          <div>© 2026 BENNETT DILLY</div>
          <div>BUILT FOR SCALE</div>
        </div>
      </footer>
    </div>
  );
}
