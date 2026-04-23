"use client";

import { AnimatePresence, motion, useInView } from "framer-motion";
import {
  ArrowRight,
  ArrowUp,
  Award,
  Briefcase,
  Calendar,
  ChevronRight,
  Clock,
  Code2,
  Coffee,
  Download,
  ExternalLink,
  GitBranch,
  GitCommitHorizontal,
  Github,
  Globe,
  GraduationCap,
  Layers,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Monitor,
  Moon,
  Palette,
  Phone,
  Quote,
  Rocket,
  Search,
  Send,
  Server,
  Smartphone,
  Star,
  Sun,
  Terminal,
  Zap
} from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";

// ─── Data ───────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Blog", href: "#blog" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

const TECH_MARQUEE_ITEMS = [
  "JavaScript",
  "TypeScript",
  "React.js",
  "Flutter",
  "Dart",
  "HTML5",
  "CSS3",
  "Tailwind CSS",
  "Bootstrap",
  "Git",
  "REST APIs",
  "GetX",
  "C++",
  "Java",
  "UI/UX Design",
  "Figma",
];

const SKILLS = [
  {
    category: "Programming Languages",
    icon: Code2,
    items: [
      { name: "JavaScript", level: 90 },
      { name: "Dart", level: 85 },
      { name: "C++", level: 75 },
      { name: "Java", level: 70 },
      { name: "HTML5", level: 95 },
      { name: "CSS3", level: 90 },
    ],
  },
  {
    category: "Front-End Development",
    icon: Layers,
    items: [
      { name: "React.js", level: 90 },
      { name: "Bootstrap", level: 85 },
      { name: "Responsive Design", level: 95 },
      { name: "Tailwind CSS", level: 80 },
    ],
  },
  {
    category: "Mobile Development",
    icon: Smartphone,
    items: [
      { name: "Flutter", level: 90 },
      { name: "GetX", level: 85 },
      { name: "Cross-Platform", level: 85 },
    ],
  },
  {
    category: "Tools & Technologies",
    icon: Terminal,
    items: [
      { name: "Git & GitHub", level: 85 },
      { name: "REST APIs", level: 80 },
      { name: "State Management", level: 85 },
    ],
  },
  {
    category: "Design & Concepts",
    icon: Palette,
    items: [
      { name: "UI/UX Design", level: 80 },
      { name: "Clean Architecture", level: 75 },
      { name: "Performance Optimization", level: 78 },
    ],
  },
];

const PROJECTS = [
  {
    title: "Market-Clothes",
    category: "Web",
    description:
      "A responsive e-commerce platform for buying and selling clothing with modern UI and seamless user experience.",
    techs: ["React.js", "JavaScript", "HTML5", "CSS3"],
    github: "https://github.com/MohmedYahiaAlmhdi",
    icon: Globe,
    color: "from-emerald-500 to-teal-500",
    screenshot: "/projects/market-clothes.png",
  },
  {
    title: "Real-Estate-Flutter",
    category: "Mobile",
    description:
      "A mobile real estate application connecting property owners with buyers and renters with an intuitive interface.",
    techs: ["Flutter", "Dart", "GetX"],
    github: "https://github.com/MohmedYahiaAlmhdi",
    icon: Smartphone,
    color: "from-teal-500 to-cyan-500",
    screenshot: "/projects/real-estate-flutter.png",
  },
  {
    title: "Rimberio",
    category: "Mobile",
    description:
      "A digital service marketplace platform helping users find trusted professionals and services nearby.",
    techs: ["Flutter", "Dart", "GetX"],
    github: "https://github.com/MohmedYahiaAlmhdi",
    icon: Zap,
    color: "from-cyan-500 to-emerald-500",
    screenshot: "/projects/rimberio.png",
  },
  {
    title: "Land-of-Stories",
    category: "Web",
    description:
      "A tourism website showcasing Syria's rich cultural and historical locations with an immersive design.",
    techs: ["HTML5", "CSS3", "JavaScript", "Bootstrap"],
    github: "https://github.com/MohmedYahiaAlmhdi",
    icon: Globe,
    color: "from-emerald-500 to-green-500",
    screenshot: "/projects/land-of-stories.png",
  },
];

const TIMELINE_ITEMS = [
  {
    type: "work",
    title: "Self-Employed / Personal Projects",
    subtitle: "Front-End & Flutter Developer",
    description:
      "Building responsive web and mobile applications, including e-commerce platforms, real estate apps, and tourism websites.",
    date: "2025 – Present",
    icon: Briefcase,
  },
  {
    type: "training",
    title: "Flutter Development Trainee",
    subtitle: "Tamkeen",
    description:
      "Completed intensive Flutter development training covering mobile app development with Dart and GetX.",
    date: "2025 – 2026",
    icon: Award,
  },
  {
    type: "training",
    title: "Back-End Development Trainee",
    subtitle: "SEF Academy",
    description:
      "Completed one-year back-end development training, gaining strong foundations in server-side technologies.",
    date: "2023 – 2024",
    icon: Server,
  },
  {
    type: "training",
    title: "Front-End Development Trainee",
    subtitle: "SEF Academy",
    description:
      "Completed one-year front-end development training, mastering HTML, CSS, JavaScript, and React.js.",
    date: "2023 – 2024",
    icon: Code2,
  },
  {
    type: "education",
    title: "Bachelor's Degree",
    subtitle: "Damascus University",
    description:
      "Currently pursuing a Bachelor's degree at Damascus University.",
    date: "2023 – Present",
    icon: GraduationCap,
  },
];

const CERTIFICATIONS = [
  "Front-End Development Certificate – SEF Academy",
  "Back-End Development Certificate – SEF Academy",
  "EF SET English Certificate",
  "Flutter Development Certificate – Tamkeen",
];

const TESTIMONIALS = [
  {
    name: "Ahmad Al-Rifai",
    role: "Project Manager",
    company: "Tech Solutions Syria",
    text: "Mohmed delivered an outstanding e-commerce platform that exceeded our expectations. His attention to detail and clean code made the project a success.",
    rating: 5,
  },
  {
    name: "Sara Khalil",
    role: "UI/UX Designer",
    company: "Creative Digital Agency",
    text: "Working with Mohmed was a great experience. He transformed our designs into a flawless Flutter application with smooth animations.",
    rating: 5,
  },
  {
    name: "Omar Haddad",
    role: "Startup Founder",
    company: "Rimberio",
    text: "Mohmed built our service marketplace app from scratch. His problem-solving skills and React.js expertise were instrumental.",
    rating: 4,
  },
];

const VALUE_PROPS = [
  { icon: Zap, title: "Fast Delivery", desc: "Quick turnaround without compromising quality" },
  { icon: Code2, title: "Clean Code", desc: "Maintainable, well-documented, and scalable code" },
  { icon: Smartphone, title: "Cross-Platform", desc: "Web and mobile apps with consistent experience" },
];

