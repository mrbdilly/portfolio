import { Code2, Palette, Zap } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            About Me
          </h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="text-lg text-gray-600 leading-relaxed">
              I'm a passionate full-stack developer with over 5 years of experience building
              web applications that users love. My journey in tech started with a curiosity
              about how things work, and it's evolved into a career of creating elegant
              solutions to complex problems.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              When I'm not coding, you'll find me exploring new technologies, contributing
              to open-source projects, or sharing my knowledge through technical writing
              and mentoring.
            </p>
          </div>

          <div className="grid gap-6">
            <div className="flex items-start space-x-4 p-6 bg-blue-50 rounded-lg hover:shadow-md transition-shadow">
              <div className="p-3 bg-blue-600 rounded-lg text-white flex-shrink-0">
                <Code2 size={24} />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Clean Code</h3>
                <p className="text-gray-600">
                  Writing maintainable, scalable code that stands the test of time.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-6 bg-green-50 rounded-lg hover:shadow-md transition-shadow">
              <div className="p-3 bg-green-600 rounded-lg text-white flex-shrink-0">
                <Palette size={24} />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Design First</h3>
                <p className="text-gray-600">
                  Creating intuitive interfaces with attention to user experience.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-6 bg-orange-50 rounded-lg hover:shadow-md transition-shadow">
              <div className="p-3 bg-orange-600 rounded-lg text-white flex-shrink-0">
                <Zap size={24} />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Performance</h3>
                <p className="text-gray-600">
                  Optimizing every byte for lightning-fast user experiences.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
