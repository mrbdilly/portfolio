export default function Skills() {
  const skillCategories = [
    {
      title: 'Frontend',
      skills: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js', 'Vue.js', 'HTML/CSS'],
    },
    {
      title: 'Backend',
      skills: ['Node.js', 'Python', 'PostgreSQL', 'MongoDB', 'REST APIs', 'GraphQL'],
    },
    {
      title: 'Tools & Others',
      skills: ['Git', 'Docker', 'AWS', 'Figma', 'Jest', 'CI/CD'],
    },
  ];

  return (
    <section id="skills" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Skills & Technologies
          </h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-3 justify-center">
                {category.skills.map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium hover:bg-blue-200 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
