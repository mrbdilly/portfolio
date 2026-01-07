import { Github, Linkedin, Mail, ArrowDown } from 'lucide-react';

export default function Hero() {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 animate-fade-in">
              Hi, I'm <span className="text-blue-600">John Doe</span>
            </h1>
            <p className="text-2xl md:text-3xl text-gray-600 font-light">
              Full Stack Developer & UI/UX Designer
            </p>
          </div>

          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            I craft beautiful, intuitive digital experiences that solve real-world problems.
            Passionate about clean code, elegant design, and continuous learning.
          </p>

          <div className="flex justify-center space-x-6">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-gray-900 text-white rounded-full hover:bg-gray-700 transition-all hover:scale-110"
            >
              <Github size={24} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all hover:scale-110"
            >
              <Linkedin size={24} />
            </a>
            <button
              onClick={scrollToContact}
              className="p-3 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition-all hover:scale-110"
            >
              <Mail size={24} />
            </button>
          </div>

          <div className="pt-8">
            <button
              onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-gray-600 hover:text-blue-600 transition-colors animate-bounce"
            >
              <ArrowDown size={32} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
