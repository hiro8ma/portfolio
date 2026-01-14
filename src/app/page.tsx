import { Github, Mail, ExternalLink, Briefcase } from "lucide-react";
import {
  SiGo,
  SiRust,
  SiTypescript,
  SiJavascript,
  SiPython,
  SiCplusplus,
  SiSolidity,
  SiReact,
  SiNextdotjs,
  SiElectron,
  SiHtml5,
  SiNestjs,
  SiGraphql,
  SiRabbitmq,
  SiFirebase,
  SiAmazonwebservices,
  SiGooglecloud,
  SiDocker,
  SiKubernetes,
  SiGrafana,
} from "react-icons/si";
import { IconType } from "react-icons";

const skillIcons: Record<string, IconType> = {
  Go: SiGo,
  Rust: SiRust,
  TypeScript: SiTypescript,
  JavaScript: SiJavascript,
  Python: SiPython,
  "C++": SiCplusplus,
  Solidity: SiSolidity,
  React: SiReact,
  "Next.js": SiNextdotjs,
  Electron: SiElectron,
  "HTML/CSS": SiHtml5,
  NestJS: SiNestjs,
  GraphQL: SiGraphql,
  RabbitMQ: SiRabbitmq,
  Firebase: SiFirebase,
  AWS: SiAmazonwebservices,
  GCP: SiGooglecloud,
  Docker: SiDocker,
  Kubernetes: SiKubernetes,
  Grafana: SiGrafana,
};

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Hero Section */}
      <header className="container mx-auto px-6 py-20 lg:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-5xl font-bold shadow-xl">
              H
            </div>
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-4">
            hiro8ma
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 mb-8">
            Software Developer
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://github.com/hiro8ma"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full font-medium hover:bg-slate-700 dark:hover:bg-slate-200 transition-colors"
            >
              <Github size={20} />
              GitHub
            </a>
            <a
              href="https://www.wantedly.com/id/hiro8ma"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-teal-600 text-white rounded-full font-medium hover:bg-teal-500 transition-colors"
            >
              <Briefcase size={20} />
              Wantedly
            </a>
            <a
              href="mailto:hiro8masu@gmail.com"
              className="flex items-center gap-2 px-6 py-3 border-2 border-slate-900 dark:border-white text-slate-900 dark:text-white rounded-full font-medium hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-slate-900 transition-colors"
            >
              <Mail size={20} />
              Contact
            </a>
          </div>
        </div>
      </header>

      {/* About Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 text-center">
            About
          </h2>
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg">
            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              ソフトウェア開発に情熱を持つエンジニアです。
              新しい技術を学び、より良いプロダクトを作ることに日々取り組んでいます。
            </p>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 text-center">
            Skills
          </h2>
          <div className="space-y-8">
            {[
              {
                category: "Languages",
                items: ["Go", "Rust", "TypeScript", "JavaScript", "Python", "C++", "Solidity"],
              },
              {
                category: "Frontend",
                items: ["React", "Next.js", "Electron", "HTML/CSS"],
              },
              {
                category: "Backend",
                items: ["NestJS", "GraphQL", "RabbitMQ", "Firebase"],
              },
              {
                category: "Infrastructure",
                items: ["AWS", "GCP", "Docker", "Kubernetes", "Grafana"],
              },
            ].map((skillGroup) => (
              <div key={skillGroup.category}>
                <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-4">
                  {skillGroup.category}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {skillGroup.items.map((skill) => {
                    const Icon = skillIcons[skill];
                    return (
                      <div
                        key={skill}
                        className="flex items-center gap-2 bg-white dark:bg-slate-800 rounded-xl px-4 py-2 shadow-md hover:shadow-lg transition-shadow"
                      >
                        {Icon && <Icon className="text-xl text-slate-600 dark:text-slate-400" />}
                        <span className="text-slate-700 dark:text-slate-200 font-medium">
                          {skill}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 text-center">
            Projects
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: "Project 1",
                description: "プロジェクトの説明がここに入ります。",
                tags: ["React", "TypeScript"],
                link: "#",
              },
              {
                title: "Project 2",
                description: "プロジェクトの説明がここに入ります。",
                tags: ["Next.js", "Tailwind"],
                link: "#",
              },
            ].map((project, index) => (
              <div
                key={index}
                className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                  {project.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-300 mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <a
                  href={project.link}
                  className="flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline"
                >
                  View Project <ExternalLink size={16} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">
            Contact
          </h2>
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg">
            <p className="text-lg text-slate-600 dark:text-slate-300 mb-6">
              お気軽にお問い合わせください
            </p>
            <a
              href="mailto:hiro8masu@gmail.com"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-medium hover:opacity-90 transition-opacity"
            >
              <Mail size={20} />
              hiro8masu@gmail.com
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-8 border-t border-slate-200 dark:border-slate-700">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-slate-500 dark:text-slate-400">
            &copy; {new Date().getFullYear()} hiro8ma. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
