"use client";

import { Github, Linkedin, Mail, ExternalLink, Briefcase, Instagram, BookOpen, Youtube, FileText, Mic, Award, Calendar } from "lucide-react";
import { SiX, SiZenn } from "react-icons/si";
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
  SiTensorflow,
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
  TensorFlow: SiTensorflow,
};

const skills = [
  "Go", "Rust", "TypeScript", "JavaScript", "Python", "C++", "Solidity",
  "React", "Next.js", "Electron", "HTML/CSS",
  "NestJS", "GraphQL", "RabbitMQ", "Firebase",
  "AWS", "GCP", "Docker", "Kubernetes", "Grafana",
  "Vertex AI", "Gemini", "BigQuery ML", "TensorFlow", "RAG",
  "Engineering Management", "Product Management", "Agile/Scrum",
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
                <a href="/">Hiroyuki Masuda</a>
              </h1>
              <p className="mt-1 text-sm text-slate-400">hiro8ma / 増田 浩之</p>
              <h2 className="mt-3 text-lg font-medium tracking-tight text-slate-200 sm:text-xl">
                Engineering Manager & Architect
              </h2>
              <p className="mt-4 max-w-xs leading-normal text-slate-400">
                10+ years building scalable systems. Leading teams, architecting microservices, and driving AI transformation at scale.
              </p>

              {/* Navigation */}
              <nav className="nav hidden lg:block" aria-label="In-page jump links">
                <ul className="mt-16 w-max">
                  {[
                    { id: "about", label: "About" },
                    { id: "skills", label: "Skills" },
                    { id: "certifications", label: "Certifications" },
                    { id: "writing", label: "Writing" },
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

            {/* Certifications Section */}
            <section
              id="certifications"
              className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
            >
              <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-slate-900/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
                <h2 className="text-sm font-bold uppercase tracking-widest text-slate-200 lg:sr-only">
                  Certifications
                </h2>
              </div>
              <div>
                <ul className="group/list space-y-4">
                  <li>
                    <div className="group relative rounded-lg border border-slate-700/50 bg-slate-800/30 p-4 transition-all hover:border-teal-500/50 hover:bg-slate-800/50">
                      <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-teal-500/10">
                          <Award className="h-6 w-6 text-teal-400" />
                        </div>
                        <div>
                          <h3 className="font-medium text-slate-200">Google Cloud Professional Cloud Architect</h3>
                          <p className="mt-1 text-sm text-slate-400">Google Cloud</p>
                          <p className="mt-1 flex items-center gap-1 text-xs text-slate-500">
                            <Calendar size={12} />
                            Valid until Dec 2027
                          </p>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="group relative rounded-lg border border-slate-700/50 bg-slate-800/30 p-4 transition-all hover:border-teal-500/50 hover:bg-slate-800/50">
                      <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-teal-500/10">
                          <Award className="h-6 w-6 text-teal-400" />
                        </div>
                        <div>
                          <h3 className="font-medium text-slate-200">45+ Google Cloud Skill Badges</h3>
                          <p className="mt-1 text-sm text-slate-400">Including: Vertex AI, Gemini API, BigQuery ML, Kubernetes, Terraform, Security</p>
                          <a
                            href="https://www.cloudskillsboost.google/public_profiles/your-profile"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-2 inline-flex items-center gap-1 text-xs text-teal-400 hover:text-teal-300"
                          >
                            View all badges <ExternalLink size={12} />
                          </a>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </section>

            {/* Writing Section */}
            <section
              id="writing"
              className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
            >
              <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-slate-900/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
                <h2 className="text-sm font-bold uppercase tracking-widest text-slate-200 lg:sr-only">
                  Writing
                </h2>
              </div>
              <div>
                <ul className="group/list">
                  <li className="mb-8">
                    <a
                      href="https://note.com/canary_inc/n/n658b8313277f"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative grid gap-4 pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50"
                    >
                      <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>
                      <div className="z-10 sm:col-span-2 flex items-center justify-center text-slate-500">
                        <FileText size={32} />
                      </div>
                      <div className="z-10 sm:col-span-6">
                        <h3 className="font-medium leading-snug text-slate-200">
                          <span className="inline-flex items-baseline font-medium leading-tight text-slate-200 group-hover:text-teal-300 focus-visible:text-teal-300">
                            Interview: Product Lead Engineer&apos;s Mission
                            <ExternalLink size={14} className="ml-1 inline-block" />
                          </span>
                        </h3>
                        <p className="mt-2 text-sm leading-normal text-slate-400">
                          &quot;Providing growth opportunities for team members is also my important mission&quot;
                        </p>
                        <span className="mt-2 inline-block rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium text-teal-300">
                          note
                        </span>
                      </div>
                    </a>
                  </li>
                  <li className="mb-8">
                    <a
                      href="https://zenn.dev/canary_techblog/articles/2358dd21cee434"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative grid gap-4 pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50"
                    >
                      <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>
                      <div className="z-10 sm:col-span-2 flex items-center justify-center text-slate-500">
                        <SiZenn size={32} />
                      </div>
                      <div className="z-10 sm:col-span-6">
                        <h3 className="font-medium leading-snug text-slate-200">
                          <span className="inline-flex items-baseline font-medium leading-tight text-slate-200 group-hover:text-teal-300 focus-visible:text-teal-300">
                            Building Teams That Move Without Hesitation in the AI Era
                            <ExternalLink size={14} className="ml-1 inline-block" />
                          </span>
                        </h3>
                        <p className="mt-2 text-sm leading-normal text-slate-400">
                          Organizational design secrets for accelerating development in the AI era
                        </p>
                        <span className="mt-2 inline-block rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium text-teal-300">
                          zenn
                        </span>
                      </div>
                    </a>
                  </li>
                  <li className="mb-8">
                    <a
                      href="https://youtu.be/HpF_87aHPFg"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative grid gap-4 pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50"
                    >
                      <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>
                      <div className="z-10 sm:col-span-2 flex items-center justify-center text-slate-500">
                        <Mic size={32} />
                      </div>
                      <div className="z-10 sm:col-span-6">
                        <h3 className="font-medium leading-snug text-slate-200">
                          <span className="inline-flex items-baseline font-medium leading-tight text-slate-200 group-hover:text-teal-300 focus-visible:text-teal-300">
                            Talk: Rethinking Dev Organizations in the AI Era
                            <ExternalLink size={14} className="ml-1 inline-block" />
                          </span>
                        </h3>
                        <p className="mt-2 text-sm leading-normal text-slate-400">
                          Are we focusing on the right things? Reconsidering development organizations in the AI era
                        </p>
                        <span className="mt-2 inline-block rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium text-teal-300">
                          talk
                        </span>
                      </div>
                    </a>
                  </li>
                </ul>
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
                        2023 — Present
                      </header>
                      <div className="z-10 sm:col-span-6">
                        <h3 className="font-medium leading-snug text-slate-200">
                          <div className="inline-flex items-baseline font-medium leading-tight text-slate-200 group-hover:text-teal-300 focus-visible:text-teal-300">
                            Product Lead Engineer · CANARY
                          </div>
                        </h3>
                        <p className="mt-2 text-sm leading-normal">
                          Leading development teams, technical strategy, and architecture for Japan&apos;s real estate marketplace app.
                          Driving AI integration and microservices transformation.
                        </p>
                        <ul className="mt-3 space-y-1 text-sm text-slate-400">
                          <li className="flex items-start gap-2">
                            <span className="text-teal-400">▹</span>
                            Architected Event Sourcing & CQRS system handling millions of domain events
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-teal-400">▹</span>
                            Led team of engineers, establishing growth-focused engineering culture
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-teal-400">▹</span>
                            Implemented AI-powered features using Vertex AI and Gemini
                          </li>
                        </ul>
                        <ul className="mt-3 flex flex-wrap gap-2" aria-label="Technologies used">
                          {["Go", "Kubernetes", "GCP", "Vertex AI", "Event Sourcing"].map((tech) => (
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
                  <li className="mb-12">
                    <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
                      <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>
                      <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:col-span-2">
                        Previous
                      </header>
                      <div className="z-10 sm:col-span-6">
                        <h3 className="font-medium leading-snug text-slate-200">
                          <div className="inline-flex items-baseline font-medium leading-tight text-slate-200 group-hover:text-teal-300 focus-visible:text-teal-300">
                            Tech Lead · Multiple Startups
                          </div>
                        </h3>
                        <p className="mt-2 text-sm leading-normal">
                          Tech lead experience across fintech, retail, and sales support domains.
                          Built scalable systems from scratch and led technical transformations.
                        </p>
                        <ul className="mt-3 space-y-1 text-sm text-slate-400">
                          <li className="flex items-start gap-2">
                            <span className="text-teal-400">▹</span>
                            Designed and built microservices architectures from ground up
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-teal-400">▹</span>
                            Established CI/CD pipelines and DevOps practices
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-teal-400">▹</span>
                            Mentored junior engineers and built engineering teams
                          </li>
                        </ul>
                        <ul className="mt-3 flex flex-wrap gap-2" aria-label="Technologies used">
                          {["TypeScript", "React", "AWS", "Docker", "GraphQL"].map((tech) => (
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
          </main>
        </div>
      </div>
    </div>
  );
}