const SERVICES = [
  {
    icon: Layers,
    title: "Web Development",
    description: "Building responsive, modern web applications using React.js, TypeScript, and the latest frontend technologies.",
    features: ["React.js & Next.js", "TypeScript", "Tailwind CSS", "Responsive Design"],
  },
  {
    icon: Smartphone,
    title: "Mobile Development",
    description: "Creating cross-platform mobile applications with Flutter and Dart that deliver native-like performance.",
    features: ["Flutter & Dart", "GetX State Management", "Platform-specific UI", "API Integration"],
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "Designing intuitive user interfaces that balance aesthetics with functionality for optimal user experience.",
    features: ["Figma Prototyping", "User Research", "Design Systems", "Accessibility"],
  },
  {
    icon: Server,
    title: "API Integration",
    description: "Connecting frontend applications to backend services with clean, efficient API integration and data handling.",
    features: ["REST APIs", "JSON Processing", "Authentication", "Data Management"],
  },
];

const FUN_FACTS = [
  { icon: Coffee, label: "Cups of Coffee", value: "500+", color: "from-amber-500 to-orange-500" },
  { icon: GitBranch, label: "Git Commits", value: "1000+", color: "from-emerald-500 to-teal-500" },
  { icon: Monitor, label: "Hours of Coding", value: "3000+", color: "from-cyan-500 to-blue-500" },
  { icon: Rocket, label: "Projects Shipped", value: "4+", color: "from-purple-500 to-pink-500" },
];

const BLOG_POSTS = [
  {
    title: "Building Responsive Layouts with CSS Grid and Flexbox",
    excerpt: "A comprehensive guide to mastering modern CSS layout techniques for creating adaptive, beautiful web interfaces.",
    date: "Mar 15, 2025",
    readTime: "5 min read",
    tags: ["CSS", "Frontend", "Tutorial"],
    category: "Frontend",
  },
  {
    title: "Getting Started with Flutter: A Developer's Journey",
    excerpt: "My experience transitioning from web to mobile development with Flutter, and the lessons I learned along the way.",
    date: "Feb 28, 2025",
    readTime: "7 min read",
    tags: ["Flutter", "Mobile", "Personal"],
    category: "Mobile",
  },
  {
    title: "Why Clean Architecture Matters in Frontend Development",
    excerpt: "Exploring the principles of clean architecture and how they apply to building maintainable React.js applications.",
    date: "Jan 10, 2025",
    readTime: "6 min read",
    tags: ["React.js", "Architecture", "Best Practices"],
    category: "Architecture",
  },
];

const PROCESS_STEPS = [
  { number: 1, title: "Discovery", description: "Understanding your requirements and defining project scope", icon: Search },
  { number: 2, title: "Design", description: "Creating wireframes and prototypes for user-friendly interfaces", icon: Palette },
  { number: 3, title: "Development", description: "Building with clean code, modern tools, and best practices", icon: Code2 },
  { number: 4, title: "Delivery", description: "Testing, deploying, and ensuring everything works perfectly", icon: Rocket },
];

const ACHIEVEMENTS = [
  { title: "100+ GitHub Repos", icon: GitBranch, color: "from-emerald-500 to-teal-500" },
  { title: "500+ Commits", icon: GitCommitHorizontal, color: "from-teal-500 to-cyan-500" },
  { title: "3 Certifications", icon: Award, color: "from-cyan-500 to-emerald-500" },
  { title: "Open Source", icon: Globe, color: "from-emerald-500 to-green-500" },
  { title: "Clean Code", icon: Code2, color: "from-teal-500 to-emerald-500" },
  { title: "Fast Learner", icon: Zap, color: "from-amber-500 to-orange-500" },
];

// ─── Animation Components ──────────────────────────────────────────────────

function AnimatedSection({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function AnimatedCounter({ end, suffix = "" }: { end: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, end]);

  return <span ref={ref}>{count}{suffix}</span>;
}

function TypewriterText({ texts, className = "" }: { texts: string[]; className?: string }) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = texts[currentTextIndex];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setDisplayText(currentText.substring(0, displayText.length + 1));
          if (displayText.length === currentText.length) {
            setTimeout(() => setIsDeleting(true), 2000);
          }
        } else {
          setDisplayText(currentText.substring(0, displayText.length - 1));
          if (displayText.length === 0) {
            setIsDeleting(false);
            setCurrentTextIndex((prev) => (prev + 1) % texts.length);
          }
        }
      },
      isDeleting ? 50 : 100
    );
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentTextIndex, texts]);

  return (
    <span className={className}>
      {displayText}
      <span className="typewriter-cursor text-emerald-500 ml-0.5">|</span>
    </span>
  );
}

