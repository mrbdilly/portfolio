import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Linkedin, ChevronDown, ExternalLink } from 'lucide-react';

export default function PMPortfolio() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedWork, setSelectedWork] = useState(null);
  const [navVisible, setNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const SHOW_PLAYGROUND = false;

  // 1. Precision Scroll-Hide Logic (10px Trigger)
  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== 'undefined') {
        const currentScrollY = window.scrollY;
        if (currentScrollY > lastScrollY && currentScrollY > 10) { 
          setNavVisible(false); 
        } else {
          setNavVisible(true); 
        }
        setLastScrollY(currentScrollY);
      }
    };
    window.addEventListener('scroll', controlNavbar);
    return () => window.removeEventListener('scroll', controlNavbar);
  }, [lastScrollY]);

  // 2. Pure Black Theme Style
  useEffect(() => {
    document.body.style.fontFamily = '"Helvetica Neue", Helvetica, Arial, sans-serif';
    document.body.style.backgroundColor = '#000000';
    document.body.style.color = '#ffffff';
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

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
        <div className="text-2xl md:text-3xl font-light mb-1 text-blue-500">{formatCount(count)}</div>
        <div className="text-sm font-medium mb-1 text-gray-200">{item.label}</div>
        <div className="text-xs text-gray-500 font-light">{item.detail}</div>
      </div>
    );
  };

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
      fullContent: 'Extensive work on LLM integration for customer support routing. Conducted 70+ high-velocity experiments focused on reducing friction in the expert-connection funnel. This phase will be updated with technical breakdowns of the AI logic and cohort analysis results.'
    },
    {
      company: 'PARALLELS',
      title: 'Global Subscription Funnel Optimization',
      description: 'Owned end-to-end funnel optimization with data-driven testing framework at Parallels.',
      metrics: '45% conversion increase, $12M+ QRR',
      fullContent: 'Redesigned the global checkout experience for Parallels Desktop. Implemented a multi-variant testing framework that optimized pricing elasticity across European and Asian markets. This phase will be updated with localized conversion data and UX wireframes.'
    }
  ];

  const sideProjects = [
    {
      title: 'Project Alpha',
      subtitle: 'A specialized tool for analyzing user churn patterns in SaaS.',
      fullContent: 'This side project focused on identifying early-warning signals for churn in subscription models. I built a predictive framework that analyzes high-frequency engagement data to trigger automated recovery workflows.'
    },
    {
      title: 'Market Pulse AI',
      subtitle: 'LLM-powered dashboard for real-time competitor sentiment analysis.',
      fullContent: 'Using a combination of web-scraping and LLM categorization, Market Pulse allows product teams to see how users are reacting to competitor feature launches in real-time.'
    },
    {
      title: 'OnboardFlow',
      subtitle: 'Custom framework for testing B2B onboarding friction points.',
      fullContent: 'OnboardFlow is a lightweight experimentation layer designed to isolate the "Aha! moment" and reduce time-to-value.'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white selection:bg-blue-500/30">
      
      {/* 5. Minimalist Nav - Black to Blue to White Gradient */}
      <nav className={`fixed left-1/2 -translate-x-1/2 w-[90%] max-w-4xl z-50 transition-all duration-500 ease-in-out ${navVisible ? 'top-6' : '-top-24'}`}>
        <div className="bg-gradient-to-r from-black via-blue-600 to-white backdrop-blur-xl border border-white/20 rounded-full px-8 py-3 shadow-2xl flex items-center justify-between">
          <div className="text-sm font-medium tracking-[0.2em] text-white uppercase">Bennett Dilly</div>
          
          <div className="hidden md:flex items-center gap-10">
            {['About', 'Work', 'Contact'].map((item) => (
              <button 
                key={item} 
                onClick={() => scrollToSection(item.toLowerCase())} 
                className="relative text-xs font-light text-slate-900 hover:text-blue-800 transition-colors group tracking-[0.15em] uppercase"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-slate-900 transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
          </div>

          <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="absolute top-16 left-0 right-0 bg-black border border-white/10 rounded-3xl p-8 animate-in fade-in zoom-in-95 duration-300">
            <div className="flex flex-col gap-6">
              {['About', 'Work', 'Contact'].map((item) => (
                <button key={item} onClick={() => scrollToSection(item.toLowerCase())} className="text-left text-sm font-medium text-white uppercase tracking-widest">
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* 6. Hero Section - Restored CTA */}
      <section className="pt-16 md:pt-20 pb-16 px-6 min-h-screen flex flex-col justify-center">
        <div className="max-w-5xl mx-auto lg:px-0 w-full">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-8xl font-light mb-8 leading-tight text-white tracking-tighter">Hi, I'm Bennett.</h1>
            <p className="text-xl md:text-2xl text-gray-400 font-light mb-8">I make products less broken and more profitable.</p>
            <p className="text-lg text-gray-500 font-light leading-relaxed mb-10 max-w-2xl">Over the past decade, I've shipped products across SaaS and e-commerce that move the revenue needle through evidence-based decisions.</p>
            <div className="flex flex-col gap-2">
              <p className="text-lg font-medium text-blue-500">100+ experiments. $27M+ in revenue impact.</p>
              <p className="text-sm text-gray-600 font-light italic">Good product decisions come from evidence, not opinions.</p>
            </div>
          </div>
        </div>
        
        {/* Restored White Teaser CTA */}
        <div className="w-full flex justify-center mt-12">
          <button onClick={() => scrollToSection('about')} className="flex flex-col items-center gap-2 text-white hover:text-blue-400 transition-colors group">
            <span className="text-sm md:text-base font-light">Curious to learn more? Keep scrolling.</span>
            <ChevronDown size={24} className="animate-bounce" />
          </button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto lg:px-0">
          <div className="mb-20">
            <h2 className="text-xs uppercase tracking-[0.3em] text-gray-600 mb-10 font-medium">About</h2>
            <p className="text-lg md:text-xl text-gray-300 font-light leading-relaxed mb-8 max-w-3xl">I build where ambiguity lives: early bets, messy funnels, unclear signals.</p>
            <p className="text-lg md:text-xl text-gray-300 font-light leading-relaxed mb-10 max-w-3xl">My approach? Stay curious, listen to what matters, and make decisions based on evidence, not guesswork.</p>
            <div className="text-xs text-gray-600 font-light italic tracking-widest">EXPERIMENTATION · AI · OPTIMIZATION · LIFECYCLE</div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {achievements.map((item, index) => (
              <CountUpMetric key={index} item={item} delay={index * 150} />
            ))}
          </div>
        </div>
      </section>

      {/* Work Section - Modal-Ready */}
      <section id="work" className="py-24 px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto lg:px-0">
          <h2 className="text-xs uppercase tracking-[0.3em] text-gray-600 mb-16 font-medium">Work</h2>
          <div className="grid md:grid-cols-2 gap-20">
            {caseStudies.map((study, index) => (
              <div 
                key={index} 
                onClick={() => setSelectedWork(study)}
                className="group cursor-pointer"
              >
                <div className="text-gray-600 font-bold tracking-tighter text-2xl mb-6 uppercase group-hover:text-white transition-colors">{study.company}</div>
                <h3 className="text-2xl font-light mb-4 text-gray-200 group-hover:text-blue-500 transition-colors">{study.title}</h3>
                <p className="text-gray-500 font-light leading-relaxed mb-6">{study.description}</p>
                <div className="text-xs font-bold text-blue-500 tracking-[0.2em] uppercase flex items-center gap-2">
                  View Case Study <ExternalLink size={12} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Work Detail Modal */}
      {selectedWork && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-black/95 backdrop-blur-sm" onClick={() => setSelectedWork(null)}></div>
          <div className="relative w-full md:max-w-3xl bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 md:p-16 animate-in zoom-in-95 duration-300">
            <button onClick={() => setSelectedWork(null)} className="absolute top-8 right-8 text-gray-500 hover:text-white"><X size={24} /></button>
            <div className="text-blue-500 text-xs font-bold tracking-[0.3em] mb-4 uppercase">{selectedWork.company}</div>
            <h2 className="text-3xl md:text-4xl font-light mb-6 text-white">{selectedWork.title}</h2>
            <div className="h-px w-full bg-white/10 mb-10" />
            <div className="text-gray-400 font-light leading-relaxed text-lg space-y-6">
              <p>{selectedWork.fullContent}</p>
            </div>
            <div className="mt-12 p-6 bg-white/5 rounded-xl border border-white/5">
              <div className="text-xs text-gray-500 uppercase tracking-widest mb-2">Key Outcome</div>
              <div className="text-xl font-light text-white">{selectedWork.metrics}</div>
            </div>
          </div>
        </div>
      )}

      {/* Product Playground - Logic Preserved */}
      {SHOW_PLAYGROUND && (
        <section id="playground" className="py-24 px-6 border-t border-white/5">
          <div className="max-w-5xl mx-auto lg:px-0">
            <h2 className="text-xs uppercase tracking-[0.3em] text-gray-600 mb-16 font-medium">Product Playground</h2>
            <div className="grid md:grid-cols-3 gap-10">
              {sideProjects.map((p, i) => (
                <div key={i} onClick={() => setSelectedProject(p)} className="cursor-pointer group">
                  <div className="aspect-video bg-slate-900 mb-6 rounded-sm border border-white/5 group-hover:border-blue-500/50"></div>
                  <h3 className="text-lg font-medium mb-2 text-slate-200 group-hover:text-blue-400">{p.title}</h3>
                  <p className="text-sm text-slate-500 font-light">{p.subtitle}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      <section id="contact" className="py-32 px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto lg:px-0">
          <h2 className="text-xs uppercase tracking-[0.3em] text-gray-600 mb-12 font-medium">Contact</h2>
          <div className="flex flex-col gap-10">
            <a href="https://calendly.com/bennettdilly/connect" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-gray-400 hover:text-white transition-all group py-2">
              <span className="text-2xl text-blue-500 group-hover:scale-110 transition-transform">📅</span>
              <span className="text-xl md:text-3xl font-light underline underline-offset-[12px] decoration-white/10 group-hover:decoration-blue-500">calendly.com/bennettdilly/connect</span>
            </a>
            <a href="https://linkedin.com/in/bennettdilly" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-gray-400 hover:text-white transition-all group py-2">
              <Linkedin size={24} className="text-blue-500 group-hover:scale-110 transition-transform" />
              <span className="text-xl md:text-3xl font-light underline underline-offset-[12px] decoration-white/10 group-hover:decoration-blue-500">linkedin.com/in/bennettdilly</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto lg:px-0 text-gray-700 text-[10px] tracking-[0.4em] uppercase font-medium">
          © 2026 BENNETT DILLY
        </div>
      </footer>
    </div>
  );
}
