import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const PLATTER_X = -0.45;
const ARM_PIVOT = new THREE.Vector3(1.45, 0, -1.05);
const ARM_LENGTH = 2.3;
const ARM_REST = 0;
const ARM_PLAY = -0.47;
const SPIN_SPEED = 2.4; // rad/s — a little slower than a real 33⅓ so it reads calmly

const THEMES = {
  dark: {
    plinth: '#181a33',
    plinthEdge: '#262a4f',
    platter: '#2b2e45',
    metal: '#c9c4d8',
    accent: '#ffb454',
    rim: '#8f9bff',
    labelBg: '#ffb454',
    labelText: '#1a1206',
    ambient: 0.45,
    dust: '#ffd08a',
  },
  light: {
    plinth: '#e9dcc3',
    plinthEdge: '#d6c4a2',
    platter: '#3a3a48',
    metal: '#d8d2c4',
    accent: '#c66d1c',
    rim: '#7b86d8',
    labelBg: '#c66d1c',
    labelText: '#fffaf0',
    ambient: 0.85,
    dust: '#c66d1c',
  },
};

const makeCanvas = (size) => {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  return [canvas, canvas.getContext('2d')];
};

const makeGrooveTexture = () => {
  const size = 1024;
  const [canvas, ctx] = makeCanvas(size);
  const c = size / 2;
  ctx.fillStyle = '#0c0c12';
  ctx.fillRect(0, 0, size, size);
  for (let r = c * 0.36; r < c * 0.985; r += 1.6) {
    // a few darker gaps between "tracks"
    const isGap = [0.52, 0.64, 0.75, 0.86].some(g => Math.abs(r / c - g) < 0.006);
    const shade = isGap ? 4 : 18 + Math.random() * 16;
    ctx.strokeStyle = `rgb(${shade}, ${shade}, ${shade + 4})`;
    ctx.lineWidth = isGap ? 2.4 : 0.9;
    ctx.beginPath();
    ctx.arc(c, c, r, 0, Math.PI * 2);
    ctx.stroke();
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  return texture;
};

// Static, non-rotating highlight laid over the record so the grooves "catch" light.
const makeSheenTexture = () => {
  const size = 512;
  const [canvas, ctx] = makeCanvas(size);
  const c = size / 2;
  const gradient = ctx.createConicGradient(Math.PI / 5, c, c);
  gradient.addColorStop(0, 'rgba(255,255,255,0)');
  gradient.addColorStop(0.08, 'rgba(255,255,255,0.55)');
  gradient.addColorStop(0.16, 'rgba(255,255,255,0)');
  gradient.addColorStop(0.5, 'rgba(255,255,255,0)');
  gradient.addColorStop(0.58, 'rgba(255,255,255,0.4)');
  gradient.addColorStop(0.66, 'rgba(255,255,255,0)');
  gradient.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(c, c, c, 0, Math.PI * 2);
  ctx.arc(c, c, c * 0.36, 0, Math.PI * 2, true);
  ctx.fill();
  return new THREE.CanvasTexture(canvas);
};

const makeShadowTexture = () => {
  const size = 256;
  const [canvas, ctx] = makeCanvas(size);
  const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  gradient.addColorStop(0, 'rgba(0,0,0,0.55)');
  gradient.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  return new THREE.CanvasTexture(canvas);
};

// Center label: the profile photo inside a coloured ring with curved name text.
const makeLabelTexture = (image, palette) => {
  const size = 1024;
  const [canvas, ctx] = makeCanvas(size);
  const c = size / 2;

  ctx.fillStyle = palette.labelBg;
  ctx.beginPath();
  ctx.arc(c, c, c, 0, Math.PI * 2);
  ctx.fill();

  if (image) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(c, c, c * 0.7, 0, Math.PI * 2);
    ctx.clip();
    const scale = Math.max((c * 1.4) / image.width, (c * 1.4) / image.height);
    const w = image.width * scale;
    const h = image.height * scale;
    ctx.drawImage(image, c - w / 2, c - c * 0.7, w, h);
    ctx.restore();
  }

  ctx.fillStyle = palette.labelText;
  ctx.font = '600 58px "Space Grotesk", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  const text = 'TEEKAY MANALE  •  FULL STACK DEVELOPER  •  ';
  const radius = c * 0.85;
  const step = (Math.PI * 2) / text.length;
  for (let i = 0; i < text.length; i++) {
    const angle = i * step - Math.PI / 2;
    ctx.save();
    ctx.translate(c + Math.cos(angle) * radius, c + Math.sin(angle) * radius);
    ctx.rotate(angle + Math.PI / 2);
    ctx.fillText(text[i], 0, 0);
    ctx.restore();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
};

const makePlinthGeometry = () => {
  const width = 4.4;
  const depth = 3.5;
  const radius = 0.28;
  const shape = new THREE.Shape();
  const x = -width / 2;
  const y = -depth / 2;
  shape.moveTo(x + radius, y);
  shape.lineTo(x + width - radius, y);
  shape.quadraticCurveTo(x + width, y, x + width, y + radius);
  shape.lineTo(x + width, y + depth - radius);
  shape.quadraticCurveTo(x + width, y + depth, x + width - radius, y + depth);
  shape.lineTo(x + radius, y + depth);
  shape.quadraticCurveTo(x, y + depth, x, y + depth - radius);
  shape.lineTo(x, y + radius);
  shape.quadraticCurveTo(x, y, x + radius, y);
  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: 0.3,
    bevelEnabled: true,
    bevelThickness: 0.05,
    bevelSize: 0.05,
    bevelSegments: 4,
    curveSegments: 12,
  });
  // Lay it flat with the top face at y = 0
  geometry.rotateX(-Math.PI / 2);
  geometry.translate(0, -0.35, 0);
  return geometry;
};

