import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { playTacticalClick, playSonarPing, playDiveWhoosh } from '../utils/audio';
import { personalInfo } from '../data/portfolioData';
import { Compass, Orbit, Navigation, FastForward } from 'lucide-react';

export default function EarthCanvas({
  introCompleted,
  onIntroComplete,
  isInOrbitMode,
  onToggleOrbitMode
}) {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const earthGroupRef = useRef(null);
  const earthMeshRef = useRef(null);
  const cloudMeshRef = useRef(null);
  const targetBeaconRef = useRef(null);
  const timelineRef = useRef(null);

  // Telemetry HUD state
  const [telemetryText, setTelemetryText] = useState('GEOSTATIONARY ORBIT // ALTITUDE: 35,786 KM');
  const [telemetryStatus, setTelemetryStatus] = useState('SCANNING SECTOR');
  const [currentAltitude, setCurrentAltitude] = useState(35786);
  const [showSkipBtn, setShowSkipBtn] = useState(!introCompleted);

  // Mouse drag interaction
  const isDraggingRef = useRef(false);
  const prevMouseRef = useRef({ x: 0, y: 0 });

  // Convert Geographical Lat / Lon to 3D Sphere Position
  const latLonToVector3 = (lat, lon, radius) => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);
    return new THREE.Vector3(
      -(radius * Math.sin(phi) * Math.cos(theta)),
      radius * Math.cos(phi),
      radius * Math.sin(phi) * Math.sin(theta)
    );
  };

  // Create High-Fidelity Realistic Earth Texture (Day continents, Indian subcontinent, oceans, night lights)
  const createEarthTextures = () => {
    // 1. Day Map Canvas
    const canvas = document.createElement('canvas');
    canvas.width = 2048;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');

    // Deep ocean base
    const oceanGrad = ctx.createLinearGradient(0, 0, 0, 1024);
    oceanGrad.addColorStop(0, '#021526');
    oceanGrad.addColorStop(0.5, '#03254c');
    oceanGrad.addColorStop(1, '#021526');
    ctx.fillStyle = oceanGrad;
    ctx.fillRect(0, 0, 2048, 1024);

    // Subtle ocean currents & bathymetry
    for (let i = 0; i < 40; i++) {
      ctx.fillStyle = 'rgba(6, 182, 212, 0.05)';
      ctx.beginPath();
      ctx.arc(Math.random() * 2048, Math.random() * 1024, Math.random() * 180 + 50, 0, Math.PI * 2);
      ctx.fill();
    }

    // CONTINENTS (Accurate placement: Indian Subcontinent at lon ~70-90°E, lat ~10-35°N)
    ctx.fillStyle = '#166534'; // Lush continental base

    // helper to map lon/lat to canvas coordinates
    const toXY = (lon, lat) => ({
      x: ((lon + 180) / 360) * 2048,
      y: ((90 - lat) / 180) * 1024
    });

    // Draw Indian Subcontinent prominently
    ctx.beginPath();
    const indPts = [
      toXY(68, 24),  // Gujarat coast
      toXY(72, 21),  // Gulf of Khambhat
      toXY(73, 16),  // Konkan coast / Mumbai
      toXY(75, 12),  // Malabar coast
      toXY(77.5, 8), // Kanyakumari (Southern tip)
      toXY(79.5, 10),// Coromandel coast
      toXY(80.5, 16),// Andhra coast
      toXY(86, 20),  // Odisha coast
      toXY(89, 22),  // Bengal delta
      toXY(92, 26),  // Northeast / Assam
      toXY(88, 28),  // Himalayas
      toXY(80, 31),  // Uttarakhand
      toXY(74, 34),  // Kashmir / Ladakh
      toXY(71, 30),  // Punjab / Rajasthan border
      toXY(68, 24)
    ];
    ctx.moveTo(indPts[0].x, indPts[0].y);
    for (let i = 1; i < indPts.length; i++) {
      ctx.lineTo(indPts[i].x, indPts[i].y);
    }
    ctx.closePath();
    ctx.fill();

    // Terrain shading for India & Himalayas (elevation)
    ctx.fillStyle = '#b45309'; // Mountain / plateau terrain
    ctx.beginPath();
    const himalayas = [toXY(74, 34), toXY(80, 31), toXY(88, 28), toXY(92, 26), toXY(90, 32), toXY(78, 36)];
    ctx.moveTo(himalayas[0].x, himalayas[0].y);
    himalayas.forEach(p => ctx.lineTo(p.x, p.y));
    ctx.closePath();
    ctx.fill();

    // Eurasian Landmass
    ctx.fillStyle = '#1e3a1e';
    ctx.fillRect(toXY(30, 70).x, toXY(30, 70).y, 800, 220); // Northern Eurasia

    // Africa
    ctx.beginPath();
    ctx.ellipse(toXY(20, 0).x, toXY(20, 0).y, 160, 260, 0, 0, Math.PI * 2);
    ctx.fill();

    // Americas
    ctx.beginPath();
    ctx.ellipse(toXY(-100, 45).x, toXY(-100, 45).y, 180, 160, 0, 0, Math.PI * 2); // North America
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(toXY(-60, -20).x, toXY(-60, -20).y, 140, 220, 0.2, 0, Math.PI * 2); // South America
    ctx.fill();

    // Australia & Southeast Asia
    ctx.beginPath();
    ctx.ellipse(toXY(135, -25).x, toXY(135, -25).y, 110, 80, 0, 0, Math.PI * 2);
    ctx.fill();

    // CITY NIGHT LIGHTS LAYER (Warm Golden & Cyan nodes across India, NCR, Lucknow, Mumbai, Bangalore)
    const nightCanvas = document.createElement('canvas');
    nightCanvas.width = 2048;
    nightCanvas.height = 1024;
    const nCtx = nightCanvas.getContext('2d');
    nCtx.fillStyle = '#000000';
    nCtx.fillRect(0, 0, 2048, 1024);

    const cityLights = [
      { lon: 77.2, lat: 28.6, intensity: 1.0, radius: 12 }, // Delhi-NCR / Ghaziabad
      { lon: 80.9, lat: 26.8, intensity: 0.9, radius: 9 },  // Lucknow
      { lon: 72.8, lat: 19.0, intensity: 1.0, radius: 11 }, // Mumbai
      { lon: 77.6, lat: 12.9, intensity: 0.95, radius: 10 },// Bengaluru
      { lon: 88.3, lat: 22.5, intensity: 0.85, radius: 9 }, // Kolkata
      { lon: 80.2, lat: 13.0, intensity: 0.85, radius: 8 }, // Chennai
      { lon: 78.4, lat: 17.3, intensity: 0.85, radius: 8 }, // Hyderabad
      { lon: 75.8, lat: 26.9, intensity: 0.7, radius: 6 },  // Jaipur
      { lon: 82.9, lat: 25.3, intensity: 0.7, radius: 6 },  // Varanasi
      // Global urban clusters
      { lon: 0.1, lat: 51.5, intensity: 0.8, radius: 8 },   // London
      { lon: 2.3, lat: 48.8, intensity: 0.75, radius: 7 },  // Paris
      { lon: -74.0, lat: 40.7, intensity: 0.9, radius: 9 }, // New York
      { lon: 139.6, lat: 35.6, intensity: 0.95, radius: 10 },// Tokyo
      { lon: 121.4, lat: 31.2, intensity: 0.9, radius: 9 }  // Shanghai
    ];

    cityLights.forEach(city => {
      const pos = toXY(city.lon, city.lat);
      const grad = nCtx.createRadialGradient(pos.x, pos.y, 1, pos.x, pos.y, city.radius * 2);
      grad.addColorStop(0, '#fef08a');
      grad.addColorStop(0.3, '#38bdf8');
      grad.addColorStop(1, 'transparent');
      nCtx.fillStyle = grad;
      nCtx.beginPath();
      nCtx.arc(pos.x, pos.y, city.radius * 2, 0, Math.PI * 2);
      nCtx.fill();
    });

    // CLOUD TEXTURE CANVAS
    const cloudCanvas = document.createElement('canvas');
    cloudCanvas.width = 1024;
    cloudCanvas.height = 512;
    const cCtx = cloudCanvas.getContext('2d');
    cCtx.fillStyle = 'transparent';
    cCtx.fillRect(0, 0, 1024, 512);

    for (let i = 0; i < 70; i++) {
      const x = Math.random() * 1024;
      const y = Math.random() * 512;
      const r = Math.random() * 80 + 20;
      const grad = cCtx.createRadialGradient(x, y, 0, x, y, r);
      grad.addColorStop(0, 'rgba(255, 255, 255, 0.45)');
      grad.addColorStop(0.6, 'rgba(255, 255, 255, 0.15)');
      grad.addColorStop(1, 'transparent');
      cCtx.fillStyle = grad;
      cCtx.beginPath();
      cCtx.arc(x, y, r, 0, Math.PI * 2);
      cCtx.fill();
    }

    return {
      dayTexture: new THREE.CanvasTexture(canvas),
      nightTexture: new THREE.CanvasTexture(nightCanvas),
      cloudTexture: new THREE.CanvasTexture(cloudCanvas)
    };
  };

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // SCENE & CAMERA
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    cameraRef.current = camera;

    // Initial outer space position
    camera.position.set(0, 14, 56);
    camera.lookAt(0, 0, 0);

    // RENDERER
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    rendererRef.current = renderer;
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // LIGHTING
    // Ambient cosmic illumination
    const ambientLight = new THREE.AmbientLight(0x0e2439, 1.4);
    scene.add(ambientLight);

    // Sun directional light shining on Earth from angle
    const sunLight = new THREE.DirectionalLight(0xffffff, 2.6);
    sunLight.position.set(45, 15, 35);
    scene.add(sunLight);

    // STARFIELD (Deep space galaxy)
    const starCount = 2800;
    const starGeo = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i++) {
      const radius = 160 + Math.random() * 200;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      starPositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      starPositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      starPositions[i * 3 + 2] = radius * Math.cos(phi);

      const isCyan = Math.random() > 0.7;
      starColors[i * 3] = isCyan ? 0.2 : 0.95;
      starColors[i * 3 + 1] = isCyan ? 0.9 : 0.95;
      starColors[i * 3 + 2] = 1.0;
    }

    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3));
    const starMat = new THREE.PointsMaterial({
      size: 1.1,
      vertexColors: true,
      transparent: true,
      opacity: 0.8
    });
    const starField = new THREE.Points(starGeo, starMat);
    scene.add(starField);

    // EARTH GROUP (Holds Earth, clouds, atmosphere, and beacons)
    const earthGroup = new THREE.Group();
    earthGroupRef.current = earthGroup;
    scene.add(earthGroup);

    const earthRadius = 10;
    const { dayTexture, nightTexture, cloudTexture } = createEarthTextures();

    // EARTH MESH
    const earthGeo = new THREE.SphereGeometry(earthRadius, 64, 64);
    const earthMat = new THREE.MeshStandardMaterial({
      map: dayTexture,
      emissiveMap: nightTexture,
      emissive: new THREE.Color(0x38bdf8),
      emissiveIntensity: 0.6,
      roughness: 0.65,
      metalness: 0.2
    });
    const earthMesh = new THREE.Mesh(earthGeo, earthMat);
    earthMeshRef.current = earthMesh;
    earthGroup.add(earthMesh);

    // ATMOSPHERIC CLOUD LAYER
    const cloudGeo = new THREE.SphereGeometry(earthRadius * 1.018, 48, 48);
    const cloudMat = new THREE.MeshStandardMaterial({
      map: cloudTexture,
      transparent: true,
      opacity: 0.4,
      roughness: 1
    });
    const cloudMesh = new THREE.Mesh(cloudGeo, cloudMat);
    cloudMeshRef.current = cloudMesh;
    earthGroup.add(cloudMesh);

    // ATMOSPHERIC FRESNEL GLOW HALO
    const atmosphereGeo = new THREE.SphereGeometry(earthRadius * 1.12, 32, 32);
    const atmosphereMat = new THREE.MeshBasicMaterial({
      color: 0x00f2fe,
      transparent: true,
      opacity: 0.15,
      side: THREE.BackSide
    });
    const atmosphere = new THREE.Mesh(atmosphereGeo, atmosphereMat);
    earthGroup.add(atmosphere);

    // TELEMETRY ORBITAL RINGS
    const ringGeo = new THREE.RingGeometry(earthRadius * 1.35, earthRadius * 1.36, 128);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x00f2fe,
      transparent: true,
      opacity: 0.18,
      side: THREE.DoubleSide
    });
    const orbitRing = new THREE.Mesh(ringGeo, ringMat);
    orbitRing.rotation.x = Math.PI / 2.3;
    orbitRing.rotation.y = Math.PI / 8;
    earthGroup.add(orbitRing);

    // SATELLITE BEACON ON ORBIT
    const satGeo = new THREE.BoxGeometry(0.35, 0.2, 0.6);
    const satMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    const satMesh = new THREE.Mesh(satGeo, satMat);
    satMesh.position.set(earthRadius * 1.35, 0, 0);
    orbitRing.add(satMesh);

    // TARGET DESTINATION: INDIA (NCR / LUCKNOW HUB: ~28.67°N, ~77.45°E)
    const targetPos = latLonToVector3(28.67, 77.45, earthRadius);

    // Glowing Target Marker Group
    const beaconGroup = new THREE.Group();
    beaconGroup.position.copy(targetPos);
    beaconGroup.lookAt(0, 0, 0); // Orient outward

    // Pulsating Radar Ring
    const beaconRingGeo = new THREE.RingGeometry(0.3, 0.45, 32);
    const beaconRingMat = new THREE.MeshBasicMaterial({
      color: 0x00f2fe,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.85
    });
    const beaconRing = new THREE.Mesh(beaconRingGeo, beaconRingMat);
    beaconGroup.add(beaconRing);

    // Center Core Beacon Dot
    const beaconDotGeo = new THREE.SphereGeometry(0.18, 16, 16);
    const beaconDotMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const beaconDot = new THREE.Mesh(beaconDotGeo, beaconDotMat);
    beaconGroup.add(beaconDot);

    // Vertical Holographic Radar Beam pointing up from India
    const beamGeo = new THREE.CylinderGeometry(0.04, 0.04, 2.2, 16);
    const beamMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.75
    });
    const beamMesh = new THREE.Mesh(beamGeo, beamMat);
    beamMesh.position.z = -1.1; // Extends outwards
    beamMesh.rotation.x = Math.PI / 2;
    beaconGroup.add(beamMesh);

    earthMesh.add(beaconGroup);
    targetBeaconRef.current = beaconGroup;

    // ORIENT INDIA TOWARD INITIAL VIEW
    // Rotate Earth so India faces roughly towards the camera
    earthMesh.rotation.y = -Math.PI / 2.4;
    earthMesh.rotation.x = 0.25;

    // ANIMATION LOOP
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      // Slow orbital clouds rotation
      if (cloudMeshRef.current) {
        cloudMeshRef.current.rotation.y += 0.0009;
      }

      // Rotate orbital satellite
      orbitRing.rotation.z += 0.004;

      // Pulse beacon ring on India
      if (beaconRing) {
        const s = 1.0 + Math.sin(time * 6) * 0.35;
        beaconRing.scale.set(s, s, s);
        beaconRingMat.opacity = 0.5 + Math.sin(time * 6) * 0.4;
      }

      // If user drags to rotate in orbit mode
      if (isInOrbitMode && !isDraggingRef.current) {
        earthMesh.rotation.y += 0.0012;
      }

      renderer.render(scene, camera);
    };
    animate();

    // MOUSE DRAGGING IN ORBIT MODE
    const handlePointerDown = (e) => {
      if (!isInOrbitMode) return;
      isDraggingRef.current = true;
      prevMouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handlePointerMove = (e) => {
      if (!isDraggingRef.current || !isInOrbitMode) return;
      const deltaX = e.clientX - prevMouseRef.current.x;
      const deltaY = e.clientY - prevMouseRef.current.y;

      earthMesh.rotation.y += deltaX * 0.005;
      earthMesh.rotation.x = Math.max(-0.6, Math.min(0.6, earthMesh.rotation.x + deltaY * 0.005));

      prevMouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handlePointerUp = () => {
      isDraggingRef.current = false;
    };

    const dom = renderer.domElement;
    dom.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);

    // RESIZE LISTENER
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // ==========================================
    // GSAP CINEMATIC SATELLITE DESCENT TIMELINE
    // ==========================================
    if (!introCompleted && !prefersReducedMotion) {
      const tl = gsap.timeline({
        onComplete: () => {
          setShowSkipBtn(false);
          onIntroComplete();
        }
      });
      timelineRef.current = tl;

      // Phase 1: High Orbit Space Scan (0s -> 2.5s)
      tl.to(camera.position, {
        x: 0,
        y: 8,
        z: 46,
        duration: 2.5,
        ease: 'power1.inOut',
        onStart: () => {
          setTelemetryStatus('ORBITAL RECONNAISSANCE');
          setTelemetryText('ALTITUDE: 35,786 KM // SATELLITE TRACK SAT-IND-01');
        }
      });

      // Phase 2: Target Locking on India (2.5s -> 4.5s)
      tl.to(earthMesh.rotation, {
        y: -1.25,
        x: 0.42,
        duration: 2.0,
        ease: 'power2.inOut',
        onStart: () => {
          playSonarPing();
          setTelemetryStatus('TARGET ACQUIRED: INDIA');
          setTelemetryText('LOCK ON: SECTOR 28.67°N, 77.45°E // NCR - LUCKNOW HUB');
        }
      }, '-=0.5');

      // Phase 3: High-Speed Hypersonic Dive (4.5s -> 7.5s)
      tl.to(camera.position, {
        x: -2.8,
        y: 4.8,
        z: 14.8,
        duration: 3.0,
        ease: 'expo.inOut',
        onStart: () => {
          playDiveWhoosh();
          setTelemetryStatus('HYPERSONIC SATELLITE DESCENT');
        },
        onUpdate: () => {
          // Calculate simulated altitude based on timeline progress
          const progress = tl.progress();
          if (progress > 0.4) {
            const alt = Math.floor(35786 * (1 - (progress - 0.4) / 0.6) + 214);
            setCurrentAltitude(Math.max(214, alt));
            setTelemetryText(`ALTITUDE: ${Math.max(214, alt).toLocaleString()} KM // VELOCITY: MACH 18.4`);
          }
        }
      });

      // Phase 4: Final Telemetry Confirmation (7.5s -> 8.2s)
      tl.to({}, {
        duration: 0.7,
        onStart: () => {
          setTelemetryStatus('DESTINATION REACHED');
          setTelemetryText('DIGITAL IDENTITY MATRIX LOADED // AYUSH SHUKLA');
        }
      });
    } else {
      // If intro already completed or reduced-motion requested, position camera directly
      camera.position.set(-2.8, 4.8, 14.8);
      earthMesh.rotation.y = -1.25;
      earthMesh.rotation.x = 0.42;
      setCurrentAltitude(214);
      setShowSkipBtn(false);
      onIntroComplete();
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      dom.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('resize', handleResize);
      if (timelineRef.current) timelineRef.current.kill();
      renderer.dispose();
      starGeo.dispose();
      starMat.dispose();
    };
  }, [introCompleted]);

  // Handle Skip Sequence Action
  const handleSkipIntro = () => {
    playTacticalClick();
    if (timelineRef.current) {
      timelineRef.current.progress(1);
    }
    setShowSkipBtn(false);
    onIntroComplete();
  };

  return (
    <div className="relative w-full h-full select-none overflow-hidden">
      {/* 3D WebGL Canvas */}
      <div 
        ref={mountRef} 
        className={`w-full h-full ${isInOrbitMode ? 'cursor-grab active:cursor-grabbing' : 'cursor-default'}`} 
      />

      {/* SATELLITE HUD TELEMETRY OVERLAY (NASA / FUTURISTIC RADAR STYLE) */}
      <div className="pointer-events-none absolute inset-0 z-20 flex flex-col justify-between p-4 sm:p-8">
        
        {/* Top Left: Orbit Coordinates & Altitude */}
        <div className="flex flex-col space-y-1 font-mono text-[11px] sm:text-xs">
          <div className="flex items-center space-x-2 text-cyan-400">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping inline-block" />
            <span className="font-bold tracking-widest uppercase">{telemetryStatus}</span>
          </div>
          <div className="text-slate-300 bg-space-950/80 px-2.5 py-1 rounded border border-cyan-500/20 backdrop-blur-sm inline-block max-w-fit">
            {telemetryText}
          </div>
          <div className="text-[10px] text-slate-400">
            LOC: {personalInfo.coordinates.city} [{personalInfo.coordinates.lat}, {personalInfo.coordinates.lng}]
          </div>
        </div>

        {/* Top Right: Orbit Mode Pill & Reticle Status */}
        <div className="flex items-center space-x-2 self-end">
          <div className="pointer-events-auto flex items-center space-x-2 px-3 py-1.5 rounded-full bg-space-950/85 border border-cyan-500/30 backdrop-blur-md text-xs font-mono text-cyan-300 shadow-[0_0_15px_rgba(0,242,254,0.2)]">
            <Orbit className="w-3.5 h-3.5 text-cyan-400 animate-spin" style={{ animationDuration: '8s' }} />
            <span>SAT_FEED: 60 FPS</span>
          </div>
        </div>

        {/* Bottom Left: Reticle Targeting Frame */}
        <div className="hidden md:flex items-center space-x-3 font-mono text-[11px] text-slate-400">
          <div className="p-2 rounded bg-space-950/80 border border-slate-800">
            <span className="text-cyan-400 block font-bold">CARRIER: SAT-IND-01</span>
            <span>BEARING: 042° TRUE // ELEV: {currentAltitude} KM</span>
          </div>
        </div>

        {/* Bottom Right: Skip Intro Button (Active during sequence) */}
        {showSkipBtn && (
          <div className="pointer-events-auto self-end">
            <button
              onClick={handleSkipIntro}
              className="group flex items-center space-x-2 px-4 py-2 rounded-xl bg-space-950/90 hover:bg-cyan-500/20 border border-cyan-500/40 hover:border-cyan-400 text-cyan-300 font-mono text-xs shadow-[0_0_20px_rgba(0,242,254,0.3)] transition-all transform hover:scale-105"
            >
              <FastForward className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              <span>SKIP SATELLITE SEQUENCE [ESC]</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