function SkillBar({ name, level, delay }: { name: string; level: number; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <div ref={ref} className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-semibold text-foreground">{name}</span>
        <span className="flex items-center text-xs font-mono text-emerald-500">
          <span className={`skill-dot-animated ${isInView ? "is-in-view" : ""}`} />
          {level}%
        </span>
      </div>
      <div className="skill-progress h-3 rounded-full overflow-hidden">
        <motion.div
          className="skill-progress-indicator h-full rounded-full"
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1.2, delay: delay * 0.1, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

// ─── Section Heading (Unified) ────────────────────────────────────────────

function SectionHeading({
  badge,
  title,
  titleHighlight,
  description,
}: {
  badge: string;
  title: string;
  titleHighlight?: string;
  description?: string;
}) {
  return (
    <div className="text-center mb-14 sm:mb-16">
      <Badge
        variant="outline"
        className="mb-3 sm:mb-4 inline-block border-emerald-500/20 text-emerald-500/80 bg-emerald-500/5 section-badge-glow text-xs sm:text-sm font-medium uppercase tracking-wider"
      >
        {badge}
      </Badge>
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-foreground">
        {titleHighlight ? (
          <>
            {title} <span className="gradient-text">{titleHighlight}</span>
          </>
        ) : (
          title
        )}
      </h2>
      {description && (
        <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          {description}
        </p>
      )}
      <div className="w-12 h-0.5 bg-gradient-to-r from-emerald-500/60 via-teal-400/60 to-cyan-400/60 mx-auto rounded-full mt-5" />
    </div>
  );
}

// ─── Section Divider ────────────────────────────────────────────────────────

function SectionDivider() {
  return (
    <div className="flex items-center justify-center py-4">
      <div className="h-px flex-1 max-w-xs bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />
      <div className="mx-4 divider-diamond" />
      <div className="h-px flex-1 max-w-xs bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />
    </div>
  );
}

// ─── Navbar ─────────────────────────────────────────────────────────────────

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isDesktop, setIsDesktop] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();
  const isClient = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1000px)");
    setIsDesktop(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = NAV_LINKS.map((link) => link.href.substring(1));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "glass-card shadow-lg border-b border-emerald-500/10"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => scrollToSection("#home")}
            className="flex items-center gap-2 group shrink-0"
          >
            <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors">
              <Code2 className="w-5 h-5 text-emerald-500" />
            </div>
            {isDesktop && (
              <span className="font-semibold text-lg tracking-tight">
                <span className="text-foreground">Mohmed</span>{" "}
                <span className="text-emerald-500">Yahia</span>
              </span>
            )}
          </button>

          {/* Desktop Nav - only when isDesktop is true */}
          {isDesktop && (
            <div className="flex items-center gap-0.5 lg:gap-1">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className={`px-2.5 lg:px-3.5 py-2 text-sm rounded-lg transition-all duration-200 min-h-[44px] ${
                    activeSection === link.href.substring(1)
                      ? "text-emerald-500 bg-emerald-500/10 font-medium"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>
          )}

          {/* Right side actions */}
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            {/* Theme toggle */}
            {isClient && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="rounded-lg hover:bg-emerald-500/10"
              >
                {theme === "dark" ? (
                  <Sun className="w-4 h-4 text-emerald-500" />
                ) : (
                  <Moon className="w-4 h-4 text-emerald-600" />
                )}
                <span className="sr-only">Toggle theme</span>
              </Button>
            )}

            {/* Contact CTA - desktop only */}
            {isDesktop && (
              <Button
                className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg"
                size="sm"
                onClick={() => scrollToSection("#contact")}
              >
                <Mail className="w-4 h-4 mr-1" />
                Hire Me
              </Button>
            )}

            {/* Mobile hamburger - mobile only */}
            {!isDesktop && (
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-lg">
                    <Menu className="w-5 h-5" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-72 bg-background/95 backdrop-blur-xl">
                  <SheetTitle className="text-lg font-semibold mb-6">
                    <span className="text-foreground">Mohmed</span>{" "}
                    <span className="text-emerald-500">Yahia</span>
                  </SheetTitle>
                  <div className="flex flex-col gap-1">
                    {NAV_LINKS.map((link) => (
                      <SheetClose asChild key={link.href}>
                        <button
                          onClick={() => scrollToSection(link.href)}
                          className={`px-4 py-3.5 text-sm rounded-lg transition-all text-left min-h-[44px] ${
                            activeSection === link.href.substring(1)
                              ? "text-emerald-500 bg-emerald-500/10 font-medium"
                              : "text-muted-foreground hover:text-foreground hover:bg-accent"
                          }`}
                        >
                          {link.label}
                        </button>
                      </SheetClose>
                    ))}
                  </div>
                  <Separator className="my-4" />
                  <SheetClose asChild>
                    <Button
                      className="w-full bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg"
                      onClick={() => scrollToSection("#contact")}
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      Hire Me
                    </Button>
                  </SheetClose>
                </SheetContent>
              </Sheet>
            )}
          </div>
        </div>
      </nav>
    </motion.header>
  );
}

// ─── Hero Section ───────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden grid-bg dot-grid-bg"
    >
      {/* Background gradient */}
      <div className="hero-gradient absolute inset-0 pointer-events-none" />

      {/* Morphing blob */}
      <div className="morphing-blob absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      {/* Floating orbs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-emerald-500/5 rounded-full blur-3xl animate-float" />
      <div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl animate-float"
        style={{ animationDelay: "3s" }}
      />

      {/* Floating particles */}
      <div className="hero-particles absolute inset-0 overflow-hidden pointer-events-none">
        <span /><span /><span /><span /><span /><span /><span /><span />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Text content */}
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-sm font-medium mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Available for opportunities
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4"
            >
              Hi, I&apos;m{" "}
              <span className="gradient-text">Mohmed Yahia</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl sm:text-2xl lg:text-3xl font-semibold text-muted-foreground mb-6 h-8 sm:h-10"
            >
              <TypewriterText
                texts={[
                  "Front-End Developer",
                  "Flutter Developer",
                  "UI/UX Enthusiast",
                  "React.js Specialist",
                ]}
              />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-muted-foreground text-base sm:text-lg max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed"
            >
              I craft responsive, performant web and mobile applications with
              modern technologies. Passionate about clean code, elegant design,
              and delivering exceptional user experiences.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start"
            >
              <Button
                size="lg"
                className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl px-8 h-12 text-base font-medium shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all"
                onClick={() => {
                  const el = document.querySelector("#contact");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <Send className="w-4 h-4 mr-2" />
                Contact Me
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="rounded-xl px-8 h-12 text-base font-medium border-emerald-500/20 hover:bg-emerald-500/10 hover:border-emerald-500/40 text-emerald-500"
                asChild
              >
                <a href="/Mohmed_Yahia_CV.pdf" download>
                  <Download className="w-4 h-4 mr-2" />
                  Download CV
                </a>
              </Button>
            </motion.div>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex items-center gap-4 mt-8 justify-center lg:justify-start"
            >
              <span className="text-sm text-muted-foreground">Find me on</span>
              <Separator orientation="vertical" className="h-4" />
              <a
                href="https://github.com/MohmedYahiaAlmhdi"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link-hover w-10 h-10 rounded-lg flex items-center justify-center text-muted-foreground hover:text-emerald-500 hover:bg-emerald-500/10 transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/mohmedyahia-almhdi-283175315"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link-hover w-10 h-10 rounded-lg flex items-center justify-center text-muted-foreground hover:text-emerald-500 hover:bg-emerald-500/10 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="mailto:mohmedyahiaalmhdi@gmail.com"
                className="social-link-hover w-10 h-10 rounded-lg flex items-center justify-center text-muted-foreground hover:text-emerald-500 hover:bg-emerald-500/10 transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
            </motion.div>
          </div>

          {/* Avatar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex-shrink-0"
          >
            <div className="relative">
              {/* Glow ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 opacity-20 blur-2xl scale-110 animate-pulse" />

              {/* Avatar container */}
              <div className="avatar-rotating-border relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-full p-1 bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500">
                <div className="relative w-full h-full rounded-full overflow-hidden bg-background">
                  <Image
                    src="/profile-avatar.png"
                    alt="Mohmed Yahia Almhdi"
                    fill
                    sizes="(max-width: 768px) 288px, (max-width: 1024px) 288px, 320px"
                    className="object-cover"
                    priority
                  />
                </div>
              </div>

              {/* Floating badges - hidden on small screens */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="hidden sm:block absolute -top-2 -right-2 bg-background/90 backdrop-blur-sm border border-emerald-500/20 rounded-xl px-3 py-2 shadow-lg"
              >
                <div className="flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-emerald-500" />
                  <span className="text-xs font-medium">React.js</span>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
                className="hidden sm:block absolute -bottom-2 -left-2 bg-background/90 backdrop-blur-sm border border-emerald-500/20 rounded-xl px-3 py-2 shadow-lg"
              >
                <div className="flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-emerald-500" />
                  <span className="text-xs font-medium">Flutter</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs text-muted-foreground">Scroll down</span>
          <ChevronRight className="w-4 h-4 text-emerald-500 rotate-90" />
        </motion.div>
      </motion.div>
    </section>
  );
}

// ─── Quote Section ──────────────────────────────────────────────────────────

function QuoteSection() {
  return (
    <section className="py-12 sm:py-16 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <AnimatedSection>
          <Quote className="w-8 h-8 text-emerald-500/20 mx-auto mb-4" />
          <blockquote className="text-lg sm:text-2xl font-medium text-foreground/80 italic leading-relaxed">
            &ldquo;Clean code, elegant design, and exceptional user experience — that&apos;s what I deliver.&rdquo;
          </blockquote>
          <div className="mt-6 flex items-center justify-center gap-3">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-emerald-500" />
            <span className="text-sm text-emerald-500 font-medium">Mohmed Yahia</span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-emerald-500" />
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

// ─── Value Props Section ──────────────────────────────────────────────────

function ValuePropsSection() {
  return (
    <section className="py-10 sm:py-14 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {VALUE_PROPS.map((prop, index) => (
              <AnimatedSection key={prop.title} delay={index * 0.1}>
                <div className="card-3d-hover">
                <Card className="glass-card card-lift py-5 gap-4 text-center group">
                  <CardContent className="flex flex-col items-center gap-3 px-5 py-0">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors">
                      <prop.icon className="w-6 h-6 text-emerald-500" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold mb-1 text-card-foreground">{prop.title}</h3>
                      <p className="text-sm text-muted-foreground">{prop.desc}</p>
                    </div>
                  </CardContent>
                </Card>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

// ─── Services Section ───────────────────────────────────────────────────────

function ServicesSection() {
  return (
    <section id="services" className="section-padding relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionHeading
            badge="Services"
            title="What I "
            titleHighlight="Offer"
            description="Comprehensive development services tailored to bring your ideas to life with modern technologies and best practices."
          />
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((service, index) => (
            <AnimatedSection key={service.title} delay={index * 0.1}>
              <Card className="glass-card card-lift h-full py-5 gap-4 group hover:shadow-lg hover:shadow-emerald-500/5 transition-all duration-300 service-card-stripe">
                <CardHeader className="pb-0 pt-0 px-5">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center group-hover:bg-emerald-500/20 group-hover:border-emerald-500/40 transition-all duration-300 service-icon-pulse-ring">
                    <service.icon className="w-6 h-6 text-emerald-500" />
                  </div>
                </CardHeader>
                <CardContent className="px-5 py-0 space-y-3">
                  <CardTitle className="text-base text-card-foreground">{service.title}</CardTitle>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {service.features.map((feature) => (
                      <Badge
                        key={feature}
                        variant="secondary"
                        className="bg-emerald-500/5 text-emerald-500/80 border-emerald-500/10 text-[11px] font-medium px-2 py-0.5"
                      >
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── About Section ──────────────────────────────────────────────────────────

function AboutSection() {
  return (
    <section id="about" className="section-padding relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <AnimatedSection>
          <SectionHeading
            badge="About Me"
            title="Get to Know "
            titleHighlight="Who I Am"
          />
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Info cards */}
          <AnimatedSection delay={0.1}>
            <div className="space-y-6">
              <p className="text-muted-foreground leading-relaxed text-base sm:text-lg">
                I&apos;m a <span className="text-foreground font-medium">Front-End and Flutter Developer</span> from
                Damascus, Syria, with hands-on experience building responsive
                web and mobile applications. I&apos;m passionate about creating
                seamless digital experiences that combine beautiful design with
                powerful functionality.
              </p>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                With a strong foundation in <span className="text-foreground font-medium">React.js</span>,
                <span className="text-foreground font-medium"> Flutter</span>, and modern UI technologies, I
                specialize in building real-world projects including e-commerce
                platforms, real estate applications, service marketplaces, and
                tourism websites. My focus is always on clean code, performance,
                and exceptional user experience.
              </p>

              {/* Quick info grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                <div className="card-3d-hover">
                <Card className="glass-card card-lift py-4 gap-3">
                  <CardContent className="flex items-center gap-3 px-4 py-0">
                    <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-emerald-500" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Location</p>
                      <p className="text-sm font-medium">Damascus, Syria</p>
                    </div>
                  </CardContent>
                </Card>
                </div>

                <div className="card-3d-hover">
                <Card className="glass-card card-lift py-4 gap-3">
                  <CardContent className="flex items-center gap-3 px-4 py-0">
                    <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-emerald-500" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Email</p>
                      <p className="text-sm font-medium break-all">mohmedyahiaalmhdi@gmail.com</p>
                    </div>
                  </CardContent>
                </Card>
                </div>

                <div className="card-3d-hover">
                <Card className="glass-card card-lift py-4 gap-3">
                  <CardContent className="flex items-center gap-3 px-4 py-0">
                    <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                      <GraduationCap className="w-5 h-5 text-emerald-500" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Education</p>
                      <p className="text-sm font-medium">Damascus University</p>
                    </div>
                  </CardContent>
                </Card>
                </div>

                <div className="card-3d-hover">
                <Card className="glass-card card-lift py-4 gap-3">
                  <CardContent className="flex items-center gap-3 px-4 py-0">
                    <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                      <Globe className="w-5 h-5 text-emerald-500" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Languages</p>
                      <p className="text-sm font-medium">Arabic, English</p>
                    </div>
                  </CardContent>
                </Card>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Right - Stats & highlights */}
          <AnimatedSection delay={0.2}>
            <div className="space-y-6">
              {/* Stats with animated counters */}
              <div className="grid grid-cols-2 gap-4">
                <Card className="glass-card card-lift py-5 gap-2 text-center">
                  <CardContent className="px-4 py-0">
                    <div className="text-3xl font-bold gradient-text mb-1">
                      <AnimatedCounter end={4} suffix="+" />
                    </div>
                    <p className="text-sm text-muted-foreground">Projects Completed</p>
                  </CardContent>
                </Card>
                <Card className="glass-card card-lift py-5 gap-2 text-center">
                  <CardContent className="px-4 py-0">
                    <div className="text-3xl font-bold gradient-text mb-1">
                      <AnimatedCounter end={3} suffix="+" />
                    </div>
                    <p className="text-sm text-muted-foreground">Years Training</p>
                  </CardContent>
                </Card>
                <Card className="glass-card card-lift py-5 gap-2 text-center">
                  <CardContent className="px-4 py-0">
                    <div className="text-3xl font-bold gradient-text mb-1">
                      <AnimatedCounter end={6} suffix="+" />
                    </div>
                    <p className="text-sm text-muted-foreground">Languages & Frameworks</p>
                  </CardContent>
                </Card>
                <Card className="glass-card card-lift py-5 gap-2 text-center">
                  <CardContent className="px-4 py-0">
                    <div className="text-3xl font-bold gradient-text mb-1">
                      <AnimatedCounter end={4} />
                    </div>
                    <p className="text-sm text-muted-foreground">Certifications</p>
                  </CardContent>
                </Card>
              </div>

              {/* Certifications */}
              <Card className="glass-card py-4 gap-3">
                <CardHeader className="pb-0 pt-0 px-4">
                  <CardTitle className="text-base flex items-center gap-2 text-card-foreground">
                    <Award className="w-4 h-4 text-emerald-500" />
                    Certifications
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-4 py-0">
                  <ul className="space-y-2">
                    {CERTIFICATIONS.map((cert, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <ChevronRight className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                        {cert}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Download Resume */}
              <a
                href="/Mohmed_Yahia_CV.pdf"
                download
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-sm font-medium hover:bg-emerald-500/20 hover:border-emerald-500/40 transition-all duration-200 group"
              >
                <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                Download Resume
              </a>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

// ─── Skills Section ─────────────────────────────────────────────────────────

function TechMarquee() {
  return (
    <div className="relative overflow-hidden py-8 my-8">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      <div className="marquee-track flex gap-4">
        {[...TECH_MARQUEE_ITEMS, ...TECH_MARQUEE_ITEMS].map((tech, i) => (
          <div
            key={`${tech}-${i}`}
            className="flex-shrink-0 px-5 py-2.5 rounded-full glass-card text-sm font-medium text-muted-foreground whitespace-nowrap select-none"
          >
            {tech}
          </div>
        ))}
      </div>
    </div>
  );
}

function SkillsSection() {
  const [activeSkillCategory, setActiveSkillCategory] = useState("All");
  const skillCategories = ["All", ...SKILLS.map((s) => s.category)];
  const filteredSkills = activeSkillCategory === "All"
    ? SKILLS
    : SKILLS.filter((s) => s.category === activeSkillCategory);

  return (
    <section id="skills" className="section-padding relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionHeading
            badge="Skills"
            title="Technical "
            titleHighlight="Expertise"
            description="A comprehensive toolkit of technologies I use to bring ideas to life, from responsive web applications to cross-platform mobile solutions."
          />
        </AnimatedSection>

        {/* Tech Stack Marquee */}
        <AnimatedSection delay={0.1}>
          <TechMarquee />
        </AnimatedSection>

        {/* Category filter pills */}
        <AnimatedSection delay={0.15}>
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            {skillCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveSkillCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 ${
                  activeSkillCategory === cat
                    ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/25"
                    : "glass-card text-muted-foreground hover:text-foreground hover:bg-accent"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </AnimatedSection>

        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((category, catIndex) => (
              <motion.div
                key={category.category}
                layout
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                transition={{ duration: 0.3, delay: catIndex * 0.05 }}
              >
                <Card className="glass-card card-lift h-full py-4 gap-4 skill-card-hover-bg">
                  <CardHeader className="pb-0 pt-0 px-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                        <category.icon className="w-5 h-5 text-emerald-500" />
                      </div>
                      <CardTitle className="text-base text-card-foreground">{category.category}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="px-5 py-0">
                    <div className="space-y-4">
                      {category.items.map((skill, skillIndex) => (
                        <SkillBar
                          key={skill.name}
                          name={skill.name}
                          level={skill.level}
                          delay={catIndex * 5 + skillIndex}
                        />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Code Snippet Section ───────────────────────────────────────────────────

function CodeSnippetSection() {
  const codeLines = [
    [{ text: "interface ", color: "" }, { text: "Developer", color: "text-emerald-400" }, { text: " {", color: "" }],
    [{ text: "  name", color: "text-emerald-400" }, { text: ": ", color: "" }, { text: "string", color: "text-cyan-400" }, { text: ";", color: "" }],
    [{ text: "  role", color: "text-emerald-400" }, { text: ": ", color: "" }, { text: "string[]", color: "text-cyan-400" }, { text: ";", color: "" }],
    [{ text: "  skills", color: "text-emerald-400" }, { text: ": ", color: "" }, { text: "TechStack[]", color: "text-cyan-400" }, { text: ";", color: "" }],
    [{ text: "  passion", color: "text-emerald-400" }, { text: ": ", color: "" }, { text: "string", color: "text-cyan-400" }, { text: ";", color: "" }],
    [{ text: "}", color: "" }],
    [{ text: "", color: "" }],
    [{ text: "const ", color: "text-purple-400" }, { text: "mohmed", color: "text-emerald-400" }, { text: ": ", color: "" }, { text: "Developer", color: "text-emerald-400" }, { text: " = {", color: "" }],
    [{ text: "  name: ", color: "" }, { text: '"Mohmed Yahia Almhdi"', color: "text-amber-300" }, { text: ",", color: "" }],
    [{ text: "  role: [", color: "" }, { text: '"Front-End Developer"', color: "text-amber-300" }, { text: ", ", color: "" }, { text: '"Flutter Developer"', color: "text-amber-300" }, { text: "],", color: "" }],
    [{ text: "  skills: [", color: "" }, { text: '"React.js"', color: "text-amber-300" }, { text: ", ", color: "" }, { text: '"Flutter"', color: "text-amber-300" }, { text: ", ", color: "" }, { text: '"TypeScript"', color: "text-amber-300" }, { text: "],", color: "" }],
    [{ text: "  passion: ", color: "" }, { text: '"Building beautiful, performant apps"', color: "text-amber-300" }, { text: ",", color: "" }],
    [{ text: "};", color: "" }],
    [{ text: "", color: "" }],
    [{ text: "async function ", color: "text-purple-400" }, { text: "buildSomething", color: "text-cyan-400" }, { text: "(", color: "" }, { text: "idea", color: "text-amber-300" }, { text: ": ", color: "" }, { text: "string", color: "text-cyan-400" }, { text: ") {", color: "" }],
    [{ text: "  const ", color: "text-purple-400" }, { text: "plan", color: "text-emerald-400" }, { text: " = ", color: "" }, { text: "design", color: "text-cyan-400" }, { text: "(idea);    ", color: "" }, { text: "// Clean architecture", color: "text-muted-foreground/50" }],
    [{ text: "  const ", color: "text-purple-400" }, { text: "app", color: "text-emerald-400" }, { text: "   = ", color: "" }, { text: "develop", color: "text-cyan-400" }, { text: "(plan);   ", color: "" }, { text: "// Pixel-perfect UI", color: "text-muted-foreground/50" }],
    [{ text: "  return await ", color: "text-purple-400" }, { text: "app", color: "text-emerald-400" }, { text: ".", color: "" }, { text: "deploy", color: "text-cyan-400" }, { text: "();  ", color: "" }, { text: "// Ship it! \uD83D\uDE80", color: "text-muted-foreground/50" }],
    [{ text: "}", color: "" }],
  ];

  return (
    <section className="section-padding-compact relative overflow-hidden">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionHeading
            badge="What I Do"
            title="My "
            titleHighlight="Approach"
          />
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <Card className="glass-card overflow-hidden card-glow-hover">
            <CardHeader className="pb-3 pt-0 px-0">
              <div className="flex items-center gap-2 px-5 pt-5">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="ml-3 text-xs text-muted-foreground font-mono">developer-profile.ts</span>
              </div>
            </CardHeader>
            <CardContent className="px-5 pb-5">
              <pre className="text-xs sm:text-sm font-mono text-muted-foreground leading-relaxed overflow-x-auto">
                <code>
                  {codeLines.map((line, lineIdx) => (
                    <span key={lineIdx}>
                      {line.map((seg, segIdx) => (
                        <span key={segIdx} className={seg.color}>{seg.text}</span>
                      ))}
                      {"\n"}
                    </span>
                  ))}
                </code>
              </pre>
            </CardContent>
          </Card>
        </AnimatedSection>
      </div>
    </section>
  );
}

// ─── Fun Facts Section ──────────────────────────────────────────────────────

function FunFactsSection() {
  return (
    <section className="py-14 sm:py-20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionHeading
            badge="Fun Facts"
            title="By the "
            titleHighlight="Numbers"
            description="A lighthearted look at the journey so far — powered by passion and plenty of caffeine."
          />
        </AnimatedSection>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {FUN_FACTS.map((fact, index) => (
            <AnimatedSection key={fact.label} delay={index * 0.1}>
              <motion.div
                whileHover={{ scale: 1.05, y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Card className="glass-card py-5 gap-4 text-center h-full cursor-default">
                  <CardContent className="px-4 py-0 space-y-3">
                    <motion.div
                      className={`mx-auto w-14 h-14 rounded-2xl bg-gradient-to-br ${fact.color} flex items-center justify-center shadow-lg stat-icon-sparkle`}
                      whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      <fact.icon className="w-7 h-7 text-white" />
                    </motion.div>
                    <div>
                      <p className="text-2xl sm:text-3xl font-bold text-card-foreground stat-number-glow">
                        {fact.value}
                      </p>
                      <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                        {fact.label}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── My Process Section ─────────────────────────────────────────────────────

function MyProcessSection() {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionHeading
            badge="Workflow"
            title="My "
            titleHighlight="Process"
            description="A proven workflow that ensures every project is delivered with quality, on time, and aligned with your vision."
          />
        </AnimatedSection>

        {/* Desktop: Horizontal layout with connecting lines */}
        <div className="hidden md:block">
          <div className="relative flex items-start justify-between">
            {/* Connecting line */}
            <div className="absolute top-12 left-[calc(12.5%+20px)] right-[calc(12.5%+20px)] h-px bg-gradient-to-r from-emerald-500/40 via-teal-500/40 to-emerald-500/40" />

            {PROCESS_STEPS.map((step, index) => (
              <AnimatedSection key={step.title} delay={index * 0.15} className="relative z-10 flex-1 flex flex-col items-center text-center px-4">
                {/* Numbered circle */}
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="w-14 h-14 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white text-lg font-bold shadow-lg shadow-emerald-500/25 mb-4"
                >
                  {step.number}
                </motion.div>

                {/* Icon */}
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-3">
                  <step.icon className="w-5 h-5 text-emerald-500" />
                </div>

                {/* Title */}
                <h3 className="text-base font-semibold mb-2">{step.title}</h3>

                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed max-w-[200px]">
                  {step.description}
                </p>
              </AnimatedSection>
            ))}
          </div>
        </div>

        {/* Mobile: Vertical layout */}
        <div className="md:hidden relative">
          {/* Vertical connecting line */}
          <div className="absolute left-6 top-14 bottom-14 w-px bg-gradient-to-b from-emerald-500/40 via-teal-500/40 to-emerald-500/40" />

          <div className="space-y-8">
            {PROCESS_STEPS.map((step, index) => (
              <AnimatedSection key={step.title} delay={index * 0.1} className="relative z-10 flex gap-5">
                {/* Numbered circle */}
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white text-base font-bold shadow-lg shadow-emerald-500/25"
                >
                  {step.number}
                </motion.div>

                <div className="pt-1">
                  {/* Icon + Title row */}
                  <div className="flex items-center gap-2 mb-1.5">
                    <step.icon className="w-4 h-4 text-emerald-500" />
                    <h3 className="text-base font-semibold">{step.title}</h3>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Achievements Section ────────────────────────────────────────────────────

function AchievementsSection() {
  return (
    <section className="py-14 sm:py-20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionHeading
            badge="Achievements"
            title="Milestones & "
            titleHighlight="Badges"
            description="Recognitions and milestones earned throughout my development journey."
          />
        </AnimatedSection>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {ACHIEVEMENTS.map((badge, index) => (
            <AnimatedSection key={badge.title} delay={index * 0.08}>
              <motion.div
                whileHover={{ scale: 1.05, y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Card className="glass-card py-5 gap-3 text-center h-full cursor-default achievement-badge-card">
                  <CardContent className="px-4 py-0 flex flex-col items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${badge.color} flex items-center justify-center shadow-lg achievement-badge-icon`}>
                      <badge.icon className="w-6 h-6 text-white" />
                    </div>
                    <p className="text-xs sm:text-sm font-medium text-card-foreground leading-tight">
                      {badge.title}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Projects Section ───────────────────────────────────────────────────────

function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState<"All" | "Web" | "Mobile">("All");
  const filteredProjects = activeFilter === "All"
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className="section-padding relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionHeading
            badge="Projects"
            title="Featured "
            titleHighlight="Work"
            description="A selection of projects that showcase my skills in building responsive, user-focused applications across web and mobile platforms."
          />
        </AnimatedSection>

        {/* Filter tabs */}
        <AnimatedSection delay={0.1}>
          <div className="flex items-center justify-center gap-2 mb-10">
            {(["All", "Web", "Mobile"] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeFilter === filter
                    ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/25"
                    : "glass-card text-muted-foreground hover:text-foreground hover:bg-accent"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </AnimatedSection>

        <motion.div layout className="grid md:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Card className="glass-card card-lift group h-full py-0 gap-0 overflow-hidden relative project-card-shine">
                  {/* Project screenshot */}
                  <div className="relative aspect-video overflow-hidden rounded-t-lg">
                    <Image
                      src={project.screenshot}
                      alt={`${project.title} screenshot`}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                    {/* Category badge overlay */}
                    <Badge
                      variant="outline"
                      className="absolute top-3 left-3 text-[10px] border-emerald-500/30 text-emerald-500 bg-background/70 backdrop-blur-sm"
                    >
                      {project.category}
                    </Badge>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute top-3 right-3 w-8 h-8 rounded-lg bg-background/70 backdrop-blur-sm border border-emerald-500/20 flex items-center justify-center text-muted-foreground hover:text-emerald-500 transition-colors"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  </div>

                  <CardHeader className="pb-0 pt-4 px-5">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-lg bg-gradient-to-br ${project.color} flex items-center justify-center flex-shrink-0`}
                      >
                        <project.icon className="w-5 h-5 text-white" />
                      </div>
                      <CardTitle className="text-lg text-card-foreground">{project.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="px-5 py-0 pb-4">
                    <CardDescription className="mb-3 leading-relaxed">
                      {project.description}
                    </CardDescription>
                    <div className="flex flex-wrap gap-2">
                      {project.techs.map((tech) => (
                        <Badge
                          key={tech}
                          variant="secondary"
                          className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 hover:bg-emerald-500/20 text-xs font-medium"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="px-5 py-0 pb-4">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm text-emerald-500 hover:text-emerald-400 transition-colors font-medium"
                    >
                      View on GitHub
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Testimonials Section ──────────────────────────────────────────────────

function TestimonialsSection() {
  return (
    <section className="section-padding relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionHeading
            badge="Testimonials"
            title="What People "
            titleHighlight="Say"
            description="Feedback from clients and colleagues I've had the pleasure of working with."
          />
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((testimonial, index) => (
            <AnimatedSection key={testimonial.name} delay={index * 0.1}>
              <Card className="glass-card card-lift h-full py-5 gap-4 border-l-4 border-l-emerald-500 relative overflow-hidden testimonial-animated-border">
                {/* Decorative quote mark */}
                <span className="testimonial-quote-mark">&ldquo;</span>
                <CardContent className="px-5 py-0 space-y-4 relative z-10">
                  {/* Stars */}
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < testimonial.rating
                            ? "text-emerald-500 fill-emerald-500"
                            : "text-muted-foreground/30"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Review text */}
                  <p className="text-sm text-muted-foreground leading-relaxed italic">
                    &ldquo;{testimonial.text}&rdquo;
                  </p>

                  {/* Reviewer */}
                  <div className="flex items-center gap-3 pt-2">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0 testimonial-avatar-shadow">
                      <span className="text-xs font-semibold text-emerald-500">
                        {testimonial.name.split(" ").map((n) => n[0]).join("")}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-card-foreground">{testimonial.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {testimonial.role}, {testimonial.company}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Timeline Section ───────────────────────────────────────────────────────

function TimelineSection() {
  return (
    <section id="experience" className="section-padding relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionHeading
            badge="Experience & Education"
            title="My "
            titleHighlight="Journey"
            description="From intensive training programs to hands-on project development, here's my professional journey so far."
          />
        </AnimatedSection>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px timeline-line-animated md:-translate-x-px" />

          <div className="space-y-8">
            {TIMELINE_ITEMS.map((item, index) => (
              <AnimatedSection
                key={index}
                delay={index * 0.1}
              >
                <div
                  className={`relative flex gap-6 md:gap-0 ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10">
                    <div className="w-12 h-12 rounded-full bg-background border-2 border-emerald-500 flex items-center justify-center timeline-dot-glow">
                      <item.icon className="w-5 h-5 text-emerald-500" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="ml-16 md:ml-0 md:w-[calc(50%-2.5rem)]">
                    <Card className="glass-card card-lift h-full py-4 gap-3">
                      <CardHeader className="pb-0 pt-0 px-5">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge
                            variant="outline"
                            className={`text-xs ${
                              item.type === "work"
                                ? "border-emerald-500/20 text-emerald-500 bg-emerald-500/5"
                                : item.type === "training"
                                ? "border-teal-500/20 text-teal-500 bg-teal-500/5"
                                : "border-cyan-500/20 text-cyan-500 bg-cyan-500/5"
                            }`}
                          >
                            {item.type === "work"
                              ? "Work"
                              : item.type === "training"
                              ? "Training"
                              : "Education"}
                          </Badge>
                          <span className="text-xs text-muted-foreground font-mono">
                            {item.date}
                          </span>
                        </div>
                        <CardTitle className="text-base text-card-foreground">{item.title}</CardTitle>
                        <CardDescription className="text-sm text-emerald-500">
                          {item.subtitle}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="px-5 py-0">
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {item.description}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Contact Section ────────────────────────────────────────────────────────

function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);


const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  const subject = encodeURIComponent(`Portfolio Contact: Message from ${formData.name}`);
  const body = encodeURIComponent(
    `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
  );
  window.location.href = `mailto:mohmedyahiaalmhdi@gmail.com?subject=${subject}&body=${body}`;

  setSubmitted(true);
  setFormData({ name: "", email: "", message: "" });
  setTimeout(() => setSubmitted(false), 4000);
};

  return (
    <section id="contact" className="section-padding relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionHeading
            badge="Contact"
            title="Let's "
            titleHighlight="Connect"
            description="Have a project in mind or want to collaborate? I'd love to hear from you. Drop me a message and I'll get back to you as soon as possible."
          />
        </AnimatedSection>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Contact info */}
          <AnimatedSection delay={0.1} className="lg:col-span-2">
            <div className="space-y-6">
              <h3 className="text-xl font-semibold mb-6 text-card-foreground">Get in Touch</h3>

              <div className="space-y-4">
                <Card className="glass-card card-lift py-4 gap-3">
                  <CardContent className="flex items-center gap-4 px-5 py-0">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center flex-shrink-0 contact-icon-animated">
                      <Mail className="w-5 h-5 text-emerald-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-card-foreground">Email</p>
                      <a
                        href="mailto:mohmedyahiaalmhdi@gmail.com"
                        className="text-sm text-muted-foreground hover:text-emerald-500 transition-colors break-all"
                      >
                        mohmedyahiaalmhdi@gmail.com
                      </a>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-card card-lift py-4 gap-3">
                  <CardContent className="flex items-center gap-4 px-5 py-0">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center flex-shrink-0 contact-icon-animated">
                      <Phone className="w-5 h-5 text-emerald-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-card-foreground">Phone</p>
                      <a
                        href="tel:+963952516434"
                        className="text-sm text-muted-foreground hover:text-emerald-500 transition-colors"
                      >
                        +963 952 516 434
                      </a>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-card card-lift py-4 gap-3">
                  <CardContent className="flex items-center gap-4 px-5 py-0">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center flex-shrink-0 contact-icon-animated">
                      <MapPin className="w-5 h-5 text-emerald-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-card-foreground">Location</p>
                      <p className="text-sm text-muted-foreground">
                        Damascus, Syria
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Social links */}
              <div className="pt-4">
                <p className="text-sm text-muted-foreground mb-4">
                  Follow me on social media
                </p>
                <div className="flex gap-3">
                  <a
                    href="https://github.com/MohmedYahiaAlmhdi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link-hover w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-muted-foreground hover:text-emerald-500 hover:bg-emerald-500/20 hover:border-emerald-500/40"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/mohmedyahia-almhdi-283175315"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link-hover w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-muted-foreground hover:text-emerald-500 hover:bg-emerald-500/20 hover:border-emerald-500/40"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a
                    href="mailto:mohmedyahiaalmhdi@gmail.com"
                    className="social-link-hover w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-muted-foreground hover:text-emerald-500 hover:bg-emerald-500/20 hover:border-emerald-500/40"
                  >
                    <Mail className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Contact form */}
          <AnimatedSection delay={0.2} className="lg:col-span-3">
            <Card className="glass-card py-6 gap-4 gradient-border-card">
              <CardHeader className="pb-0 pt-0 px-6">
                <CardTitle className="text-xl text-card-foreground">Send a Message</CardTitle>
                <CardDescription>
                  Fill out the form and I&apos;ll respond within 24 hours.
                </CardDescription>
              </CardHeader>
              <CardContent className="px-6 py-0">
                <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Your Name</Label>
                      <Input
                        id="name"
                        placeholder="your name"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        required
                        className="bg-background/50 border-border/50 focus:border-emerald-500/50 focus:ring-emerald-500/20"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Your Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your email@example.com"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        required
                        className="bg-background/50 border-border/50 focus:border-emerald-500/50 focus:ring-emerald-500/20"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell me about your project or idea..."
                      rows={5}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      required
                      className="bg-background/50 border-border/50 focus:border-emerald-500/50 focus:ring-emerald-500/20 resize-none"
                    />
                  </div>
                 <Button
                    type="submit"
                    className="...">
                    {submitted ? (
                      <span>...✓ Message Sent!</span>
                    ) : (
                      <span>...Send Message</span>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

// ─── CTA Section ─────────────────────────────────────────────────────────────

function CTASection() {
  return (
    <section className="py-20 sm:py-28 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-teal-500/5 to-cyan-500/5 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <AnimatedSection>
          <div className="glass-card py-12 sm:py-16 px-6 sm:px-12 text-center border border-emerald-500/10 shadow-xl shadow-emerald-500/5 cta-animated-border">
            {/* Floating decorative shapes */}
            <div className="cta-floating-shape" />
            <div className="cta-floating-shape" />
            <div className="cta-floating-shape" />
            <div className="cta-floating-shape" />
            <div className="cta-floating-shape" />
            <div className="cta-floating-shape" />
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/25">
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 tracking-tight text-foreground">
              Have a project in <span className="gradient-text">mind</span>?
            </h2>

            <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
              I&apos;m always open to discussing new projects, creative ideas, or opportunities
              to be part of your vision. Let&apos;s create something extraordinary together.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl px-8 h-12 text-base font-medium shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all"
                onClick={() => {
                  const el = document.querySelector("#contact");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <Send className="w-4 h-4 mr-2" />
                Start a Conversation
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="rounded-xl px-8 h-12 text-base font-medium border-emerald-500/20 hover:bg-emerald-500/10 hover:border-emerald-500/40 text-emerald-500"
                asChild
              >
                <a href="/Mohmed_Yahia_CV.pdf" download>
                  <Download className="w-4 h-4 mr-2" />
                  Download CV
                </a>
              </Button>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

// ─── Blog Section ────────────────────────────────────────────────────────────

function BlogSection() {
  const categoryColors: Record<string, string> = {
    Frontend: "bg-emerald-500",
    Mobile: "bg-teal-500",
    Architecture: "bg-cyan-500",
  };

  return (
    <section id="blog" className="section-padding relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionHeading
            badge="Blog"
            title="Latest "
            titleHighlight="Articles"
            description="Thoughts, tutorials, and insights from my journey as a developer."
          />
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BLOG_POSTS.map((post, index) => (
            <AnimatedSection key={post.title} delay={index * 0.1}>
              <Card className="glass-card card-lift h-full py-5 gap-4 group hover:shadow-lg hover:shadow-emerald-500/5 hover:border-emerald-500/20 transition-all duration-300 blog-card-left-border">
                <CardHeader className="pb-0 pt-0 px-5">
                  {/* Category dot + meta */}
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                    <span className="flex items-center gap-1.5">
                      <span className={`w-2 h-2 rounded-full ${categoryColors[post.category] || "bg-emerald-500"}`} />
                      {post.category}
                    </span>
                    <span className="text-border">·</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {post.date}
                    </span>
                  </div>
                  <CardTitle className="text-base leading-snug text-card-foreground group-hover:text-emerald-500 transition-colors">
                    {post.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-5 py-0 space-y-4">
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {post.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="bg-emerald-500/5 text-emerald-500/80 border-emerald-500/10 text-[11px] font-medium px-2 py-0.5"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  {/* Read time + link */}
                  <div className="flex items-center justify-between pt-2 border-t border-border/30">
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                    <a
                      href="#"
                      className="blog-read-more-arrow text-sm text-emerald-500 hover:text-emerald-400 transition-colors font-medium"
                    >
                      Read More
                      <ArrowRight className="w-3.5 h-3.5 blog-arrow-icon" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Footer ─────────────────────────────────────────────────────────────────

function Footer() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const currentYear = useSyncExternalStore(
    () => () => {},
    () => new Date().getFullYear(),
    () => 2025
  );

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="footer-gradient-top border-t border-border/50 bg-background/50 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col items-center gap-4">
          {/* Copyright - centered */}
          <span className="text-sm text-muted-foreground text-center">
            © 2026{" "}
            <span className="footer-logo-gradient font-medium">
              Mohmed Yahia Almhdi
            </span>
            . All rights reserved.
          </span>

          {/* Social links - centered */}
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/MohmedYahiaAlmhdi"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link-hover footer-link-hover w-10 h-10 rounded-lg flex items-center justify-center text-muted-foreground hover:text-emerald-500 hover:bg-emerald-500/10 transition-colors"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/mohmedyahia-almhdi-283175315"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link-hover footer-link-hover w-10 h-10 rounded-lg flex items-center justify-center text-muted-foreground hover:text-emerald-500 hover:bg-emerald-500/10 transition-colors"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="mailto:mohmedyahiaalmhdi@gmail.com"
              className="social-link-hover footer-link-hover w-10 h-10 rounded-lg flex items-center justify-center text-muted-foreground hover:text-emerald-500 hover:bg-emerald-500/10 transition-colors"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Back to top button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className="back-to-top-glow fixed bottom-6 right-6 z-50 w-11 h-11 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center"
          >
            <ArrowUp className="w-5 h-5" />
            <span className="sr-only">Back to top</span>
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
}

// ─── Main Page ──────────────────────────────────────────────────────────────

export default function PortfolioPage() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col noise-overlay">
      {/* Scroll progress bar */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-1">
        <div
          className="scroll-progress-glow scroll-progress-dot h-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-[width] duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <SectionDivider />
        <QuoteSection />
        <ValuePropsSection />
        <ServicesSection />
        <AboutSection />
        <SectionDivider />
        <SkillsSection />
        <SectionDivider />
        <CodeSnippetSection />
        <SectionDivider />
        <FunFactsSection />
        <SectionDivider />
        <MyProcessSection />
        <CTASection />
        <SectionDivider />
        <AchievementsSection />
        <ProjectsSection />
        <SectionDivider />
        <BlogSection />
        <SectionDivider />
        <TestimonialsSection />
        <SectionDivider />
        <TimelineSection />
        <SectionDivider />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
