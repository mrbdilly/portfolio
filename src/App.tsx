import React, { useState } from 'react';
import { Menu, X, Linkedin, Mail, ChevronDown, ExternalLink } from 'lucide-react';

export default function PMPortfolio() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  // FEATURE FLAG: Toggle this to true to launch the Playground
  const SHOW_PLAYGROUND = false;

  // Add Helvetica Neue font
  React.useEffect(() => {
    document.body.style.fontFamily = '"Helvetica Neue", Helvetica, Arial, sans-serif';
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  // Count-up animation component - DARK MODE COMPATIBLE
  const CountUpMetric = ({ item, delay }) => {
    const [count, setCount] = useState(0);
    const [hasAnimated, setHasAnimated] = useState(false);
    const elementRef = React.useRef(null);

    React.useEffect(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            
            const metricStr = item.metric;
            let targetValue = 0;
            
            if (metricStr.includes('M')) {
              targetValue = parseFloat(metricStr.replace(/[^0-9.]/g, ''));
            } else if (metricStr.includes('%')) {
              targetValue = parseInt(metricStr.replace(/[^0-9]/g, ''));
            } else {
              targetValue = parseInt(metricStr.replace(/[^0-9]/g, ''));
            }

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

      if (elementRef.current) {
        observer.observe(elementRef.current);
      }

      return () => observer.disconnect();
    }, [hasAnimated, item.metric, delay]);

    const formatCount = (val) => {
      const metricStr = item.metric;
      
      if (metricStr.includes('$') && metricStr.includes('M')) {
        return `$${val.toFixed(0)}M+`;
      } else if (metricStr.includes('M')) {
        return `${val.toFixed(0)}M+`;
      } else if (metricStr.includes('%')) {
        return `${Math.round(val)}%`;
      } else {
        return `${Math.round(val)}+`;
      }
    };

    return (
      <div ref={elementRef}>
        <div className="text-2xl md:text-3xl font-light mb-1 text-white">{formatCount(count)}</div>
        <div className="text-sm font-medium mb-1 text-gray-200">{item.label}</div>
        <div className="text-xs text-gray-400 font-light">{item.detail}</div>
      </div>
    );
  };

  const caseStudies = [
    {
      title: 'AI-Driven Customer Interaction Optimization',
      description: 'Led AI-powered features at JustAnswer optimizing customer interactions through 70+ experiments.',
      metrics: '$15M Net LTV increase',
      company: 'JustAnswer',
      logo: '/images/ja-logo-dark.png'
    },
    {
      title: 'Global Subscription Funnel Optimization',
      description: 'Owned end-to-end funnel optimization at Parallels with data-driven testing framework.',
      metrics: '45% conversion increase, $12M+ QRR',
      company: 'Parallels',
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

  const achievements = [
    { metric: '100+', label: 'Experiments', detail: 'A/B tests on onboarding & engagement' },
    { metric: '$27M+', label: 'Revenue Impact', detail: 'JustAnswer + Parallels combined' },
    { metric: '45%', label: 'Conversion Lift', detail: 'Subscription rate optimization' },
    { metric: '20%', label: 'Trial-to-Paid', detail: 'Lifecycle strategy improvement' }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Navigation - High-Visibility Light Gradient */}
      <nav className="fixed top-0 left-0 right-0 bg-gradient-to-r from-blue-100/95 via-slate-50/95 to-white backdrop-blur-lg z-50 border-b border-white/20 shadow-lg">
        <div className="max-w-5xl mx-auto px-6 lg:px-0 py-5 flex items-center justify-between">
          <div className="text-lg font-medium text-slate-900">Bennett Dilly</div>
          
          <div className="hidden md:flex gap-10">
            {['About', 'Work', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-slate-600 hover:text-blue-600 font-medium transition-colors"
              >
                {item}
              </button>
            ))}
          </div>

          <button
            className="md:hidden text-slate-800"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-gray-200">
            <div className="flex flex-col px-6 py-4 gap-4">
              {['About', 'Work', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="text-left text-slate-600 hover:text-black transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-16 md:pt-20 pb-16 px-6 min-h-screen flex flex-col justify-center">
        <div className="max-w-5xl mx-auto lg:px-0 w-full">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-light mb-6 leading-tight text-white">
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

        {/* Centered Teaser CTA */}
        <div className="w-full flex justify-center">
          <button
            onClick={() => scrollToSection('about')}
            className="flex flex-col items-center gap-2 text-gray-500 hover:text-white transition-colors group"
          >
            <span className="text-sm md:text-base font-light">
              Curious to learn more? Keep scrolling.
            </span>
            <ChevronDown 
              size={24} 
              className="animate-bounce"
            />
          </button>
        </div>
      </section>

      {/* About + Achievements */}
      <section id="about" className="py-20 px-6 border-t border-white/10">
        <div className="max-w-5xl mx-auto lg:px-0">
          <div className="mb-16">
            <h2 className="text-sm uppercase tracking-wider text-gray-500 mb-6">About</h2>
            <p className="text-lg text-gray-300 font-light leading-relaxed mb-6 max-w-3xl">
              I build where ambiguity lives: early bets, messy funnels, unclear signals.
            </p>
            <p className="text-lg text-gray-300 font-light leading-relaxed mb-6 max-w-3xl">
              My approach? Stay curious, listen to what matters, and make decisions based on evidence, not guesswork.
            </p>
            <p className="text-lg text-gray-300 font-light leading-relaxed mb-6 max-w-3xl">
              I care about what works, why it works, and how to scale it.
            </p>
            <div className="text-sm text-gray-500 font-light">
              Experimentation · Conversational AI · Funnel Optimization · Lifecycle Strategy · Cross-functional Leadership
            </div>
          </div>

          <div>
            <h2 className="text-sm uppercase tracking-wider text-gray-500 mb-8">Impact</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-white">
              {achievements.map((item, index) => (
                <CountUpMetric key={index} item={item} delay={index * 100} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Work Section */}
      <section id="work" className="py-20 px-6 border-t border-white/10">
        <div className="max-w-5xl mx-auto lg:px-0">
          <h2 className="text-sm uppercase tracking-wider text-gray-500 mb-12">Work</h2>
          <div className="grid md:grid-cols-2 gap-12">
            {caseStudies.map((study, index) => (
              <div key={index}>
                <img 
                  src={study.logo} 
                  alt={`${study.company} logo`}
                  className="h-6 mb-3 object-contain object-left filter brightness-0 invert"
                />
                <h3 className="text-xl font-light mb-3 text-white">{study.title}</h3>
                <p className="text-sm text-gray-400 font-light leading-relaxed mb-3">
                  {study.description}
                </p>
                <div className="text-sm font-medium text-blue-400">{study.metrics}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Conditional Product Playground */}
      {SHOW_PLAYGROUND && (
        <>
          <section className="py-20 px-6 border-t border-white/10">
            <div className="max-w-5xl mx-auto lg:px-0">
              <h2 className="text-sm uppercase tracking-wider text-gray-500 mb-12">Product Playground</h2>
              <div className="grid md:grid-cols-3 gap-8">
                {sideProjects.map((project, index) => (
                  <div 
                    key={index}
                    onClick={() => setSelectedProject(project)}
                    className="group cursor-pointer block"
                  >
                    <div className="aspect-video bg-[#1a1a1a] mb-4 overflow-hidden rounded-sm border border-white/5 group-hover:border-white/20 transition-colors">
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-full object-cover opacity-60 md:grayscale md:group-hover:grayscale-0 md:group-hover:opacity-100 transition-all duration-500"
                        onError={(e) => { e.currentTarget.style.display = 'none'; }} 
                      />
                      <div className="w-full h-full flex items-center justify-center bg-[#111] text-gray-600 italic text-xs">Project Preview</div>
                    </div>
                    <h3 className="text-lg font-medium mb-1 group-hover:text-blue-400 transition-colors flex items-center gap-2 text-white">
                      {project.title} <ExternalLink size={14} className="opacity-50 md:opacity-0 md:group-hover:opacity-100 transition-opacity" />
                    </h3>
                    <p className="text-sm text-gray-400 font-light leading-relaxed">
                      {project.subtitle}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Responsive Bottom Sheet / Modal Overlay */}
          {selectedProject && (
            <div className="fixed inset-0 z-[60] flex items-end md:items-center justify-center">
              <div 
                className="absolute inset-0 bg-black/80 backdrop-blur-md"
                onClick={() => setSelectedProject(null)}
              ></div>
              
              <div className="relative w-full md:max-w-2xl bg-[#111] border-t md:border border-white/10 rounded-t-2xl md:rounded-lg shadow-2xl p-8 md:p-12 animate-in slide-in-from-bottom md:zoom-in duration-300 max-h-[90vh] overflow-y-auto">
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-6 right-6 p-2 text-gray-500 hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>
                
                <h2 className="text-2xl md:text-3xl font-light mb-2 text-white">{selectedProject.title}</h2>
                <p className="text-lg text-blue-400 font-light mb-8">{selectedProject.subtitle}</p>
                
                <div className="text-gray-300 font-light leading-relaxed border-t border-white/10 pt-6">
                  {selectedProject.fullContent}
                </div>
                
                <div className="mt-10 mb-6 md:mb-0">
                  <button 
                    onClick={() => setSelectedProject(null)}
                    className="w-full md:w-auto px-6 py-3 bg-white/5 md:bg-transparent text-sm uppercase tracking-widest font-medium text-gray-500 hover:text-white transition-colors rounded"
                  >
                    Close Project
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 border-t border-white/10">
        <div className="max-w-5xl mx-auto lg:px-0">
          <h2 className="text-sm uppercase tracking-wider text-gray-500 mb-8">Contact</h2>
          <div className="space-y-4">
            <a 
              href="https://calendly.com/bennettdilly/connect" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors group py-2"
            >
              <span className="text-xl">📅</span>
              <span className="font-light underline underline-offset-4 decoration-white/10 group-hover:decoration-white">calendly.com/bennettdilly/connect</span>
            </a>
            <a 
              href="https://linkedin.com/in/bennettdilly" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors group py-2"
            >
              <Linkedin size={20} className="text-gray-500 group-hover:text-white transition-colors" />
              <span className="font-light underline underline-offset-4 decoration-white/10 group-hover:decoration-white">linkedin.com/in/bennettdilly</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/10">
        <div className="max-w-5xl mx-auto lg:px-0">
          <p className="text-sm text-gray-600 font-light">
            © 2026 Bennett Dilly
          </p>
        </div>
      </footer>
    </div>
  );
}
