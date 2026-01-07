import React, { useState } from 'react';
import { Menu, X, Linkedin, Mail } from 'lucide-react';

export default function PMPortfolio() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Add Helvetica Neue font
  React.useEffect(() => {
    document.body.style.fontFamily = '"Helvetica Neue", Helvetica, Arial, sans-serif';
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  // Count-up animation component
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
        <div className="text-3xl font-light mb-1">{formatCount(count)}</div>
        <div className="text-sm font-medium mb-1">{item.label}</div>
        <div className="text-xs text-gray-500 font-light">{item.detail}</div>
      </div>
    );
  };

  const caseStudies = [
    {
      title: 'AI-Driven Customer Interaction Optimization',
      description: 'Led AI-powered features at JustAnswer optimizing customer interactions through 70+ experiments.',
      metrics: '$15M Net LTV increase',
      company: 'JustAnswer',
      logo: '/images/ja-logo.png'
    },
    {
      title: 'Global Subscription Funnel Optimization',
      description: 'Owned end-to-end funnel optimization at Parallels with data-driven testing framework.',
      metrics: '45% conversion increase, $12M+ QRR',
      company: 'Parallels',
      logo: '/images/parallels-logo.png'
    }
  ];

  const achievements = [
    { metric: '100+', label: 'Experiments', detail: 'A/B tests on onboarding & engagement' },
    { metric: '$27M+', label: 'Revenue Impact', detail: 'JustAnswer + Parallels combined' },
    { metric: '45%', label: 'Conversion Lift', detail: 'Subscription rate optimization' },
    { metric: '20%', label: 'Trial-to-Paid', detail: 'Lifecycle strategy improvement' }
  ];

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white z-50">
        <div className="max-w-5xl mx-auto px-6 py-6 flex items-center justify-between">
          <div className="text-lg font-medium">Bennett Dilly</div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex gap-10">
            {['About', 'Work', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-gray-600 hover:text-black transition-colors"
              >
                {item}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white">
            <div className="flex flex-col px-6 py-4 gap-4">
              {['About', 'Work', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="text-left text-gray-600 hover:text-black transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-8 px-6">
        <div className="max-w-5xl mx-auto px-0">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-light mb-6 leading-tight">
                Hi, I'm Bennett.
              </h1>
              <p className="text-2xl text-gray-700 font-light max-w-2xl">
                I make products less broken and more profitable.
              </p>
            </div>
            <div>
              <img 
                src="/images/bd-web-hero.png" 
                alt="Bennett at work" 
                className="w-full max-w-md h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* About + Achievements Section */}
      <section id="about" className="py-20 px-6 border-t border-gray-200">
        <div className="max-w-5xl mx-auto px-0">
          {/* About */}
          <div className="mb-16">
            <h2 className="text-sm uppercase tracking-wider text-gray-500 mb-6">About</h2>
            <p className="text-lg text-gray-700 font-light leading-relaxed mb-6 max-w-3xl">
              Over the past decade, I've built products across SaaS and e-commerce that people actually want to use—and that drive real business results.
            </p>
            <p className="text-lg text-gray-700 font-light leading-relaxed mb-6 max-w-3xl">
              My approach? Stay curious, listen to what matters, and make decisions based on evidence, not guesswork.
            </p>
            <div className="text-sm text-gray-500 font-light">
              Experimentation · AI Product · Funnel Optimization · Lifecycle Strategy · Cross-functional Leadership
            </div>
          </div>

          {/* Achievements */}
          <div>
            <h2 className="text-sm uppercase tracking-wider text-gray-500 mb-8">Impact</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {achievements.map((item, index) => (
                <CountUpMetric key={index} item={item} delay={index * 100} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section id="work" className="py-20 px-6 border-t border-gray-200">
        <div className="max-w-5xl mx-auto px-0">
          <h2 className="text-sm uppercase tracking-wider text-gray-500 mb-12">Work</h2>
          <div className="grid md:grid-cols-2 gap-12">
            {caseStudies.map((study, index) => (
              <div key={index}>
                <img 
                  src={study.logo} 
                  alt={`${study.company} logo`}
                  className="h-6 mb-3 object-contain object-left"
                />
                <h3 className="text-xl font-light mb-3">{study.title}</h3>
                <p className="text-sm text-gray-600 font-light leading-relaxed mb-3">
                  {study.description}
                </p>
                <div className="text-sm font-medium">{study.metrics}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 border-t border-gray-200">
        <div className="max-w-5xl mx-auto px-0">
          <h2 className="text-sm uppercase tracking-wider text-gray-500 mb-8">Contact</h2>
          <div className="space-y-3">
            <a 
              href="https://linkedin.com/in/bennettdilly" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-3 text-gray-700 hover:text-black transition-colors group"
            >
              <Linkedin size={18} className="text-gray-400 group-hover:text-black transition-colors" />
              <span className="font-light">linkedin.com/in/bennettdilly</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-gray-200">
        <div className="max-w-5xl mx-auto px-0">
          <p className="text-sm text-gray-400 font-light">
            © 2026 Bennett Dilly
          </p>
        </div>
      </footer>
    </div>
  );
}
