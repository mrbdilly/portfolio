import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Linkedin, ChevronDown, ChevronRight } from 'lucide-react';

const cn = (...classes: any[]) => classes.filter(Boolean).join(' ');

// Fixed metrics component with proper one-time animation
const CountUpMetric = React.memo(({ item, delay }: { item: any, delay: number }) => {
  const [count, setCount] = useState(0);
  const hasAnimatedRef = useRef(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimatedRef.current) {
          hasAnimatedRef.current = true;
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
  }, [item.metric, delay]);

  const formatCount = (val: number) => {
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
});

export default function PMPortfolio() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedWork, setSelectedWork] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [navVisible, setNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  const navLinks = [
    { label: "ABOUT", href: "#about" },
    { label: "WORK", href: "#work" },
    { label: "CONTACT", href: "#contact" },
  ];

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

  useEffect(() => {
    document.body.style.backgroundColor = '#000000';
    document.body.style.color = '#ffffff';
    document.body.style.overflow = (selectedWork || selectedProject) ? 'hidden' : 'auto';
  }, [selectedWork, selectedProject]);

  const scrollToSection = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    document.getElementById(id.replace('#', ''))?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
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
      title: 'Driving Growth with AI-Powered Customer Journeys',
      description: 'Owned strategy and execution of AI-driven funnel experiences, improving conversion while strengthening onboarding and retention.',
      metrics: '$15M Net LTV increase',
      fullContent: {
        keyImpact: [
          '$15M+ incremental LTV',
          'Double-digit CR lift (mobile + desktop)',
          '70+ experiments shipped',
          'End-to-end ownership of AI-powered customer experiences'
        ],
        problem: 'Users were dropping off between asking questions and converting to paid subscriptions. Friction and unclear value messaging reduced conversion, while onboarding and retention had room for improvement.',
        role: 'Owned strategy and execution as Product Manager, leading experiments and shipping AI-powered solutions end-to-end.',
        approach: [
          'Mapped the full funnel and prioritized friction points for experimentation.',
          'Ran 70+ hypothesis-driven experiments, focusing on AI-powered personalization and trust cues.',
          'Optimized conversion, onboarding, and retention across mobile and desktop.'
        ],
        keyImpactRepeat: [
          '$15M+ incremental LTV',
          'Double-digit CR lift (mobile + desktop)',
          '70+ experiments shipped',
          'End-to-end ownership of AI-powered customer experiences'
        ],
        insight: 'Small, data-driven improvements compounded into meaningful growth, showing that AI works best as a product lever –– not a gimmick.'
      }
    },
    {
      company: 'PARALLELS',
      title: 'Revenue by Design: Experiments That Scale',
      description: 'Owned strategy and execution of growth-focused initiatives for software products, optimizing conversion, onboarding, and retention across multiple channels.',
      metrics: '45% conversion increase, $12M+ QRR',
      fullContent: {
        keyImpact: [
          '$12M+ quarterly recurring revenue generated via A/B testing',
          '45% increase in global subscription rates',
          '20% lift in conversion across funnels',
          '40+ experiments shipped'
        ],
        problem: 'Subscription funnels across global markets had friction points that limited overall growth –– users dropped off during onboarding, conversion was inconsistent, and retention could be improved.',
        role: 'As Sr. E-Commerce Marketing Manager, owned strategy and execution, collaborating with UX, Engineering, and Product to optimize funnels end-to-end.',
        approach: [
          'Ran hypothesis-driven experiments across the full subscription lifecycle to improve conversion and retention.',
          'Optimized onboarding flows, landing pages, email campaigns, and in-app messaging using iterative A/B testing.',
          'Partnered with cross-functional teams to translate customer insights into feature enhancements and validate releases.'
        ],
        keyImpactRepeat: [
          '$12M+ quarterly recurring revenue generated via A/B testing',
          '45% increase in global subscription rates',
          '20% lift in conversion across funnels',
          '40+ experiments shipped'
        ],
        insight: 'Iterative, data-driven improvements across the subscription lifecycle consistently drove measurable growth, showing that small, targeted experiments compound into significant revenue impact.'
      }
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white selection:bg-blue-500/30" style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}>
      
      {/* CLASSIC NAVIGATION BAR */}
      <nav className={cn(
        "fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ease-in-out",
        navVisible ? "translate-y-0" : "-translate-y-full"
      )}>
        <div 
          className="px-6 md:px-12 py-4 backdrop-blur-xl"
          style={{
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
          }}
        >
          <div className="max-w-7xl mx-auto flex items-center justify-end">
            {/* Links - Right aligned */}
            <div className="flex items-center gap-1">
              <a
                href="#about"
                onClick={(e) => scrollToSection(e, '#about')}
                onMouseEnter={() => setHoveredLink('ABOUT')}
                onMouseLeave={() => setHoveredLink(null)}
                style={{ color: hoveredLink === 'ABOUT' ? '#60a5fa' : '#d1d5db' }}
                className="relative px-5 py-2.5 text-xs font-bold tracking-[0.2em] transition-all uppercase"
              >
                ABOUT
                <span
                  className={cn(
                    "absolute bottom-1.5 left-1/2 -translate-x-1/2 h-[2px] bg-blue-500 transition-all duration-300",
                    hoveredLink === 'ABOUT' ? "w-6" : "w-0"
                  )}
                />
              </a>
              <a
                href="#work"
                onClick={(e) => scrollToSection(e, '#work')}
                onMouseEnter={() => setHoveredLink('WORK')}
                onMouseLeave={() => setHoveredLink(null)}
                style={{ color: hoveredLink === 'WORK' ? '#60a5fa' : '#d1d5db' }}
                className="relative px-5 py-2.5 text-xs font-bold tracking-[0.2em] transition-all uppercase"
              >
                WORK
                <span
                  className={cn(
                    "absolute bottom-1.5 left-1/2 -translate-x-1/2 h-[2px] bg-blue-500 transition-all duration-300",
                    hoveredLink === 'WORK' ? "w-6" : "w-0"
                  )}
                />
              </a>
              <a
                href="#contact"
                onClick={(e) => scrollToSection(e, '#contact')}
                onMouseEnter={() => setHoveredLink('CONTACT')}
                onMouseLeave={() => setHoveredLink(null)}
                style={{ color: hoveredLink === 'CONTACT' ? '#60a5fa' : '#d1d5db' }}
                className="relative px-5 py-2.5 text-xs font-bold tracking-[0.2em] transition-all uppercase"
              >
                CONTACT
                <span
                  className={cn(
                    "absolute bottom-1.5 left-1/2 -translate-x-1/2 h-[2px] bg-blue-500 transition-all duration-300",
                    hoveredLink === 'CONTACT' ? "w-6" : "w-0"
                  )}
                />
              </a>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="absolute top-16 left-0 right-0 bg-black/95 backdrop-blur-xl border border-white/10 rounded-3xl p-8 animate-in fade-in zoom-in-95 duration-300">
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <button key={link.label} onClick={(e) => scrollToSection(e, link.href)} className="text-left text-sm font-bold text-white uppercase tracking-widest">
                  {link.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero - Enhanced for recruiters */}
      <section className="pt-20 pb-16 px-6 min-h-screen flex flex-col justify-center">
        <div className="max-w-5xl mx-auto w-full">
          <h1 className="text-5xl md:text-8xl font-light mb-8 leading-tight tracking-tighter">Hi, I'm Bennett.</h1>
          <p className="text-xl md:text-3xl text-gray-300 font-light mb-6">I make products less broken and more profitable.</p>
          <div className="flex flex-col gap-3 mb-8">
            <p className="text-lg md:text-xl font-medium text-blue-400">100+ experiments. $27M+ in revenue impact.</p>
            <p className="text-base md:text-lg text-gray-500 font-light">Experimentation · Conversational AI · Funnel Optimization · Lifecycle Strategy</p>
          </div>
        </div>
        <div className="w-full flex justify-center mt-12">
          <button onClick={(e) => scrollToSection(e, '#about')} className="flex flex-col items-center gap-2 text-white hover:text-blue-400 transition-colors group">
            <span className="text-sm md:text-base font-light tracking-wide">Curious to learn more? Keep scrolling.</span>
            <ChevronDown size={24} className="animate-bounce" />
          </button>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-24 px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xs uppercase tracking-[0.3em] text-gray-600 mb-4 font-medium">About</h2>
          <p className="text-xl md:text-2xl text-gray-400 font-light mb-16 max-w-3xl">
           I help companies design and ship products that solve real problems, using user research and experimentation to drive growth. I build AI-powered features that scale, creating experiences that delight users, optimize key funnels, and deliver measurable business impact.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {achievements.map((item, index) => (
              <CountUpMetric key={index} item={item} delay={index * 150} />
            ))}
          </div>
        </div>
      </section>

      {/* Work - Enhanced descriptions for recruiters */}
      <section id="work" className="py-24 px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xs uppercase tracking-[0.3em] text-gray-600 mb-16 font-medium">Work</h2>
          <div className="grid md:grid-cols-2 gap-20">
            {caseStudies.map((study, index) => (
              <div 
                key={index} 
                onClick={() => setSelectedWork(study as any)}
                className="group cursor-pointer border-l border-white/5 pl-8 hover:border-blue-500 transition-all duration-500"
              >
                <div className="text-gray-600 font-bold tracking-tighter text-2xl mb-6 uppercase group-hover:text-white transition-colors">{study.company}</div>
                <h3 className="text-2xl font-light mb-4 text-gray-200 group-hover:text-blue-500 transition-colors">{study.title}</h3>
                <p className="text-sm text-gray-500 mb-6 font-light leading-relaxed">{study.description}</p>
                <div className="text-sm font-bold text-blue-400 mb-4">{study.metrics}</div>
                <div className="text-xs font-bold text-blue-500 tracking-[0.2em] uppercase flex items-center gap-2">
                  LEARN MORE <ChevronRight size={16} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Side-Peek Drawer */}
      <div className={cn("fixed inset-0 z-[110] transition-visibility duration-500", selectedWork ? "visible" : "invisible")}>
        <div className={cn("absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-500", selectedWork ? "opacity-100" : "opacity-0")} onClick={() => setSelectedWork(null)} />
        <div className={cn("absolute top-0 right-0 h-full w-full md:w-[650px] bg-[#050505] border-l border-white/10 transition-transform duration-500 ease-out transform", selectedWork ? "translate-x-0" : "translate-x-full")}>
          {selectedWork && (
            <div className="h-full flex flex-col p-8 md:p-16 overflow-y-auto">
              <button onClick={() => setSelectedWork(null)} className="flex items-center gap-2 text-gray-500 hover:text-white mb-12 transition-colors uppercase text-[10px] tracking-[0.3em] font-bold">
                <X size={16} /> Close
              </button>
              <div className="text-blue-500 text-xs font-bold tracking-[0.4em] mb-4 uppercase">{(selectedWork as any).company}</div>
              <h2 className="text-3xl md:text-5xl font-light mb-10 leading-tight">{(selectedWork as any).title}</h2>
              
              {/* Key Impact Box */}
              <div className="p-8 bg-blue-500/5 border border-blue-500/20 rounded-xl mb-10">
                <div className="text-xs text-blue-500 font-bold uppercase tracking-widest mb-4">Key Impact</div>
                <ul className="space-y-2">
                  {(selectedWork as any).fullContent?.keyImpact?.map((item: string, idx: number) => (
                    <li key={idx} className="text-base text-white font-light flex items-start">
                      <span className="text-blue-500 mr-3">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Structured Content */}
              {(selectedWork as any).fullContent?.problem && (
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-white mb-3">Problem</h3>
                  <p className="text-gray-400 font-light leading-relaxed">{(selectedWork as any).fullContent.problem}</p>
                </div>
              )}

              {(selectedWork as any).fullContent?.role && (
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-white mb-3">Role</h3>
                  <p className="text-gray-400 font-light leading-relaxed">{(selectedWork as any).fullContent.role}</p>
                </div>
              )}

              {(selectedWork as any).fullContent?.approach && (
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-white mb-3">Approach</h3>
                  <ul className="space-y-2">
                    {(selectedWork as any).fullContent.approach.map((item: string, idx: number) => (
                      <li key={idx} className="text-gray-400 font-light leading-relaxed flex items-start">
                        <span className="text-blue-500 mr-3 mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {(selectedWork as any).fullContent?.keyImpactRepeat && (
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-white mb-3">Key Impact</h3>
                  <ul className="space-y-2">
                    {(selectedWork as any).fullContent.keyImpactRepeat.map((item: string, idx: number) => (
                      <li key={idx} className="text-gray-400 font-light leading-relaxed flex items-start">
                        <span className="text-blue-500 mr-3">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {(selectedWork as any).fullContent?.insight && (
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-white mb-3">Insight</h3>
                  <p className="text-gray-400 font-light leading-relaxed">{(selectedWork as any).fullContent.insight}</p>
                </div>
              )}

              {/* Fallback for old format */}
              {typeof (selectedWork as any).fullContent === 'string' && (
                <p className="text-gray-400 font-light leading-relaxed text-lg whitespace-pre-line">{(selectedWork as any).fullContent}</p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Contact */}
      <section id="contact" className="py-32 px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xs uppercase tracking-[0.3em] text-gray-600 mb-12 font-medium">Contact</h2>
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
            <a 
              href="https://calendly.com/bennettdilly/connect" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group px-8 py-4 rounded-full font-medium text-white transition-all text-lg"
              style={{ backgroundColor: '#12ab0f' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 0 30px rgba(18, 171, 15, 0.6)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              Let's talk
            </a>
            <a 
              href="https://linkedin.com/in/bennettdilly" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-8 py-4 rounded-full font-medium text-gray-400 border border-gray-700 hover:border-gray-500 hover:text-white transition-all text-lg flex items-center gap-3"
            >
              <Linkedin size={20} />
              Or connect on LinkedIn
            </a>
          </div>
        </div>
      </section>

      <footer className="py-16 px-6 border-t border-white/5 text-gray-700 text-[10px] tracking-[0.4em] uppercase font-medium">
        © 2026 BENNETT DILLY
      </footer>
    </div>
  );
}
