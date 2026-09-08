"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Box, Layers, Eye, Sparkles, Terminal } from "lucide-react";

interface TechItem {
  name: string;
  category: string;
  color: string;
  textColor: string;
  desc: string;
  pos: [number, number, number]; // [x, y, z] inside box
}

export default function TechStackBox() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const [selectedTech, setSelectedTech] = useState<TechItem | null>(null);
  const [cameraStage, setCameraStage] = useState<string>("Front & Angled Perspective");
  const [scrollPercent, setScrollPercent] = useState<number>(0);

  // Tech stack items placed in a 3x2 grid inside the box
  const techList: TechItem[] = [
    {
      name: "PYTHON",
      category: "Backend & Scripting",
      color: "#651F35",
      textColor: "#FFF8F0",
      desc: "Core backend development, data processing, algorithms, and microservices.",
      pos: [-2.2, 0.6, -1.5], // Back row left
    },
    {
      name: "DJANGO",
      category: "Full Stack Framework",
      color: "#822744",
      textColor: "#F7E6E8",
      desc: "Robust REST APIs, ORM modeling, auth systems, and database migrations.",
      pos: [0, 0.6, -1.5], // Back row center
    },
    {
      name: "JAVA",
      category: "Enterprise Systems",
      color: "#261C1E",
      textColor: "#FFF8F0",
      desc: "Object-oriented design, robust multithreading, and enterprise backend logic.",
      pos: [2.2, 0.6, -1.5], // Back row right
    },
    {
      name: "KAFKA",
      category: "Event Streaming",
      color: "#C96F82",
      textColor: "#FFFFFF",
      desc: "Distributed event streaming, message queues, and high-throughput pipelines.",
      pos: [-2.2, 0.6, 1.5], // Front row left
    },
    {
      name: "SQL",
      category: "Database Systems",
      color: "#3B2D30",
      textColor: "#FFF8F0",
      desc: "Relational schema design, PostgreSQL queries, ACID safety, and indexing.",
      pos: [0, 0.6, 1.5], // Front row center
    },
    {
      name: "SPRING BOOT",
      category: "Service Architecture",
      color: "#A9828C",
      textColor: "#FFFFFF",
      desc: "Microservices architecture, RESTful controllers, and dependency injection.",
      pos: [2.2, 0.6, 1.5], // Front row right
    },
  ];

  // Helper function to create canvas texture with crisp text on faces
  const createCubeTexture = (name: string, bgColor: string, textColor: string) => {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext("2d");
    if (!ctx) return new THREE.CanvasTexture(canvas);

    // Background
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, 512, 512);

    // Editorial Border
    ctx.lineWidth = 14;
    ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
    ctx.strokeRect(20, 20, 472, 472);

    // Inner Dashed Accent
    ctx.setLineDash([12, 8]);
    ctx.lineWidth = 4;
    ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
    ctx.strokeRect(36, 36, 440, 440);

    // Center Tech Name
    ctx.setLineDash([]);
    ctx.fillStyle = textColor;
    ctx.font = "bold 64px 'Courier New', monospace";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(name, 256, 256);

    // Subtitle stamp
    ctx.font = "bold 24px sans-serif";
    ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
    ctx.fillText("TECH STACK", 256, 330);

    const texture = new THREE.CanvasTexture(canvas);
    texture.anisotropy = 8;
    return texture;
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const container = canvasContainerRef.current;
    if (!container) return;

    // 1. Scene Setup
    const scene = new THREE.Scene();
    scene.background = null; // transparent canvas to blend with page cream background

    const width = container.clientWidth;
    const height = container.clientHeight;

    // Camera setup: Starts at Front + Angled viewpoint
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    const initialCamPos = { x: 2.2, y: 4.2, z: 10.5 };
    camera.position.set(initialCamPos.x, initialCamPos.y, initialCamPos.z);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // 2. Lighting (Warm Editorial Scrapbook Studio Lighting)
    const ambientLight = new THREE.AmbientLight(0xfff5ea, 1.2);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffeedd, 2.0);
    keyLight.position.set(8, 14, 10);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 2048;
    keyLight.shadow.mapSize.height = 2048;
    keyLight.shadow.bias = -0.0001;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xc96f82, 0.8);
    fillLight.position.set(-8, 6, -6);
    scene.add(fillLight);

    // 3. The 3D Box Container (5 walls: Floor + Back + Left + Right + Front)
    const boxGroup = new THREE.Group();
    scene.add(boxGroup);

    const boxWidth = 7.6;
    const boxDepth = 5.8;
    const boxHeight = 2.2;
    const wallThickness = 0.25;

    // Box Materials
    const boxMaterial = new THREE.MeshStandardMaterial({
      color: 0x331f24,
      roughness: 0.5,
      metalness: 0.1,
    });
    const rimMaterial = new THREE.MeshStandardMaterial({
      color: 0x822744,
      roughness: 0.3,
      metalness: 0.4,
    });

    // Floor of box
    const floorGeo = new THREE.BoxGeometry(boxWidth, wallThickness, boxDepth);
    const floorMesh = new THREE.Mesh(floorGeo, boxMaterial);
    floorMesh.position.y = -wallThickness / 2;
    floorMesh.receiveShadow = true;
    boxGroup.add(floorMesh);

    // Back Wall
    const backGeo = new THREE.BoxGeometry(boxWidth, boxHeight, wallThickness);
    const backMesh = new THREE.Mesh(backGeo, boxMaterial);
    backMesh.position.set(0, boxHeight / 2, -boxDepth / 2 + wallThickness / 2);
    backMesh.castShadow = true;
    backMesh.receiveShadow = true;
    boxGroup.add(backMesh);

    // Left Wall
    const leftGeo = new THREE.BoxGeometry(wallThickness, boxHeight, boxDepth);
    const leftMesh = new THREE.Mesh(leftGeo, boxMaterial);
    leftMesh.position.set(-boxWidth / 2 + wallThickness / 2, boxHeight / 2, 0);
    leftMesh.castShadow = true;
    leftMesh.receiveShadow = true;
    boxGroup.add(leftMesh);

    // Right Wall
    const rightGeo = new THREE.BoxGeometry(wallThickness, boxHeight, boxDepth);
    const rightMesh = new THREE.Mesh(rightGeo, boxMaterial);
    rightMesh.position.set(boxWidth / 2 - wallThickness / 2, boxHeight / 2, 0);
    rightMesh.castShadow = true;
    rightMesh.receiveShadow = true;
    boxGroup.add(rightMesh);

    // Front Wall (Slightly lowered so objects are partially visible from front angle)
    const frontWallHeight = 1.4;
    const frontGeo = new THREE.BoxGeometry(boxWidth, frontWallHeight, wallThickness);
    const frontMesh = new THREE.Mesh(frontGeo, boxMaterial);
    frontMesh.position.set(0, frontWallHeight / 2, boxDepth / 2 - wallThickness / 2);
    frontMesh.castShadow = true;
    frontMesh.receiveShadow = true;
    boxGroup.add(frontMesh);

    // Box Rim Gold Trim Accent
    const rimGeo = new THREE.BoxGeometry(boxWidth + 0.1, 0.08, wallThickness * 1.2);
    const frontRim = new THREE.Mesh(rimGeo, rimMaterial);
    frontRim.position.set(0, frontWallHeight + 0.04, boxDepth / 2 - wallThickness / 2);
    boxGroup.add(frontRim);

    // 4. Tech Cubes Inside the Box
    const cubeMeshes: THREE.Mesh[] = [];
    const cubeGeo = new THREE.BoxGeometry(1.6, 1.4, 1.6);

    techList.forEach((tech, index) => {
      const texture = createCubeTexture(tech.name, tech.color, tech.textColor);
      const cubeMat = new THREE.MeshStandardMaterial({
        map: texture,
        roughness: 0.4,
        metalness: 0.1,
      });

      const cube = new THREE.Mesh(cubeGeo, cubeMat);
      cube.position.set(tech.pos[0], tech.pos[1], tech.pos[2]);
      cube.castShadow = true;
      cube.receiveShadow = true;
      cube.userData = { tech, index };

      boxGroup.add(cube);
      cubeMeshes.push(cube);
    });

    // 5. Ground Drop Shadow Plane under the whole box
    const shadowPlaneGeo = new THREE.PlaneGeometry(16, 14);
    const shadowPlaneMat = new THREE.ShadowMaterial({ opacity: 0.3 });
    const shadowPlane = new THREE.Mesh(shadowPlaneGeo, shadowPlaneMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -wallThickness - 0.01;
    shadowPlane.receiveShadow = true;
    scene.add(shadowPlane);

    // 6. SCROLL-DRIVEN CONTINUOUS CAMERA ROTATION
    // Front + Angled (start) -> progressively higher (~45°) -> TOP-DOWN (end)
    const camTimeline = {
      progress: 0,
      x: initialCamPos.x,
      y: initialCamPos.y,
      z: initialCamPos.z,
    };

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=1800",
        pin: true,
        scrub: 1,
        onUpdate: (self) => {
          const p = self.progress;
          setScrollPercent(Math.round(p * 100));

          // Continuous camera orbit:
          // x: 2.2 -> 0
          // y: 4.2 -> 11.5
          // z: 10.5 -> 0.1 (directly above!)
          const targetX = gsap.utils.interpolate(2.2, 0, p);
          const targetY = gsap.utils.interpolate(4.2, 11.5, p);
          const targetZ = gsap.utils.interpolate(10.5, 0.1, p);

          camera.position.set(targetX, targetY, targetZ);
          camera.lookAt(0, 0.2, 0);

          // Update stage label
          if (p < 0.25) {
            setCameraStage("Front & Angled View (Peeking inside)");
          } else if (p < 0.65) {
            setCameraStage("Ascending Camera (~45° Angle)");
          } else {
            setCameraStage("Top-Down View (Full Tech Stack Revealed)");
          }
        },
      });
    }, sectionRef);

    // 7. Raycasting / Interactive Hover
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handleMouseMove = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(cubeMeshes);

      if (intersects.length > 0) {
        const hit = intersects[0].object as THREE.Mesh;
        renderer.domElement.style.cursor = "pointer";
        cubeMeshes.forEach((c) => {
          if (c === hit) {
            gsap.to(c.position, { y: 1.1, duration: 0.3, ease: "power2.out" });
          } else {
            gsap.to(c.position, { y: 0.6, duration: 0.3, ease: "power2.out" });
          }
        });
      } else {
        renderer.domElement.style.cursor = "default";
        cubeMeshes.forEach((c) => {
          gsap.to(c.position, { y: 0.6, duration: 0.3, ease: "power2.out" });
        });
      }
    };

    const handleClick = () => {
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(cubeMeshes);
      if (intersects.length > 0) {
        const hit = intersects[0].object as THREE.Mesh;
        setSelectedTech(hit.userData.tech);
      }
    };

    renderer.domElement.addEventListener("mousemove", handleMouseMove);
    renderer.domElement.addEventListener("click", handleClick);

    // 8. Animation Render Loop
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
      renderer.domElement.removeEventListener("mousemove", handleMouseMove);
      renderer.domElement.removeEventListener("click", handleClick);
      ctx.revert();
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="tech-stack"
      className="relative w-full h-screen bg-cream overflow-hidden flex flex-col justify-between border-b border-blush select-none"
    >
      {/* Background Scrapbook Watermark */}
      <div className="absolute top-8 left-8 text-xs font-mono uppercase tracking-widest text-burgundy z-20 flex items-center space-x-2">
        <Box className="w-4 h-4 text-dustyRose" />
        <span>SEC. 07 &bull; 3D TECH STACK BOX</span>
      </div>

      {/* Top Header Information Overlay */}
      <div className="relative z-20 max-w-5xl mx-auto w-full px-6 pt-12 text-center pointer-events-none">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blush border border-dustyRose/40 text-burgundy text-xs font-mono uppercase tracking-widest mb-2 shadow-xs">
          <Eye className="w-3.5 h-3.5 text-dustyRose" />
          <span>Scroll-Driven Camera Orbit</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-serif text-espresso font-bold">
          The 3D Technology Box
        </h2>
        <p className="text-xs sm:text-sm font-serif italic text-mauve-dark mt-1">
          Scroll down to continuously orbit the camera from the front-angled view to the full top-down reveal.
        </p>

        {/* Live Camera Progress Badge */}
        <div className="mt-3 inline-flex items-center space-x-3 px-4 py-1.5 rounded-full bg-white/80 border border-dustyRose/30 shadow-xs text-xs font-mono">
          <span className="text-burgundy font-bold">{cameraStage}</span>
          <span className="text-mauve">&bull;</span>
          <span className="text-dustyRose font-semibold">{scrollPercent}% Rotated</span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* THREE.JS 3D CANVAS CONTAINER                                              */}
      {/* ========================================================================= */}
      <div
        ref={canvasContainerRef}
        className="relative flex-1 w-full h-full cursor-grab active:cursor-grabbing z-10"
      />

      {/* Bottom Technology Quick Reference Pill Bar */}
      <div className="relative z-20 max-w-5xl mx-auto w-full px-6 pb-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-mauve border-t border-blush/60 pt-3">
        <span className="flex items-center space-x-1.5 text-dustyRose">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Hover cubes in 3D to elevate &bull; Click to inspect tech</span>
        </span>

        <div className="flex flex-wrap items-center justify-center gap-2">
          {techList.map((t, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedTech(t)}
              className="px-2.5 py-1 rounded bg-[#FFFDF9] hover:bg-blush border border-blush text-espresso hover:text-burgundy transition-all text-[11px] font-semibold"
            >
              {t.name}
            </button>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* TECH INSPECT MODAL                                                        */}
      {/* ========================================================================= */}
      {selectedTech && (
        <div
          onClick={() => setSelectedTech(null)}
          className="fixed inset-0 z-50 bg-espresso/80 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[#FFFDF9] p-6 sm:p-8 rounded-2xl shadow-2xl max-w-md w-full border-4 border-burgundy relative animate-in zoom-in-95 duration-200"
          >
            <div className="flex items-center justify-between pb-3 border-b border-blush">
              <span className="text-xs font-mono uppercase tracking-widest text-dustyRose font-bold">
                {selectedTech.category}
              </span>
              <button
                onClick={() => setSelectedTech(null)}
                className="w-7 h-7 rounded-full bg-blush text-burgundy flex items-center justify-center hover:bg-dustyRose hover:text-white"
              >
                &times;
              </button>
            </div>

            <div className="my-4">
              <h3
                className="text-3xl font-serif font-black"
                style={{ color: selectedTech.color }}
              >
                {selectedTech.name}
              </h3>
              <p className="text-sm font-sans text-espresso/85 mt-2 leading-relaxed">
                {selectedTech.desc}
              </p>
            </div>

            <div className="pt-4 border-t border-blush flex items-center justify-between text-xs font-mono">
              <span className="text-mauve">Container: 3D Box Item</span>
              <span className="px-2.5 py-1 rounded bg-blush text-burgundy font-bold">
                Core Competency
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
