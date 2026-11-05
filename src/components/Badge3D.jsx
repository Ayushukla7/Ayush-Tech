import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { playTacticalClick } from '../utils/audio';
import { personalInfo } from '../data/portfolioData';
import { RotateCw, Sparkles, ShieldCheck } from 'lucide-react';

export default function Badge3D({ onBadgeClick }) {
  const mountRef = useRef(null);
  const isDraggingRef = useRef(false);
  const prevMouseRef = useRef({ x: 0, y: 0 });
  const rotTargetRef = useRef({ x: 0, y: 0 });
  const currentRotRef = useRef({ x: 0, y: 0 });
  const isFlippedRef = useRef(false);
  const [isFlipped, setIsFlipped] = useState(false);

  // Helper to draw Front Card Canvas Texture
  const createFrontTexture = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1536;
    const ctx = canvas.getContext('2d');

    // Card background - sleek dark metallic gradient
    const bgGrad = ctx.createLinearGradient(0, 0, 1024, 1536);
    bgGrad.addColorStop(0, '#131418');
    bgGrad.addColorStop(0.5, '#0e0f12');
    bgGrad.addColorStop(1, '#08080a');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 1024, 1536);

    // Subtle micro grid pattern
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
    ctx.lineWidth = 2;
    for (let x = 0; x < 1024; x += 64) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 1536);
      ctx.stroke();
    }
    for (let y = 0; y < 1536; y += 64) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(1024, y);
      ctx.stroke();
    }

    // Top Brand Text
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 84px "Orbitron", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('AYUSH SHUKLA', 512, 170);

    ctx.fillStyle = '#38bdf8';
    ctx.font = '600 32px "JetBrains Mono", monospace';
    ctx.letterSpacing = '6px';
    ctx.fillText('FULL-STACK ENGINEER', 512, 230);

    // Profile Photo Box
    const photoY = 300;
    const photoH = 720;
    const photoW = 760;
    const photoX = (1024 - photoW) / 2;

    // Outer photo frame
    ctx.fillStyle = '#1c1d24';
    ctx.fillRect(photoX, photoY, photoW, photoH);

    // Photo inner background gradient
    const pGrad = ctx.createLinearGradient(photoX, photoY, photoX + photoW, photoY + photoH);
    pGrad.addColorStop(0, '#272935');
    pGrad.addColorStop(0.5, '#1e202a');
    pGrad.addColorStop(1, '#111218');
    ctx.fillStyle = pGrad;
    ctx.fillRect(photoX + 8, photoY + 8, photoW - 16, photoH - 16);

    // Stylized Silhouette / Developer Avatar
    ctx.fillStyle = '#38bdf8';
    ctx.beginPath();
    ctx.arc(512, 590, 150, 0, Math.PI * 2);
    ctx.fill();

    // Body curve
    ctx.beginPath();
    ctx.ellipse(512, 880, 260, 200, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#0f172a';
    ctx.fill();

    // Stylish Cap / Head overlay
    ctx.fillStyle = '#090d16';
    ctx.beginPath();
    ctx.arc(512, 530, 130, Math.PI, 0);
    ctx.fill();
    // Cap visor
    ctx.fillRect(400, 520, 240, 25);

    // Monogram text in avatar
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 80px "Orbitron", sans-serif';
    ctx.fillText('AS', 512, 630);

    // Smart chip graphic on the left
    const chipX = photoX + 40;
    const chipY = photoY + photoH - 140;
    ctx.fillStyle = '#eab308';
    ctx.fillRect(chipX, chipY, 110, 85);
    ctx.strokeStyle = '#ca8a04';
    ctx.lineWidth = 4;
    ctx.strokeRect(chipX, chipY, 110, 85);
    // Chip contact lines
    ctx.beginPath();
    ctx.moveTo(chipX + 36, chipY);
    ctx.lineTo(chipX + 36, chipY + 85);
    ctx.moveTo(chipX + 74, chipY);
    ctx.lineTo(chipX + 74, chipY + 85);
    ctx.moveTo(chipX, chipY + 42);
    ctx.lineTo(chipX + 110, chipY + 42);
    ctx.stroke();

    // Verification Seal on the right
    ctx.fillStyle = 'rgba(56, 189, 248, 0.15)';
    ctx.beginPath();
    ctx.arc(photoX + photoW - 90, photoY + photoH - 95, 55, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 4;
    ctx.stroke();
    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 22px "JetBrains Mono", monospace';
    ctx.fillText('PASS', photoX + photoW - 90, photoY + photoH - 95);

    // Bottom Details Section
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 44px "Space Grotesk", sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('ABES Engineering College', 130, 1120);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '500 32px "JetBrains Mono", monospace';
    ctx.fillText('B.Tech CSE • CGPA: 8.00 / 10', 130, 1180);
    ctx.fillText('ID: AS-2026-DEV // COHORT 2024-28', 130, 1235);

    // Bottom Status Pill
    ctx.fillStyle = 'rgba(16, 185, 129, 0.15)';
    ctx.fillRect(130, 1310, 764, 90);
    ctx.strokeStyle = 'rgba(16, 185, 129, 0.4)';
    ctx.lineWidth = 3;
    ctx.strokeRect(130, 1310, 764, 90);

    // Glowing green status dot
    ctx.fillStyle = '#10b981';
    ctx.beginPath();
    ctx.arc(180, 1355, 14, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#34d399';
    ctx.font = 'bold 30px "JetBrains Mono", monospace';
    ctx.fillText('STATUS: OPEN FOR WORK & INTERNSHIPS', 220, 1365);

    // Outer subtle border glow
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
    ctx.lineWidth = 12;
    ctx.strokeRect(6, 6, 1012, 1524);

    return new THREE.CanvasTexture(canvas);
  };

  // Helper to draw Back Card Canvas Texture
  const createBackTexture = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1536;
    const ctx = canvas.getContext('2d');

    // Background
    ctx.fillStyle = '#0d0e12';
    ctx.fillRect(0, 0, 1024, 1536);

    // Top Magnetic Stripe
    ctx.fillStyle = '#181920';
    ctx.fillRect(0, 120, 1024, 160);

    // Signature Panel
    ctx.fillStyle = '#e2e8f0';
    ctx.fillRect(100, 360, 824, 120);
    ctx.fillStyle = '#0f172a';
    ctx.font = 'italic 50px serif';
    ctx.fillText('Ayush Shukla', 140, 440);

    // Verified Credentials Grid
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 44px "Orbitron", sans-serif';
    ctx.fillText('VERIFIED CREDENTIALS', 100, 560);

    const stats = [
      '• National Hackathon 2nd Runner Up (Rank 3/120+)',
      '• 1st Prize in Healthcare Innovation (VacciTrack)',
      '• 250+ Algorithmic Problems Solved in Java/C++',
      '• HackerRank 3-Star Problem Solving in C',
      '• Capgemini Student Ambassador & Community Lead'
    ];

    ctx.fillStyle = '#94a3b8';
    ctx.font = '400 32px "Space Grotesk", sans-serif';
    stats.forEach((text, i) => {
      ctx.fillText(text, 100, 650 + i * 70);
    });

    // Barcode area
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(100, 1060, 824, 160);
    ctx.fillStyle = '#000000';
    ctx.font = '60px "Libre Barcode 39", monospace, sans-serif';
    // Draw simulated barcode lines
    for (let x = 140; x < 880; x += Math.random() * 12 + 6) {
      const w = Math.random() > 0.5 ? 4 : 8;
      ctx.fillRect(x, 1080, w, 100);
    }
    ctx.font = '30px "JetBrains Mono", monospace';
    ctx.textAlign = 'center';
    ctx.fillText('* AS-9369-2026-DEV *', 512, 1210);

    // Contact info
    ctx.fillStyle = '#64748b';
    ctx.font = '28px "JetBrains Mono", monospace';
    ctx.textAlign = 'center';
    ctx.fillText('ayush.apply41@gmail.com • +91-9369657005', 512, 1320);
    ctx.fillText('github.com/Ayushukla7 • linkedin.com/in/ayushstech', 512, 1370);

    // Border
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
    ctx.lineWidth = 12;
    ctx.strokeRect(6, 6, 1012, 1524);

    return new THREE.CanvasTexture(canvas);
  };

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 400;
    const height = container.clientHeight || 560;

    // SCENE & CAMERA
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 11.2);

    // RENDERER
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // LIGHTING
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0x38bdf8, 2.5);
    keyLight.position.set(5, 8, 8);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xe0e7ff, 2.0);
    rimLight.position.set(-6, -4, 6);
    scene.add(rimLight);

    // BADGE GROUP (Includes card, sleeve, clip)
    const badgeGroup = new THREE.Group();
    scene.add(badgeGroup);

    // 1. Printed ID Card inside
    const cardW = 3.6;
    const cardH = 5.4;
    const cardD = 0.04;
    const cardGeo = new THREE.BoxGeometry(cardW, cardH, cardD);

    const frontTex = createFrontTexture();
    const backTex = createBackTexture();

    const edgeMat = new THREE.MeshStandardMaterial({ color: 0x1f2430, roughness: 0.5 });
    const cardMats = [
      edgeMat, // right
      edgeMat, // left
      edgeMat, // top
      edgeMat, // bottom
      new THREE.MeshStandardMaterial({ map: frontTex, roughness: 0.4, metalness: 0.1 }), // front
      new THREE.MeshStandardMaterial({ map: backTex, roughness: 0.4, metalness: 0.1 })   // back
    ];

    const cardMesh = new THREE.Mesh(cardGeo, cardMats);
    badgeGroup.add(cardMesh);

    // 2. Transparent Plastic Protective Pouch / Holder Sleeve
    const sleeveW = cardW + 0.32;
    const sleeveH = cardH + 0.45;
    const sleeveD = cardD + 0.08;
    const sleeveGeo = new THREE.BoxGeometry(sleeveW, sleeveH, sleeveD);
    const sleeveMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.22,
      roughness: 0.08,
      metalness: 0.05,
      transmission: 0.85,
      ior: 1.45,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1
    });
    const sleeveMesh = new THREE.Mesh(sleeveGeo, sleeveMat);
    badgeGroup.add(sleeveMesh);

    // 3. Top Clip & Loop
    // Transparent loop tab at the top
    const tabGeo = new THREE.BoxGeometry(1.2, 0.6, 0.1);
    const tabMesh = new THREE.Mesh(tabGeo, sleeveMat);
    tabMesh.position.set(0, sleeveH / 2 + 0.25, 0);
    badgeGroup.add(tabMesh);

    // Slot hole in tab
    const slotGeo = new THREE.BoxGeometry(0.65, 0.16, 0.14);
    const slotMat = new THREE.MeshBasicMaterial({ color: 0x050508 });
    const slotMesh = new THREE.Mesh(slotGeo, slotMat);
    slotMesh.position.set(0, sleeveH / 2 + 0.25, 0);
    badgeGroup.add(slotMesh);

    // Metal lanyard buckle clip
    const clipGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.65, 16);
    const clipMat = new THREE.MeshStandardMaterial({ color: 0x64748b, metalness: 0.85, roughness: 0.25 });
    const clipMesh = new THREE.Mesh(clipGeo, clipMat);
    clipMesh.rotation.z = Math.PI / 2;
    clipMesh.position.set(0, sleeveH / 2 + 0.55, 0);
    badgeGroup.add(clipMesh);

    // Initial slight natural hanging tilt
    rotTargetRef.current = { x: -0.05, y: -0.08 };

    // POINTER INTERACTIONS (Tilt on mouse move, drag to rotate, click to flip)
    const handlePointerDown = (e) => {
      isDraggingRef.current = true;
      prevMouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handlePointerMove = (e) => {
      const rect = container.getBoundingClientRect();
      const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const normY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      if (isDraggingRef.current) {
        const deltaX = e.clientX - prevMouseRef.current.x;
        const deltaY = e.clientY - prevMouseRef.current.y;

        rotTargetRef.current.y += deltaX * 0.015;
        rotTargetRef.current.x = Math.max(-0.6, Math.min(0.6, rotTargetRef.current.x - deltaY * 0.015));

        prevMouseRef.current = { x: e.clientX, y: e.clientY };
      } else {
        // Natural magnetic tilt following pointer
        const baseFlipY = isFlippedRef.current ? Math.PI : 0;
        rotTargetRef.current.y = baseFlipY + normX * 0.45;
        rotTargetRef.current.x = -normY * 0.35;
      }
    };

    const handlePointerUp = () => {
      isDraggingRef.current = false;
    };

    const handleContainerClick = (e) => {
      // Toggle flip on click
      isFlippedRef.current = !isFlippedRef.current;
      setIsFlipped(isFlippedRef.current);
      playTacticalClick();
      rotTargetRef.current.y = isFlippedRef.current ? Math.PI : 0;
    };

    const dom = renderer.domElement;
    dom.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    dom.addEventListener('click', handleContainerClick);

    // RESIZE
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth || 400;
      const h = container.clientHeight || 560;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // ANIMATION LOOP
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      // Smooth inertia lerp towards target rotation
      currentRotRef.current.x += (rotTargetRef.current.x - currentRotRef.current.x) * 0.07;
      currentRotRef.current.y += (rotTargetRef.current.y - currentRotRef.current.y) * 0.07;

      badgeGroup.rotation.x = currentRotRef.current.x;
      badgeGroup.rotation.y = currentRotRef.current.y;

      // Gentle breathing float
      badgeGroup.position.y = Math.sin(time * 1.5) * 0.08;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      dom.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      dom.removeEventListener('click', handleContainerClick);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      cardGeo.dispose();
      sleeveGeo.dispose();
    };
  }, []);

  const flipBadge = (e) => {
    e.stopPropagation();
    playTacticalClick();
    isFlippedRef.current = !isFlippedRef.current;
    setIsFlipped(isFlippedRef.current);
    rotTargetRef.current.y = isFlippedRef.current ? Math.PI : 0;
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center select-none group">
      
      {/* 3D WebGL Canvas */}
      <div 
        ref={mountRef} 
        className="w-full h-[460px] sm:h-[520px] md:h-[560px] cursor-grab active:cursor-grabbing flex items-center justify-center" 
      />

      {/* Caption & Controls under the Badge (identical to video screenshot!) */}
      <div className="mt-2 flex flex-col items-center space-y-1.5 z-10">
        <div className="flex items-center space-x-2">
          <span className="font-orbitron font-bold text-sm sm:text-base text-slate-100">
            Digital Pass
          </span>
          <button
            onClick={flipBadge}
            className="p-1 rounded-md bg-white/5 hover:bg-white/10 text-cyan-400 hover:text-cyan-300 border border-white/10 transition-colors"
            title="Flip Badge to inspect credentials & barcode"
          >
            <RotateCw className="w-3.5 h-3.5" />
          </button>
        </div>
        <p className="text-[11px] font-mono text-slate-400">
          {isFlipped ? 'Back: Verified Credentials & Barcode' : 'Front: Identity & Status • Drag or click to flip'}
        </p>
      </div>

    </div>
  );
}
