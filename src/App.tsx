import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Linkedin, ChevronDown, ExternalLink } from 'lucide-react';

const cn = (...classes: any[]) => classes.filter(Boolean).join(' ');

// Memoized to prevent re-triggering during Nav hovers
const CountUpMetric = React.memo(({ item, delay }: { item: any, delay: number }) => {
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

  const SHOW_PLAYGROUND = false;

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
      title: 'AI-Driven Customer Interaction Optimization',
      description: 'Led AI-powered features at JustAnswer optimizing customer interactions through 70+ experiments.',
      metrics: '$15M Net LTV increase',
      fullContent: 'Extensive work on LLM integration for customer support routing. Conducted 70+ high-velocity experiments focused on reducing friction in the expert-connection funnel. This phase will be updated with technical breakdowns of the AI logic, prompt engineering strategies, and cohort analysis results that fueled the $15M LTV lift.'
    },
    {
      company: 'PARALLELS',
      title: 'Global Subscription Funnel Optimization',
      description: 'Owned end-to-end funnel optimization with data-driven testing framework at Parallels.',
      metrics: '45% conversion increase, $12M+ QRR',
      fullContent: 'Redesigned the global checkout experience for Parallels Desktop. Implemented a multi-variant testing framework that optimized pricing elasticity across European and Asian markets. Key focus on trial-to-paid conversion logic and reducing checkout abandonment via localized payment methods.'
    }
  ];

  const sideProjects = [
    {
      title: 'Project Alpha',
      subtitle: 'A specialized tool for analyzing user churn patterns in SaaS.',
      fullContent: 'This side project focused on identifying early-warning signals for churn in subscription models. I built a predictive framework that analyzes high-frequency engagement data to trigger automated recovery workflows, specifically targeting users who show a 30% drop in session frequency over a 7-day rolling window.'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white selection:bg-blue-500/30">
      
      {/* FIXED NAVIGATION UI */}
      <nav className={cn(
        "fixed left-1/2 -translate-x-1/2 z-[100] w-[calc(100%-2rem)] max-w-5xl transition-all duration-500 ease-in-out",
        navVisible ? "top-6" : "-top-24"
      )}>
        <div 
          style={{
            background: 'linear-gradient(to right, #000000 0%, #2563eb 50%, #ffffff 100%)',
            backdropFilter: 'blur(12px)'
          }}
          className="rounded-full px-1.5 py-1.5 shadow-2xl shadow-blue-500/20 border border-white/10"
        >
          <div className="flex items-center justify-between">
            {/* Logo - Fixed White */}
            <a href="#" className="flex items-center rounded-full bg-white/10 px-5 py-2.5 transition-all hover:bg-white/20">
              <span className="font-bold tracking-[0.2em] text-xs md:text-sm text-white uppercase">
                BENNETT DILLY
              </span>
            </a>

            {/* Links - Fixed Dark Slate for visibility against White background */}
            <div className="hidden md:flex items-center gap-1 pr-2">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  onMouseEnter={() => setHoveredLink(link.label)}
                  onMouseLeave={() => setHoveredLink(null)}
                  style={{ color: hoveredLink === link.label ? '#2563eb' : '#0f172a' }}
                  className="relative px-5 py-2.5 text-xs font-bold tracking-[0.2em] transition-all uppercase"
                >
                  {link.label}
                  <span
                    className={cn(
                      "absolute bottom-1.5 left-1/2 -translate-x-1/2 h-[2px] bg-blue-600 transition-all duration-300",
                      hoveredLink === link.label ? "w-6" : "w-0"
                    )}
                  />
                </a>
              ))}
            </div>

            {/* Mobile Toggle - Dark to contrast with white end of bar */}
            <button className="md:hidden pr-4 text-slate-900" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
               {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
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

      {/* Hero */}
      <section className="pt-20 pb-16 px-6 min-h-screen flex flex-col justify-center">
        <div className="max-w-5xl mx-auto w-full">
          <h1 className="text-5xl md:text-8xl font-light mb-8 leading-tight tracking-tighter">Hi, I'm Bennett.</h1>
          <p className="text-xl md:text-2xl text-gray-400 font-light mb-8">I make products less broken and more profitable.</p>
          <div className="flex flex-col gap-2">
            <p className="text-lg font-medium text-blue-500">100+ experiments. $27M+ in revenue impact.</p>
            <p className="text-sm text-gray-600 font-light italic">Good product decisions come from evidence, not opinions.</p>
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
          <h2 className="text-xs uppercase tracking-[0.3em] text-gray-600 mb-10 font-medium">About</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {achievements.map((item, index) => (
              <CountUpMetric key={index} item={item} delay={index * 150} />
            ))}
          </div>
        </div>
      </section>

      {/* Work */}
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
                <div className="text-xs font-bold text-blue-500 tracking-[0.2em] uppercase flex items-center gap-2">
                  LEARN MORE <ExternalLink size={12} />
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
              <div className="p-8 bg-blue-500/5 border border-blue-500/20 rounded-xl mb-10">
                  <div className="text-xs text-blue-500 font-bold uppercase tracking-widest mb-2">Key Impact</div>
                  <div className="text-2xl text-white font-light">{(selectedWork as any).metrics}</div>
              </div>
              <p className="text-gray-400 font-light leading-relaxed text-lg whitespace-pre-line">{(selectedWork as any).fullContent}</p>
            </div>
          )}
        </div>
      </div>

      {/* Contact */}
      <section id="contact" className="py-32 px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xs uppercase tracking-[0.3em] text-gray-600 mb-12 font-medium">Contact</h2>
          <div className="flex flex-col gap-10">
            <a href="https://linkedin.com/in/bennettdilly" className="text-xl md:text-3xl font-light text-gray-400 hover:text-white underline underline-offset-[12px] decoration-white/10 transition-all">linkedin.com/in/bennettdilly</a>
            <a href="https://calendly.com/bennettdilly/connect" className="text-xl md:text-3xl font-light text-gray-400 hover:text-white underline underline-offset-[12px] decoration-white/10 transition-all">calendly.com/bennettdilly/connect</a>
          </div>
        </div>
      </section>

      <footer className="py-16 px-6 border-t border-white/5 text-gray-700 text-[10px] tracking-[0.4em] uppercase font-medium">
        © 2026 BENNETT DILLY
      </footer>
    </div>
  );
}