const Dust = ({ color, isPlaying }) => {
  const ref = useRef();
  const count = 70;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 7;
      arr[i * 3 + 1] = Math.random() * 3.5;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 5;
    }
    return arr;
  }, []);

  useFrame((_, delta) => {
    if (!isPlaying || !ref.current) return;
    const attr = ref.current.geometry.attributes.position;
    for (let i = 0; i < count; i++) {
      let yPos = attr.getY(i) + delta * 0.12;
      if (yPos > 3.5) yPos = 0;
      attr.setY(i, yPos);
    }
    attr.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color={color}
        size={0.035}
        transparent
        opacity={0.7}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

const Deck = ({ isPlaying, palette, pointer }) => {
  const rig = useRef();
  const record = useRef();
  const arm = useRef();
  const powerLight = useRef();
  const spin = useRef(0);
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    const img = new Image();
    // Wait for the display font so the curved label text renders in it
    img.onload = () => document.fonts.ready.then(() => setPhoto(img));
    img.src = '/assets/profile.jpeg';
  }, []);

  const textures = useMemo(() => ({
    grooves: makeGrooveTexture(),
    sheen: makeSheenTexture(),
    shadow: makeShadowTexture(),
  }), []);
  const labelTexture = useMemo(() => makeLabelTexture(photo, palette), [photo, palette]);
  const plinthGeometry = useMemo(makePlinthGeometry, []);

  useEffect(() => () => labelTexture.dispose(), [labelTexture]);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;

    // Arm swings in first; the record only spins once the stylus has landed.
    const armTarget = isPlaying ? ARM_PLAY : ARM_REST;
    arm.current.rotation.y = THREE.MathUtils.damp(arm.current.rotation.y, armTarget, 2.2, delta);
    const armTravel = Math.abs(arm.current.rotation.y - armTarget);
    arm.current.rotation.x = THREE.MathUtils.damp(arm.current.rotation.x, armTravel > 0.03 ? -0.07 : 0, 6, delta);
    const landed = isPlaying && armTravel < 0.03;

    spin.current = THREE.MathUtils.damp(spin.current, landed ? SPIN_SPEED : 0, landed ? 1.2 : 2.5, delta);
    record.current.rotation.y -= spin.current * delta;

    rig.current.rotation.x = THREE.MathUtils.damp(rig.current.rotation.x, 0.08 + pointer.current.y * 0.1, 3, delta);
    rig.current.rotation.y = THREE.MathUtils.damp(rig.current.rotation.y, -0.35 + pointer.current.x * 0.22, 3, delta);
    rig.current.position.y = isPlaying ? Math.sin(t * 0.9) * 0.05 : rig.current.position.y;

    powerLight.current.emissiveIntensity = isPlaying ? 2.2 + Math.sin(t * 3) * 0.6 : 0.3;
  });

  return (
    <group ref={rig}>
      {/* Soft contact shadow */}
      <mesh rotation-x={-Math.PI / 2} position={[0, -0.42, 0]}>
        <planeGeometry args={[6.5, 5.2]} />
        <meshBasicMaterial map={textures.shadow} transparent depthWrite={false} />
      </mesh>

      {/* Plinth */}
      <mesh geometry={plinthGeometry}>
        <meshStandardMaterial color={palette.plinth} roughness={0.55} metalness={0.15} />
      </mesh>
      <mesh rotation-x={-Math.PI / 2} position={[0, 0.002, 0]}>
        <planeGeometry args={[4.3, 3.4]} />
        <meshStandardMaterial color={palette.plinthEdge} roughness={0.8} transparent opacity={0.35} />
      </mesh>

      {/* Platter */}
      <mesh position={[PLATTER_X, 0.04, 0]}>
        <cylinderGeometry args={[1.58, 1.6, 0.08, 96]} />
        <meshStandardMaterial color={palette.platter} roughness={0.3} metalness={0.8} />
      </mesh>

      {/* Record + label (spins) */}
      <group ref={record} position={[PLATTER_X, 0.095, 0]}>
        <mesh>
          <cylinderGeometry args={[1.5, 1.5, 0.03, 128]} />
          <meshStandardMaterial attach="material-0" color="#0c0c12" roughness={0.4} />
          <meshStandardMaterial attach="material-1" map={textures.grooves} roughness={0.32} metalness={0.25} />
          <meshStandardMaterial attach="material-2" color="#0c0c12" />
        </mesh>
        <mesh rotation-x={-Math.PI / 2} position={[0, 0.017, 0]}>
          <circleGeometry args={[0.52, 64]} />
          <meshStandardMaterial map={labelTexture} roughness={0.6} />
        </mesh>
        <mesh position={[0, 0.06, 0]}>
          <cylinderGeometry args={[0.03, 0.03, 0.1, 16]} />
          <meshStandardMaterial color={palette.metal} metalness={1} roughness={0.2} />
        </mesh>
      </group>

      {/* Light sheen that stays still while the grooves move under it */}
      <mesh rotation-x={-Math.PI / 2} position={[PLATTER_X, 0.112, 0]}>
        <circleGeometry args={[1.5, 96]} />
        <meshBasicMaterial
          map={textures.sheen}
          transparent
          opacity={0.14}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Tonearm */}
      <group position={[ARM_PIVOT.x, 0, ARM_PIVOT.z]}>
        <mesh position={[0, 0.1, 0]}>
          <cylinderGeometry args={[0.22, 0.26, 0.2, 48]} />
          <meshStandardMaterial color={palette.metal} metalness={0.9} roughness={0.25} />
        </mesh>
        <group ref={arm} position={[0, 0.26, 0]}>
          <mesh position={[0, 0, ARM_LENGTH / 2 - 0.2]} rotation-x={Math.PI / 2}>
            <cylinderGeometry args={[0.035, 0.035, ARM_LENGTH + 0.4, 16]} />
            <meshStandardMaterial color={palette.metal} metalness={1} roughness={0.18} />
          </mesh>
          <mesh position={[0, 0, -0.45]} rotation-x={Math.PI / 2}>
            <cylinderGeometry args={[0.11, 0.11, 0.22, 32]} />
            <meshStandardMaterial color="#2a2a33" metalness={0.6} roughness={0.35} />
          </mesh>
          <mesh position={[0, -0.06, ARM_LENGTH]}>
            <boxGeometry args={[0.2, 0.08, 0.34]} />
            <meshStandardMaterial color={palette.accent} metalness={0.3} roughness={0.4} />
          </mesh>
        </group>
        {/* Arm rest */}
        <mesh position={[0, 0.12, ARM_LENGTH]}>
          <cylinderGeometry args={[0.05, 0.05, 0.24, 12]} />
          <meshStandardMaterial color={palette.metal} metalness={0.8} roughness={0.3} />
        </mesh>
      </group>

      {/* Speed knob + power light */}
      <mesh position={[-1.85, 0.05, 1.3]}>
        <cylinderGeometry args={[0.18, 0.2, 0.1, 32]} />
        <meshStandardMaterial color={palette.metal} metalness={0.9} roughness={0.3} />
      </mesh>
      <mesh position={[-1.4, 0.02, 1.55]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial ref={powerLight} color={palette.accent} emissive={palette.accent} />
      </mesh>
    </group>
  );
};

