import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { celestialBodies } from '../data/solarData';
import { playClick, playSelect, playWarp } from '../utils/audio';

export default function SolarCanvas({
  selectedBodyId,
  onSelectBody,
  isOrbitPaused,
  orbitSpeedMultiplier = 1,
  onWarpComplete
}) {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const planetsRef = useRef({});
  const orbitLinesRef = useRef([]);
  const asteroidBeltRef = useRef(null);
  const sunCoronaRef = useRef(null);
  const earthCloudsRef = useRef(null);
  const moonRef = useRef(null);

  // Camera state for smooth animation
  const cameraTargetRef = useRef(new THREE.Vector3(0, 32, 68));
  const lookAtTargetRef = useRef(new THREE.Vector3(0, 0, 0));
  const currentLookAtRef = useRef(new THREE.Vector3(0, 0, 0));
  const isWarpingRef = useRef(false);

  // Dragging / Free rotation state
  const isDraggingRef = useRef(false);
  const previousMousePosition = useRef({ x: 0, y: 0 });
  const cameraSphericalRef = useRef({ radius: 75, theta: Math.PI / 4, phi: Math.PI / 3.2 });
  const hoveredBodyRef = useRef(null);

  // Helper to create procedural planet texture canvases
  const createPlanetTexture = (type, baseColorHex) => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = baseColorHex;
    ctx.fillRect(0, 0, 512, 256);

    if (type === 'sun') {
      // Turbulent solar flares
      const grad = ctx.createLinearGradient(0, 0, 512, 256);
      grad.addColorStop(0, '#ffcc00');
      grad.addColorStop(0.5, '#ff6600');
      grad.addColorStop(1, '#ff1100');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 512, 256);

      for (let i = 0; i < 40; i++) {
        ctx.fillStyle = 'rgba(255, 255, 200, 0.2)';
        ctx.beginPath();
        ctx.arc(Math.random() * 512, Math.random() * 256, Math.random() * 60 + 20, 0, Math.PI * 2);
        ctx.fill();
      }
    } else if (type === 'gas_giant') {
      // Horizontal planetary bands like Jupiter
      for (let y = 0; y < 256; y += 4) {
        const shade = Math.sin(y * 0.1) * 30 + (Math.random() * 15);
        ctx.fillStyle = `rgba(${220 + shade}, ${130 + shade * 0.6}, ${60 + shade * 0.3}, 0.85)`;
        ctx.fillRect(0, y, 512, 4);
      }
      // Great Red Spot
      ctx.fillStyle = '#b91c1c';
      ctx.beginPath();
      ctx.ellipse(320, 150, 45, 25, 0, 0, Math.PI * 2);
      ctx.fill();
    } else if (type === 'terrestrial') {
      // Earth-like continents and oceans
      ctx.fillStyle = '#0284c7';
      ctx.fillRect(0, 0, 512, 256);
      ctx.fillStyle = '#15803d';
      for (let i = 0; i < 15; i++) {
        ctx.beginPath();
        ctx.arc(Math.random() * 512, Math.random() * 256, Math.random() * 70 + 20, 0, Math.PI * 2);
        ctx.fill();
      }
    } else if (type === 'rocky') {
      // Mercury craters
      for (let i = 0; i < 80; i++) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
        ctx.beginPath();
        ctx.arc(Math.random() * 512, Math.random() * 256, Math.random() * 12 + 2, 0, Math.PI * 2);
        ctx.fill();
      }
    } else if (type === 'mars') {
      // Mars dusty streaks
      ctx.fillStyle = '#dc2626';
      ctx.fillRect(0, 0, 512, 256);
      for (let y = 0; y < 256; y += 8) {
        ctx.fillStyle = 'rgba(120, 20, 10, 0.3)';
        ctx.fillRect(0, y, 512, 4);
      }
      // Polar Ice Cap
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.fillRect(0, 0, 512, 25);
    } else if (type === 'ringed') {
      // Saturn soft golden bands
      for (let y = 0; y < 256; y += 6) {
        const factor = Math.cos(y * 0.08) * 20;
        ctx.fillStyle = `rgba(${234 + factor}, ${179 + factor}, ${8 + factor}, 0.9)`;
        ctx.fillRect(0, y, 512, 6);
      }
    } else {
      // General subtle noise
      for (let i = 0; i < 30; i++) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.beginPath();
        ctx.arc(Math.random() * 512, Math.random() * 256, Math.random() * 40, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const texture = new THREE.CanvasTexture(canvas);
    return texture;
  };

  // Helper to create Saturn Rings texture
  const createRingTexture = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');

    const grad = ctx.createLinearGradient(0, 0, 512, 0);
    grad.addColorStop(0, 'rgba(234, 179, 8, 0)');
    grad.addColorStop(0.2, 'rgba(234, 179, 8, 0.8)');
    grad.addColorStop(0.45, 'rgba(202, 138, 4, 0.4)');
    grad.addColorStop(0.55, 'rgba(0, 0, 0, 0.1)'); // Cassini division
    grad.addColorStop(0.65, 'rgba(234, 179, 8, 0.9)');
    grad.addColorStop(0.9, 'rgba(254, 240, 138, 0.5)');
    grad.addColorStop(1, 'rgba(234, 179, 8, 0)');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 512, 64);

    const texture = new THREE.CanvasTexture(canvas);
    return texture;
  };

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // SCENE
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.fog = new THREE.FogExp2(0x020617, 0.0035);

    // CAMERA
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;
    const camera = new THREE.PerspectiveCamera(48, width / height, 0.1, 1000);
    cameraRef.current = camera;
    camera.position.set(0, 38, 74);
    camera.lookAt(0, 0, 0);

    // RENDERER
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: "high-performance" });
    rendererRef.current = renderer;
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // LIGHTING
    // Ambient starlight
    const ambientLight = new THREE.AmbientLight(0x38bdf8, 0.25);
    scene.add(ambientLight);

    // Sun point light in the center
    const sunLight = new THREE.PointLight(0xfff7ed, 3.5, 300, 0.5);
    sunLight.position.set(0, 0, 0);
    scene.add(sunLight);

    // STARFIELD (3,000 twinkling cosmic stars)
    const starCount = 3000;
    const starGeometry = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    const palette = [
      new THREE.Color(0xffffff),
      new THREE.Color(0x38bdf8),
      new THREE.Color(0xfef08a),
      new THREE.Color(0xf472b6),
      new THREE.Color(0x67e8f9)
    ];

    for (let i = 0; i < starCount; i++) {
      const radius = 180 + Math.random() * 250;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      starPositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      starPositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      starPositions[i * 3 + 2] = radius * Math.cos(phi);

      const color = palette[Math.floor(Math.random() * palette.length)];
      starColors[i * 3] = color.r;
      starColors[i * 3 + 1] = color.g;
      starColors[i * 3 + 2] = color.b;
    }

    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeometry.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

    const starMaterial = new THREE.PointsMaterial({
      size: 1.2,
      vertexColors: true,
      transparent: true,
      opacity: 0.85
    });

    const starField = new THREE.Points(starGeometry, starMaterial);
    scene.add(starField);

    // CELESTIAL BODIES BUILDER
    celestialBodies.forEach((body) => {
      if (body.isBelt) {
        // Build Asteroid Belt (800+ instanced tumbling rocks)
        const asteroidCount = 850;
        const asteroidGeo = new THREE.DodecahedronGeometry(0.22, 0);
        const asteroidMat = new THREE.MeshStandardMaterial({
          color: 0x94a3b8,
          roughness: 0.9,
          metalness: 0.1
        });
        const instancedMesh = new THREE.InstancedMesh(asteroidGeo, asteroidMat, asteroidCount);
        const dummy = new THREE.Object3D();

        const beltData = [];

        for (let i = 0; i < asteroidCount; i++) {
          const angle = (i / asteroidCount) * Math.PI * 2 + (Math.random() * 0.1);
          const distance = body.orbitRadius + (Math.random() - 0.5) * 4.5;
          const y = (Math.random() - 0.5) * 2.2;
          const scale = 0.4 + Math.random() * 0.9;

          dummy.position.set(Math.cos(angle) * distance, y, Math.sin(angle) * distance);
          dummy.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
          dummy.scale.set(scale, scale, scale);
          dummy.updateMatrix();

          instancedMesh.setMatrixAt(i, dummy.matrix);
          beltData.push({ angle, distance, y, speed: 0.0015 + (Math.random() * 0.001) });
        }
        instancedMesh.instanceMatrix.needsUpdate = true;
        scene.add(instancedMesh);
        asteroidBeltRef.current = { mesh: instancedMesh, data: beltData, dummy };
        return;
      }

      // ORBIT PATH RING
      if (body.orbitRadius > 0) {
        const segments = 128;
        const orbitPoints = [];
        for (let i = 0; i <= segments; i++) {
          const theta = (i / segments) * Math.PI * 2;
          orbitPoints.push(new THREE.Vector3(Math.cos(theta) * body.orbitRadius, 0, Math.sin(theta) * body.orbitRadius));
        }
        const orbitGeo = new THREE.BufferGeometry().setFromPoints(orbitPoints);
        const orbitMat = new THREE.LineBasicMaterial({
          color: new THREE.Color(body.glowColor || 0x00f2fe),
          transparent: true,
          opacity: 0.18
        });
        const orbitLine = new THREE.LineLoop(orbitGeo, orbitMat);
        scene.add(orbitLine);
        orbitLinesRef.current.push({ id: body.id, line: orbitLine, baseOpacity: 0.18 });
      }

      // PLANET / SUN MESH
      const texture = createPlanetTexture(body.textureType, body.color);
      let material;

      if (body.id === 'sun') {
        material = new THREE.MeshBasicMaterial({
          map: texture,
          color: 0xffdd44
        });
      } else {
        material = new THREE.MeshStandardMaterial({
          map: texture,
          roughness: 0.7,
          metalness: 0.15,
          emissive: new THREE.Color(body.color),
          emissiveIntensity: 0.08
        });
      }

      const geometry = new THREE.SphereGeometry(body.size, 48, 48);
      const planetMesh = new THREE.Mesh(geometry, material);
      planetMesh.castShadow = false;
      planetMesh.receiveShadow = true;
      planetMesh.userData = { id: body.id, bodyData: body };

      // Initial placement
      const initialAngle = (celestialBodies.indexOf(body) * 0.85);
      planetMesh.position.x = Math.cos(initialAngle) * body.orbitRadius;
      planetMesh.position.z = Math.sin(initialAngle) * body.orbitRadius;
      planetMesh.userData.currentAngle = initialAngle;

      scene.add(planetMesh);

      // SUN CORONA & GLOW HALO
      if (body.id === 'sun') {
        // Inner Glow Billboard
        const coronaGeo = new THREE.SphereGeometry(body.size * 1.3, 32, 32);
        const coronaMat = new THREE.MeshBasicMaterial({
          color: 0xffaa00,
          transparent: true,
          opacity: 0.35,
          side: THREE.BackSide
        });
        const corona = new THREE.Mesh(coronaGeo, coronaMat);
        planetMesh.add(corona);
        sunCoronaRef.current = corona;

        // Outer Glow Billboard
        const outerGlowGeo = new THREE.SphereGeometry(body.size * 1.7, 32, 32);
        const outerGlowMat = new THREE.MeshBasicMaterial({
          color: 0xff6600,
          transparent: true,
          opacity: 0.15,
          side: THREE.BackSide
        });
        const outerGlow = new THREE.Mesh(outerGlowGeo, outerGlowMat);
        planetMesh.add(outerGlow);
      }

      // SATURN RINGS
      if (body.hasRings) {
        const ringGeo = new THREE.RingGeometry(body.size * 1.45, body.size * 2.5, 64);
        const ringTex = createRingTexture();
        const ringMat = new THREE.MeshStandardMaterial({
          map: ringTex,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.85,
          roughness: 0.5
        });
        const ringMesh = new THREE.Mesh(ringGeo, ringMat);
        ringMesh.rotation.x = Math.PI / 2.3;
        ringMesh.rotation.y = Math.PI / 7;
        planetMesh.add(ringMesh);
      }

      // EARTH CLOUDS & MOON
      if (body.hasMoon) {
        // Atmosphere Cloud Layer
        const cloudGeo = new THREE.SphereGeometry(body.size * 1.025, 32, 32);
        const cloudMat = new THREE.MeshStandardMaterial({
          color: 0xffffff,
          transparent: true,
          opacity: 0.3,
          roughness: 1
        });
        const cloudMesh = new THREE.Mesh(cloudGeo, cloudMat);
        planetMesh.add(cloudMesh);
        earthCloudsRef.current = cloudMesh;

        // Moon
        const moonGeo = new THREE.SphereGeometry(0.4, 24, 24);
        const moonMat = new THREE.MeshStandardMaterial({
          color: 0xd1d5db,
          roughness: 0.9
        });
        const moonMesh = new THREE.Mesh(moonGeo, moonMat);
        moonMesh.position.set(3.2, 0.4, 0);
        planetMesh.add(moonMesh);
        moonRef.current = { mesh: moonMesh, angle: 0 };
      }

      // URANUS VERTICAL TILT RING
      if (body.id === 'uranus') {
        const ringGeo = new THREE.RingGeometry(body.size * 1.3, body.size * 1.5, 48);
        const ringMat = new THREE.MeshBasicMaterial({
          color: 0x67e8f9,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.45
        });
        const uranusRing = new THREE.Mesh(ringGeo, ringMat);
        uranusRing.rotation.y = Math.PI / 2.1;
        planetMesh.add(uranusRing);
      }

      planetsRef.current[body.id] = planetMesh;
    });

    // POINTER & RAYCASTING INTERACTION
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handlePointerDown = (e) => {
      isDraggingRef.current = true;
      previousMousePosition.current = { x: e.clientX, y: e.clientY };
    };

    const handlePointerMove = (e) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      if (isDraggingRef.current) {
        const deltaX = e.clientX - previousMousePosition.current.x;
        const deltaY = e.clientY - previousMousePosition.current.y;

        cameraSphericalRef.current.theta -= deltaX * 0.006;
        cameraSphericalRef.current.phi = Math.max(0.1, Math.min(Math.PI / 2.05, cameraSphericalRef.current.phi - deltaY * 0.006));

        previousMousePosition.current = { x: e.clientX, y: e.clientY };

        // If dragging in free mode, update camera target position directly
        if (!selectedBodyId) {
          const { radius, theta, phi } = cameraSphericalRef.current;
          cameraTargetRef.current.x = radius * Math.sin(phi) * Math.sin(theta);
          cameraTargetRef.current.y = radius * Math.cos(phi);
          cameraTargetRef.current.z = radius * Math.sin(phi) * Math.cos(theta);
        }
      } else {
        // Hover raycasting
        raycaster.setFromCamera(mouse, camera);
        const planetMeshes = Object.values(planetsRef.current);
        const intersects = raycaster.intersectObjects(planetMeshes, false);

        if (intersects.length > 0) {
          const hoveredId = intersects[0].object.userData.id;
          if (hoveredBodyRef.current !== hoveredId) {
            hoveredBodyRef.current = hoveredId;
            document.body.style.cursor = 'pointer';
          }
        } else {
          if (hoveredBodyRef.current !== null) {
            hoveredBodyRef.current = null;
            document.body.style.cursor = 'default';
          }
        }
      }
    };

    const handlePointerUp = (e) => {
      const deltaX = Math.abs(e.clientX - previousMousePosition.current.x);
      const deltaY = Math.abs(e.clientY - previousMousePosition.current.y);
      isDraggingRef.current = false;

      // Only trigger click if movement was negligible (not a drag)
      if (deltaX < 5 && deltaY < 5) {
        const rect = renderer.domElement.getBoundingClientRect();
        mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);
        const planetMeshes = Object.values(planetsRef.current);
        const intersects = raycaster.intersectObjects(planetMeshes, false);

        if (intersects.length > 0) {
          const clickedId = intersects[0].object.userData.id;
          playSelect();
          onSelectBody(clickedId);
        }
      }
    };

    const handleWheel = (e) => {
      e.preventDefault();
      const zoomFactor = e.deltaY * 0.08;
      cameraSphericalRef.current.radius = Math.max(12, Math.min(130, cameraSphericalRef.current.radius + zoomFactor));

      if (!selectedBodyId) {
        const { radius, theta, phi } = cameraSphericalRef.current;
        cameraTargetRef.current.x = radius * Math.sin(phi) * Math.sin(theta);
        cameraTargetRef.current.y = radius * Math.cos(phi);
        cameraTargetRef.current.z = radius * Math.sin(phi) * Math.cos(theta);
      }
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    domElement.addEventListener('wheel', handleWheel, { passive: false });

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

    // ANIMATION LOOP
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Rotate Sun corona
      if (sunCoronaRef.current) {
        sunCoronaRef.current.rotation.y += 0.003;
        const scale = 1.3 + Math.sin(time * 2.5) * 0.04;
        sunCoronaRef.current.scale.set(scale, scale, scale);
      }

      // Rotate Earth atmospheric clouds
      if (earthCloudsRef.current) {
        earthCloudsRef.current.rotation.y += 0.0025;
      }

      // Orbit Moon around Earth
      if (moonRef.current) {
        moonRef.current.angle += 0.02;
        moonRef.current.mesh.position.x = Math.cos(moonRef.current.angle) * 3.4;
        moonRef.current.mesh.position.z = Math.sin(moonRef.current.angle) * 3.4;
      }

      // Orbit planets
      celestialBodies.forEach((body) => {
        const mesh = planetsRef.current[body.id];
        if (!mesh) return;

        // Self rotation
        mesh.rotation.y += body.rotationSpeed || 0.01;

        // Revolution around Sun
        if (body.orbitRadius > 0 && !isOrbitPaused) {
          const speed = (body.orbitSpeed || 0.01) * orbitSpeedMultiplier;
          mesh.userData.currentAngle = (mesh.userData.currentAngle || 0) + speed;
          mesh.position.x = Math.cos(mesh.userData.currentAngle) * body.orbitRadius;
          mesh.position.z = Math.sin(mesh.userData.currentAngle) * body.orbitRadius;
        }
      });

      // Tumble Asteroid Belt
      if (asteroidBeltRef.current && !isOrbitPaused) {
        const { mesh, data, dummy } = asteroidBeltRef.current;
        for (let i = 0; i < data.length; i++) {
          data[i].angle += data[i].speed * orbitSpeedMultiplier;
          dummy.position.set(
            Math.cos(data[i].angle) * data[i].distance,
            data[i].y + Math.sin(time + i) * 0.1,
            Math.sin(data[i].angle) * data[i].distance
          );
          dummy.rotation.x += 0.01;
          dummy.rotation.y += 0.015;
          dummy.updateMatrix();
          mesh.setMatrixAt(i, dummy.matrix);
        }
        mesh.instanceMatrix.needsUpdate = true;
      }

      // CAMERA POSITIONING & LERPAGE
      if (selectedBodyId && planetsRef.current[selectedBodyId]) {
        const targetMesh = planetsRef.current[selectedBodyId];
        const bodyData = targetMesh.userData.bodyData;
        const targetPos = targetMesh.position;

        lookAtTargetRef.current.copy(targetPos);

        // Determine offset camera distance according to body size
        const viewDistance = Math.max(targetMesh.geometry.parameters.radius * 3.4, 7.5);
        cameraTargetRef.current.set(
          targetPos.x + viewDistance * 0.8,
          targetPos.y + viewDistance * 0.55,
          targetPos.z + viewDistance * 1.1
        );
      } else if (!isDraggingRef.current) {
        // Default overview rotation
        lookAtTargetRef.current.set(0, 0, 0);
      }

      // Smooth camera interpolation
      camera.position.lerp(cameraTargetRef.current, 0.045);
      currentLookAtRef.current.lerp(lookAtTargetRef.current, 0.045);
      camera.lookAt(currentLookAtRef.current);

      // Highlight selected or hovered orbit lines
      orbitLinesRef.current.forEach(({ id, line, baseOpacity }) => {
        if (id === selectedBodyId) {
          line.material.opacity = 0.85;
          line.material.linewidth = 2;
        } else if (id === hoveredBodyRef.current) {
          line.material.opacity = 0.5;
        } else {
          line.material.opacity = baseOpacity;
        }
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      domElement.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      domElement.removeEventListener('wheel', handleWheel);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      starGeometry.dispose();
      starMaterial.dispose();
    };
  }, []);

  // Watch for selectedBodyId changes to trigger warp audio and camera positioning
  useEffect(() => {
    if (selectedBodyId) {
      playWarp();
    } else {
      // Reset camera to wide galactic view
      cameraSphericalRef.current.radius = 75;
      cameraSphericalRef.current.theta = Math.PI / 4;
      cameraSphericalRef.current.phi = Math.PI / 3.2;
      const { radius, theta, phi } = cameraSphericalRef.current;
      cameraTargetRef.current.set(
        radius * Math.sin(phi) * Math.sin(theta),
        radius * Math.cos(phi),
        radius * Math.sin(phi) * Math.cos(theta)
      );
      lookAtTargetRef.current.set(0, 0, 0);
    }
  }, [selectedBodyId]);

  return (
    <div className="relative w-full h-full select-none">
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
    </div>
  );
}
