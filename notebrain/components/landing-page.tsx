"use client"

import type React from "react"

import {
  FileText,
  Github,
  ShieldCheck,
  History,
  Sparkles,
  FileCode,
  TerminalSquare,
  FolderTree,
  Globe,
  Lightbulb,
  ArrowRight,
  Code2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { useRef, useState } from "react"

export default function LandingPage() {
  const router = useRouter()
  const [isLoadingTrial, setIsLoadingTrial] = useState(false)
  const [isLoadingGithub, setIsLoadingGithub] = useState(false)
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      </div>

      {/* Hero Section */}
      <motion.section
        className="relative text-center py-20 px-6 min-h-screen flex flex-col justify-center"
        style={{ y, opacity }}
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            className="inline-block mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-blue-500/30 rounded-full px-6 py-2 text-sm font-medium">
              <Code2 className="w-4 h-4 inline mr-2" />
              Developer-First Note Taking
            </div>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            🧠 Welcome to{" "}
            <motion.span
              className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
            >
              NoteBrain
            </motion.span>
          </motion.h1>

          <motion.p
            className="text-gray-300 text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Your dev-friendly note-taking app — edit, code, and sync directly with your GitHub repository.
          </motion.p>

          <motion.div
            className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <motion.div
              whileHover={{ scale: isLoadingTrial ? 1 : 1.05 }}
              whileTap={{ scale: isLoadingTrial ? 1 : 0.95 }}
            >
              <Button
                onClick={async () => {
                  setIsLoadingTrial(true)
                  // Add a small delay to show the loading effect
                  await new Promise((resolve) => setTimeout(resolve, 800))
                  router.push("/yourLibrary")
                }}
                disabled={isLoadingTrial || isLoadingGithub}
                className="group bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-600 text-white font-semibold px-8 py-4 rounded-xl hover:from-gray-700 hover:to-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed min-w-[240px]"
              >
                {isLoadingTrial ? (
                  <motion.div
                    className="flex items-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div
                      className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full mr-2"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    />
                    <motion.span
                      animate={{ opacity: [1, 0.5, 1] }}
                      transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                    >
                      Loading...
                    </motion.span>
                  </motion.div>
                ) : (
                  <>
                    Try Without Signing In
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: isLoadingGithub ? 1 : 1.05 }}
              whileTap={{ scale: isLoadingGithub ? 1 : 0.95 }}
            >
              <Button
                onClick={async () => {
                  setIsLoadingGithub(true)
                  // Add a small delay to show the loading effect
                  await new Promise((resolve) => setTimeout(resolve, 800))
                  router.push("/login")
                }}
                disabled={isLoadingTrial || isLoadingGithub}
                className="group bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold px-8 py-4 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed min-w-[240px]"
              >
                {isLoadingGithub ? (
                  <motion.div
                    className="flex items-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div
                      className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full mr-2"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    />
                    <motion.span
                      animate={{ opacity: [1, 0.5, 1] }}
                      transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                    >
                      Connecting to GitHub...
                    </motion.span>
                  </motion.div>
                ) : (
                  <>
                    <Github className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                    Sign in with GitHub
                  </>
                )}
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Floating Elements */}
        <motion.div
          className="absolute top-20 left-10 w-4 h-4 bg-blue-400 rounded-full opacity-60"
          animate={{
            y: [0, -20, 0],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-40 right-20 w-3 h-3 bg-purple-400 rounded-full opacity-60"
          animate={{
            y: [0, -15, 0],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </motion.section>

      {/* Features Section */}
      <FeaturesSection />

      {/* Motivational Section */}
      <MotivationalSection />

      {/* Footer */}
      <motion.footer
        className="relative text-center text-gray-400 text-sm py-8 border-t border-gray-800/50 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="bg-gradient-to-r from-transparent via-gray-800/20 to-transparent h-px w-full mb-6" />©{" "}
        {new Date().getFullYear()} NoteBrain — Made for devs who love writing and building.
      </motion.footer>
    </main>
  )
}

function FeaturesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const features = [
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Markdown Notes",
      description: "Write beautifully formatted notes with live markdown preview and shortcuts.",
      color: "from-blue-400 to-cyan-400",
    },
    {
      icon: <Github className="w-6 h-6" />,
      title: "GitHub Sync",
      description: "Your notes are saved in your GitHub repo. Access them anywhere, anytime.",
      color: "from-purple-400 to-pink-400",
    },
    {
      icon: <FileCode className="w-6 h-6" />,
      title: "Built-in Code Editor",
      description: "Write and format code directly in your notes with syntax highlighting.",
      color: "from-green-400 to-emerald-400",
    },
    {
      icon: <TerminalSquare className="w-6 h-6" />,
      title: "Live Code Compiler",
      description: "Compile and run code snippets in multiple languages with real-time output.",
      color: "from-orange-400 to-red-400",
    },
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      title: "Secure GitHub Login",
      description: "Authenticate using GitHub OAuth. No extra passwords. Privacy respected.",
      color: "from-indigo-400 to-blue-400",
    },
    {
      icon: <FolderTree className="w-6 h-6" />,
      title: "VS Code-like File Tree",
      description: "Organize notes in a developer-friendly folder/file interface like VS Code.",
      color: "from-teal-400 to-cyan-400",
    },
  ]

  return (
    <section ref={ref} className="relative py-20 px-6 bg-gradient-to-b from-black/50 to-gray-900/50 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
          🛠 Key Features
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full" />
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <FeatureCard {...feature} />
          </motion.div>
        ))}
      </div>
    </section>
  )
}

function MotivationalSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const highlights = [
    {
      icon: <Lightbulb className="w-6 h-6" />,
      title: "Built for Devs",
      description: "Write code, take notes, manage structure — all in one dev-oriented platform.",
      color: "from-yellow-400 to-orange-400",
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Always with You",
      description: "Access your work from any device, thanks to GitHub cloud sync.",
      color: "from-green-400 to-teal-400",
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "Simple & Beautiful",
      description: "A clean, minimal design that lets you focus — no clutter, just writing.",
      color: "from-purple-400 to-pink-400",
    },
    {
      icon: <History className="w-6 h-6" />,
      title: "Version Control",
      description: "Every edit is committed to GitHub — track progress and roll back anytime.",
      color: "from-cyan-400 to-blue-400",
    },
  ]

  return (
    <section ref={ref} className="relative py-20 px-6 bg-gradient-to-b from-gray-900/50 to-black/50">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
          💡 Why Developers Love NoteBrain
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full" />
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {highlights.map((highlight, index) => (
          <motion.div
            key={highlight.title}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            <FeatureCard {...highlight} />
          </motion.div>
        ))}
      </div>
    </section>
  )
}

function FeatureCard({
  icon,
  title,
  description,
  color,
}: {
  icon: React.ReactNode
  title: string
  description: string
  color: string
}) {
  return (
    <motion.div
      className="group relative bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden"
      whileHover={{
        scale: 1.02,
        rotateY: 5,
        rotateX: 5,
      }}
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Gradient overlay on hover */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl`}
      />

      {/* Animated border */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-r ${color} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300`}
      />

      <div className="relative z-10">
        <motion.div
          className={`flex items-center gap-4 mb-6`}
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <div className={`p-3 rounded-xl bg-gradient-to-r ${color} text-black shadow-lg`}>{icon}</div>
          <h3 className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-white group-hover:to-gray-300 transition-all duration-300">
            {title}
          </h3>
        </motion.div>

        <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
          {description}
        </p>
      </div>

      {/* Floating particles */}
      <motion.div
        className="absolute top-4 right-4 w-2 h-2 bg-white/20 rounded-full"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.3, 0.8, 0.3],
        }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  )
}
