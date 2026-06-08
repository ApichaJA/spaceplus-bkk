"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import type { GLTFLoader as GLTFLoaderType } from "three/examples/jsm/loaders/GLTFLoader.js";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrambleText from "./ScrambleText";

/* ─────────────────────────────────────────────
   When you have your stage GLTF, drop the file
   at /public/models/stage.glb and set MODEL_PATH.
───────────────────────────────────────────── */
const MODEL_PATH = ""; // e.g. "/models/stage.glb"

export default function StageViewer() {
  const mountRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const container = mountRef.current;
    if (!container) return;

    /* ── Renderer ── */
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.9;
    container.appendChild(renderer.domElement);

    const setSize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };

    /* ── Camera ── */
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 150);
    camera.position.set(0, 5, 18);

    /* ── Scene ── */
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0c0c0c);
    scene.fog = new THREE.FogExp2(0x0c0c0c, 0.028);

    /* ── Lights ── */
    scene.add(new THREE.AmbientLight(0xffffff, 0.12));

    const makePt = (
      color: number,
      intensity: number,
      x: number,
      y: number,
      z: number,
    ) => {
      const l = new THREE.PointLight(color, intensity, 30);
      l.position.set(x, y, z);
      l.castShadow = true;
      scene.add(l);
      return l;
    };
    const purpleLight = makePt(0x8b5cf6, 4, 0, 12, 0);
    const blueLight = makePt(0x3b82f6, 2.5, -8, 10, -4);
    const warmLight = makePt(0xff6622, 2, 8, 10, -4);

    /* ── Floor ── */
    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(40, 40),
      new THREE.MeshStandardMaterial({
        color: 0x080808,
        roughness: 0.95,
        metalness: 0.05,
      }),
    );
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    scene.add(floor);

    /* ── Grid ── */
    scene.add(new THREE.GridHelper(40, 40, 0x1e1e1e, 0x141414));

    /* ── Stage platform ── */
    const stageMat = new THREE.MeshStandardMaterial({
      color: 0x111111,
      roughness: 0.75,
    });
    const stagePlatform = new THREE.Mesh(
      new THREE.BoxGeometry(14, 0.35, 7),
      stageMat,
    );
    stagePlatform.position.set(0, 0.175, -4);
    stagePlatform.castShadow = true;
    stagePlatform.receiveShadow = true;
    scene.add(stagePlatform);

    /* ── Truss structure ── */
    const trussMat = new THREE.MeshStandardMaterial({
      color: 0x2a2a2a,
      metalness: 0.85,
      roughness: 0.2,
    });

    const addCyl = (
      r: number,
      h: number,
      x: number,
      y: number,
      z: number,
      rotZ = 0,
    ) => {
      const m = new THREE.Mesh(
        new THREE.CylinderGeometry(r, r, h, 8),
        trussMat,
      );
      m.position.set(x, y, z);
      m.rotation.z = rotZ;
      m.castShadow = true;
      scene.add(m);
      return m;
    };

    // Vertical supports
    [
      [-6, -7],
      [6, -7],
      [-6, -1],
      [6, -1],
    ].forEach(([x, z]) => {
      addCyl(0.07, 13, x, 6.5, z);
    });
    // Horizontal cross-bars (top rig)
    addCyl(0.07, 14, 0, 13, -7, Math.PI / 2);
    addCyl(0.07, 14, 0, 13, -1, Math.PI / 2);
    // Side struts
    addCyl(0.05, 7, -6, 13, -4, 0);
    addCyl(0.05, 7, 6, 13, -4, 0);

    /* ── PAR can light heads ── */
    const headMat = new THREE.MeshStandardMaterial({
      color: 0x444444,
      metalness: 0.9,
      roughness: 0.1,
    });
    const beamPositions = [-5, -2.5, 0, 2.5, 5];
    const beams: THREE.Mesh[] = [];

    beamPositions.forEach((x) => {
      // Head fixture
      const head = new THREE.Mesh(
        new THREE.CylinderGeometry(0.18, 0.14, 0.5, 10),
        headMat,
      );
      head.position.set(x, 12.75, -7);
      scene.add(head);

      // Light beam cone
      const beamGeo = new THREE.ConeGeometry(1.1, 11, 12, 1, true);
      const beamMat = new THREE.MeshBasicMaterial({
        color: 0x8b5cf6,
        transparent: true,
        opacity: 0.06,
        side: THREE.DoubleSide,
      });
      const beam = new THREE.Mesh(beamGeo, beamMat);
      beam.position.set(x, 7, -7);
      beam.rotation.x = Math.PI; // flip — point down
      beams.push(beam);
      scene.add(beam);
    });

    /* ── Load GLTF model (when provided) ── */
    if (MODEL_PATH) {
      import("three/examples/jsm/loaders/GLTFLoader.js").then(
        ({ GLTFLoader }) => {
          const loader: GLTFLoaderType = new GLTFLoader();
          loader.load(MODEL_PATH, (gltf) => {
            gltf.scene.traverse((child) => {
              if ((child as THREE.Mesh).isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
              }
            });
            scene.add(gltf.scene);
          });
        },
      );
    }

    /* ── Interaction (drag to rotate) ── */
    let targetAngle = 0;
    let currentAngle = 0;
    let isDragging = false;
    let lastX = 0;

    const onDown = (e: MouseEvent) => {
      isDragging = true;
      lastX = e.clientX;
    };
    const onUp = () => {
      isDragging = false;
    };
    const onMove = (e: MouseEvent) => {
      if (!isDragging) return;
      targetAngle += (e.clientX - lastX) * 0.006;
      lastX = e.clientX;
    };
    container.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("mousemove", onMove);

    /* ── Animation loop ── */
    let raf: number;
    let t = 0;

    const animate = () => {
      raf = requestAnimationFrame(animate);
      t += 0.012;

      // Auto-rotate when idle
      if (!isDragging) targetAngle += 0.004;
      currentAngle += (targetAngle - currentAngle) * 0.045;

      camera.position.x = Math.sin(currentAngle) * 18;
      camera.position.z = Math.cos(currentAngle) * 18;
      camera.lookAt(0, 3, -3);

      // Animated beams + lights
      beams.forEach((b, i) => {
        const mat = b.material as THREE.MeshBasicMaterial;
        mat.opacity = 0.04 + 0.055 * Math.abs(Math.sin(t * 1.2 + i * 1.1));
        mat.color.setHSL(0.75 + 0.05 * Math.sin(t * 0.3 + i), 0.9, 0.6);
      });

      purpleLight.intensity = 3.5 + 2 * Math.abs(Math.sin(t * 0.7));
      blueLight.intensity = 1.8 + 1.2 * Math.abs(Math.sin(t * 0.9 + 1));
      warmLight.intensity = 1.5 + 1 * Math.abs(Math.sin(t * 0.6 + 2));

      renderer.render(scene, camera);
    };
    animate();

    /* ── Resize ── */
    setSize();
    window.addEventListener("resize", setSize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", setSize);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("mousemove", onMove);
      container.removeEventListener("mousedown", onDown);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#0c0c0c] pt-32 md:pt-44">
      {/* Header */}
      <div className="stage-heading flex items-end justify-between px-8 md:px-10 mb-10">
        <div>
          <p className="text-[9px] tracking-[0.38em] text-foreground/30 uppercase mb-4">
            Interactive · 3D
          </p>
          <div>
            <h2
              className="stage-title font-display leading-none text-foreground"
              style={{ fontSize: "clamp(48px, 9vw, 140px)" }}
            >
              <ScrambleText text="THE SPACE" delay={0} speed={32} />
            </h2>
          </div>
        </div>
        <p className="hidden md:block text-[10px] tracking-[0.28em] text-foreground/28 uppercase pb-3">
          Drag to explore
        </p>
      </div>

      {/* Three.js canvas */}
      <div
        ref={mountRef}
        className="w-full cursor-grab active:cursor-grabbing select-none"
        style={{ height: "clamp(380px, 60vh, 680px)" }}
      />

      <div className="h-px bg-foreground/8 mx-8" />
    </section>
  );
}
