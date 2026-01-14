"use client";

import { Github, Linkedin, Mail, ExternalLink, Briefcase, Instagram, BookOpen } from "lucide-react";
import { SiX } from "react-icons/si";
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

const skills = [
  "Go", "Rust", "TypeScript", "JavaScript", "Python", "C++", "Solidity",
  "React", "Next.js", "Electron", "HTML/CSS",
  "NestJS", "GraphQL", "RabbitMQ", "Firebase",
  "AWS", "GCP", "Docker", "Kubernetes", "Grafana",
];

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-400 selection:bg-teal-300 selection:text-teal-900">
      <div className="mx-auto min-h-screen max-w-screen-xl px-6 py-12 md:px-12 md:py-20 lg:px-24 lg:py-0">
        <div className="lg:flex lg:justify-between lg:gap-4">
          {/* Left Column - Fixed */}
          <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-1/2 lg:flex-col lg:justify-between lg:py-24">
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-slate-200 sm:text-5xl">
                <a href="/">hiro8ma</a>
              </h1>
              <h2 className="mt-3 text-lg font-medium tracking-tight text-slate-200 sm:text-xl">
                Software Engineer
              </h2>
              <p className="mt-4 max-w-xs leading-normal text-slate-400">
                Building reliable, scalable systems with modern cloud-native technologies
              </p>

              {/* Navigation */}
              <nav className="nav hidden lg:block" aria-label="In-page jump links">
                <ul className="mt-16 w-max">
                  {[
                    { id: "about", label: "About" },
                    { id: "skills", label: "Skills" },
                    { id: "experience", label: "Experience" },
                  ].map((item) => (
                    <li key={item.id}>
                      <a
                        className="group flex items-center py-3"
                        href={`#${item.id}`}
                      >
                        <span className="nav-indicator mr-4 h-px w-8 bg-slate-600 transition-all group-hover:w-16 group-hover:bg-teal-300 group-focus-visible:w-16 group-focus-visible:bg-teal-300"></span>
                        <span className="nav-text text-xs font-bold uppercase tracking-widest text-slate-500 group-hover:text-teal-300 group-focus-visible:text-teal-300">
                          {item.label}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* Social Links */}
            <ul className="ml-1 mt-8 flex flex-wrap items-center gap-5" aria-label="Social media">
              <li>
                <a
                  className="block text-slate-400 hover:text-teal-300 transition-colors"
                  href="https://github.com/hiro8ma"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                >
                  <Github size={22} />
                </a>
              </li>
              <li>
                <a
                  className="block text-slate-400 hover:text-teal-300 transition-colors"
                  href="https://www.linkedin.com/in/hiro8ma/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={22} />
                </a>
              </li>
              <li>
                <a
                  className="block text-slate-400 hover:text-teal-300 transition-colors"
                  href="https://x.com/hir08ma"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="X (Twitter)"
                >
                  <SiX size={20} />
                </a>
              </li>
              <li>
                <a
                  className="block text-slate-400 hover:text-teal-300 transition-colors"
                  href="https://www.instagram.com/h8.16"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                >
                  <Instagram size={22} />
                </a>
              </li>
              <li>
                <a
                  className="block text-slate-400 hover:text-teal-300 transition-colors"
                  href="https://www.wantedly.com/id/hiro8ma"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Wantedly"
                >
                  <Briefcase size={22} />
                </a>
              </li>
              <li>
                <a
                  className="block text-slate-400 hover:text-teal-300 transition-colors"
                  href="https://booklog.jp/users/2620093309d9255a"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Booklog"
                >
                  <BookOpen size={22} />
                </a>
              </li>
              <li>
                <a
                  className="block text-slate-400 hover:text-teal-300 transition-colors"
                  href="mailto:hiro8masu@gmail.com"
                  aria-label="Email"
                >
                  <Mail size={22} />
                </a>
              </li>
            </ul>
          </header>

          {/* Right Column - Scrollable */}
          <main className="pt-24 lg:w-1/2 lg:py-24">
            {/* About Section */}
            <section
              id="about"
              className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
            >
              <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-slate-900/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
                <h2 className="text-sm font-bold uppercase tracking-widest text-slate-200 lg:sr-only">
                  About
                </h2>
              </div>
              <div className="space-y-4">
                <p>
                  Depending on the requirements, I work with{" "}
                  <span className="text-slate-200">Go, Rust, C++, TypeScript, Python</span>{" "}
                  for development, and commonly use{" "}
                  <span className="text-slate-200">gRPC, ConnectRPC, GraphQL, Pub/Sub</span>{" "}
                  for service communication.
                </p>
                <p>
                  I actively engage in re-architecting systems, including reviewing{" "}
                  <span className="text-slate-200">domain modeling</span> for complex core services,
                  service decomposition, and implementing{" "}
                  <span className="text-slate-200">Event Sourcing & CQRS</span> on top of
                  orchestration-based <span className="text-slate-200">Saga patterns</span>.
                  Event store data is utilized for aggregate reconstruction, audit logs, and training data.
                </p>
                <p>
                  I also manage cloud-native infrastructure, including microservice container operations,
                  CI/CD (<span className="text-slate-200">Argo Rollouts, PipeCD, Cloud Build, GitHub Actions</span>),
                  and environment setup using{" "}
                  <span className="text-slate-200">Kubernetes, Istio, Prometheus, Grafana, Terraform</span>.
                  I focus on building productivity tools and reducing toil.
                </p>
                <p>
                  On GCP, I have hands-on experience with a wide range of services including{" "}
                  <span className="text-slate-200">
                    GKE, Anthos, Cloud Run, Pub/Sub, AlloyDB, Spanner, BigQuery, Vertex AI
                  </span>.
                </p>
              </div>
            </section>

            {/* Skills Section */}
            <section
              id="skills"
              className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
            >
              <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-slate-900/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
                <h2 className="text-sm font-bold uppercase tracking-widest text-slate-200 lg:sr-only">
                  Skills
                </h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => {
                  const Icon = skillIcons[skill];
                  return (
                    <span
                      key={skill}
                      className="flex items-center gap-1.5 rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300"
                    >
                      {Icon && <Icon className="text-sm" />}
                      {skill}
                    </span>
                  );
                })}
              </div>
            </section>

            {/* Experience Section */}
            <section
              id="experience"
              className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
            >
              <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-slate-900/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
                <h2 className="text-sm font-bold uppercase tracking-widest text-slate-200 lg:sr-only">
                  Experience
                </h2>
              </div>
              <div>
                <ul className="group/list">
                  <li className="mb-12">
                    <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
                      <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>
                      <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:col-span-2">
                        Present
                      </header>
                      <div className="z-10 sm:col-span-6">
                        <h3 className="font-medium leading-snug text-slate-200">
                          <div className="inline-flex items-baseline font-medium leading-tight text-slate-200 group-hover:text-teal-300 focus-visible:text-teal-300">
                            Software Engineer / Tech Lead
                          </div>
                        </h3>
                        <p className="mt-2 text-sm leading-normal">
                          Responsible for management, technical strategy, architecture design, development, SRE, and infrastructure management.
                          Leading microservices architecture design and operations, driving cloud-native infrastructure initiatives.
                        </p>
                        <ul className="mt-2 flex flex-wrap gap-2" aria-label="Technologies used">
                          {["Go", "Kubernetes", "GCP", "Terraform"].map((tech) => (
                            <li key={tech}>
                              <span className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">
                                {tech}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </section>

            {/* Footer */}
            <footer className="max-w-md pb-16 text-sm text-slate-500 sm:pb-0">
              <p>
                Built with{" "}
                <a
                  href="https://nextjs.org/"
                  className="font-medium text-slate-400 hover:text-teal-300 focus-visible:text-teal-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Next.js
                </a>{" "}
                and{" "}
                <a
                  href="https://tailwindcss.com/"
                  className="font-medium text-slate-400 hover:text-teal-300 focus-visible:text-teal-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Tailwind CSS
                </a>
                . Inspired by{" "}
                <a
                  href="https://brittanychiang.com/"
                  className="font-medium text-slate-400 hover:text-teal-300 focus-visible:text-teal-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Brittany Chiang
                </a>
                .
              </p>
            </footer>
          </main>
        </div>
      </div>
    </div>
  );
}
