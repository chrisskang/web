"use client";

import { PointMaterial, Points } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

// Reusable components
const Section = ({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) => (
  <section id={id} className="min-h-screen flex flex-col justify-center py-10">
    <h2 className="text-3xl font-bold mb-6 text-center">{title}</h2>
    {children}
  </section>
);

const Button = ({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition duration-300"
    {...props}
  >
    {children}
  </button>
);

// Interactive background component
const InteractiveBackground = () => {
  const count = 5000;
  const [positions, setPositions] = useState<Float32Array | null>(null);
  const pointsRef = useRef<THREE.Points>(null);
  const { mouse, viewport } = useThree();

  useEffect(() => {
    if (!positions) {
      const pos = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        pos[i * 3] = (Math.random() - 0.5) * 10;
        pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
        pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
      }
      setPositions(pos);
    }
  }, [positions]);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.x += delta * 0.1;
      pointsRef.current.rotation.y += delta * 0.1;

      const positions = pointsRef.current.geometry.attributes.position
        .array as Float32Array;
      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        positions[i3] +=
          ((mouse.x * viewport.width) / 2 - positions[i3]) * 0.01;
        positions[i3 + 1] +=
          ((mouse.y * viewport.height) / 2 - positions[i3 + 1]) * 0.01;
      }
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <Points
      ref={pointsRef}
      positions={positions}
      stride={3}
      frustumCulled={false}
    >
      <PointMaterial
        transparent
        color="#8352FD"
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </Points>
  );
};

// Portfolio data
const portfolioData = {
  name: "Jane Designer",
  title: "UI/UX Designer",
  description: "Crafting digital experiences that inspire",
  skills: ["UI/UX Design", "Branding", "Illustration", "Web Development"],
  projects: [
    {
      title: "E-commerce Redesign",
      description: "A modern e-commerce platform",
    },
    { title: "Mobile App UI", description: "Intuitive mobile app interface" },
    { title: "Brand Identity", description: "Cohesive branding for a startup" },
    {
      title: "Website Redesign",
      description: "Refreshed web presence for a client",
    },
  ],
};

// Main component
export default function Landing() {
  const [activeSection, setActiveSection] = useState("home");

  const handleScroll = () => {
    const sections = ["home", "skills", "projects", "contact"];
    const scrollPosition = window.scrollY + window.innerHeight / 2;

    for (const section of sections) {
      const element = document.getElementById(section);
      if (element && scrollPosition >= element.offsetTop) {
        setActiveSection(section);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-hidden">
      <Canvas className="fixed inset-0 -z-10">
        <InteractiveBackground />
      </Canvas>

      <div className="relative z-10">
        <header className="fixed top-0 left-0 right-0 bg-gray-900 bg-opacity-70 backdrop-blur-sm">
          <nav className="container mx-auto px-6 py-4">
            <ul className="flex justify-center space-x-6">
              {["home", "skills", "projects", "contact"].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item}`}
                    className={`text-lg transition-colors ${
                      activeSection === item
                        ? "text-purple-400"
                        : "text-gray-300 hover:text-purple-300"
                    }`}
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </header>

        <main className="container mx-auto px-6">
          <Section id="home" title="">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h1 className="text-5xl font-bold mb-4">{portfolioData.name}</h1>
              <p className="text-xl mb-8">{portfolioData.description}</p>
              <Button>View My Work</Button>
            </motion.div>
          </Section>

          <Section id="skills" title="Skills">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {portfolioData.skills.map((skill, index) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-gray-800 p-4 rounded-lg text-center"
                >
                  {skill}
                </motion.div>
              ))}
            </div>
          </Section>

          <Section id="projects" title="Projects">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {portfolioData.projects.map((project, index) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-gray-800 p-6 rounded-lg"
                >
                  <h3 className="text-xl font-semibold mb-2">
                    {project.title}
                  </h3>
                  <p>{project.description}</p>
                </motion.div>
              ))}
            </div>
          </Section>

          <Section id="contact" title="Contact Me">
            <form className="max-w-md mx-auto space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full p-2 bg-gray-800 rounded border border-gray-700 focus:border-purple-500 focus:outline-none"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full p-2 bg-gray-800 rounded border border-gray-700 focus:border-purple-500 focus:outline-none"
              />
              <textarea
                placeholder="Your Message"
                rows={4}
                className="w-full p-2 bg-gray-800 rounded border border-gray-700 focus:border-purple-500 focus:outline-none"
              ></textarea>
              <Button type="submit">Send Message</Button>
            </form>
          </Section>
        </main>

        <footer className="py-6 text-center text-gray-500">
          <p>
            &copy; {new Date().getFullYear()} {portfolioData.name}. All rights
            reserved.
          </p>
        </footer>
      </div>
    </div>
  );
}