const Turntable3D = ({ isPlaying, isDarkMode }) => {
  const wrapper = useRef();
  const pointer = useRef({ x: 0, y: 0 });
  const [onScreen, setOnScreen] = useState(true);
  const palette = isDarkMode ? THEMES.dark : THEMES.light;

  useEffect(() => {
    const handleMove = (e) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('pointermove', handleMove);
    return () => window.removeEventListener('pointermove', handleMove);
  }, []);

  // Stop rendering when the hero is scrolled out of view
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting));
    if (wrapper.current) observer.observe(wrapper.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={wrapper} className="turntable-canvas">
      <Canvas
        frameloop={onScreen ? 'always' : 'never'}
        dpr={[1, 1.75]}
        camera={{ position: [0, 5.6, 6.6], fov: 33 }}
        gl={{ alpha: true, antialias: true }}
        onCreated={({ camera }) => camera.lookAt(0, -0.2, 0)}
      >
        <ambientLight intensity={palette.ambient} />
        <directionalLight position={[-3, 5, 3]} intensity={1.6} color="#fff1dc" />
        <pointLight position={[2.5, 2.2, 2]} intensity={14} distance={9} color={palette.accent} />
        <pointLight position={[-3, 2, -3]} intensity={18} distance={10} color={palette.rim} />
        <Deck isPlaying={isPlaying} palette={palette} pointer={pointer} />
        <Dust color={palette.dust} isPlaying={isPlaying} />
      </Canvas>
    </div>
  );
};

export default Turntable3D;
