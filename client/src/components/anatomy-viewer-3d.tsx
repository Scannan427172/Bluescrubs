import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Heart, Brain, Bone, Eye, Ear, Activity, Zap } from 'lucide-react';

interface OrganSystem {
  id: string;
  name: string;
  icon: any;
  color: string;
  organs: Organ[];
}

interface Organ {
  id: string;
  name: string;
  position: [number, number, number];
  size: [number, number, number];
  color: string;
  description: string;
  clinicalNotes: string[];
}

const organSystems: OrganSystem[] = [
  {
    id: 'cardiovascular',
    name: 'Cardiovascular System',
    icon: Heart,
    color: '#ef4444',
    organs: [
      {
        id: 'heart',
        name: 'Heart',
        position: [0, 0.5, 0],
        size: [0.8, 1, 0.6],
        color: '#ef4444',
        description: 'Four-chambered muscular organ that pumps blood throughout the body',
        clinicalNotes: [
          'Normal heart rate: 60-100 bpm',
          'Cardiac output = Heart rate × Stroke volume',
          'Listen for S1 and S2 heart sounds',
          'Murmurs may indicate valve abnormalities'
        ]
      },
      {
        id: 'aorta',
        name: 'Aorta',
        position: [0, 1.2, 0],
        size: [0.2, 1.5, 0.2],
        color: '#dc2626',
        description: 'Largest artery carrying oxygenated blood from the heart',
        clinicalNotes: [
          'Ascending, arch, and descending portions',
          'Aortic aneurysm risk with hypertension',
          'Coarctation causes arm-leg BP difference'
        ]
      }
    ]
  },
  {
    id: 'respiratory',
    name: 'Respiratory System',
    icon: Activity,
    color: '#3b82f6',
    organs: [
      {
        id: 'lungs',
        name: 'Lungs',
        position: [0, 0.8, 0],
        size: [2, 1.8, 1],
        color: '#3b82f6',
        description: 'Paired organs responsible for gas exchange',
        clinicalNotes: [
          'Right lung has 3 lobes, left has 2',
          'Normal respiratory rate: 12-20/min',
          'Percussion: resonant over healthy lung',
          'Auscultation: vesicular breath sounds normal'
        ]
      },
      {
        id: 'trachea',
        name: 'Trachea',
        position: [0, 1.8, 0],
        size: [0.15, 0.8, 0.15],
        color: '#1d4ed8',
        description: 'Windpipe connecting larynx to bronchi',
        clinicalNotes: [
          'C-shaped cartilaginous rings',
          'Bifurcates at carina (T5 level)',
          'Tracheostomy site below cricoid cartilage'
        ]
      }
    ]
  },
  {
    id: 'nervous',
    name: 'Nervous System',
    icon: Brain,
    color: '#8b5cf6',
    organs: [
      {
        id: 'brain',
        name: 'Brain',
        position: [0, 2.5, 0],
        size: [1.2, 0.8, 1],
        color: '#8b5cf6',
        description: 'Central processing unit of the nervous system',
        clinicalNotes: [
          'Cerebrum, cerebellum, brainstem',
          'Glasgow Coma Scale: E4 V5 M6',
          'Cranial nerves I-XII examination',
          'Normal ICP: 5-15 mmHg'
        ]
      },
      {
        id: 'spinal-cord',
        name: 'Spinal Cord',
        position: [0, 0.5, -0.3],
        size: [0.1, 3, 0.1],
        color: '#7c3aed',
        description: 'Neural pathway connecting brain to peripheral nerves',
        clinicalNotes: [
          'Extends from foramen magnum to L1-L2',
          'Gray matter (H-shaped) contains cell bodies',
          'White matter contains myelinated axons',
          'Dermatome mapping for sensory testing'
        ]
      }
    ]
  },
  {
    id: 'digestive',
    name: 'Digestive System',
    icon: Zap,
    color: '#f59e0b',
    organs: [
      {
        id: 'liver',
        name: 'Liver',
        position: [0.8, 0.2, 0],
        size: [1.2, 0.8, 0.6],
        color: '#f59e0b',
        description: 'Largest internal organ with multiple metabolic functions',
        clinicalNotes: [
          'Right and left lobes',
          'Hepatomegaly: palpable below costal margin',
          'LFTs: ALT, AST, ALP, bilirubin',
          'Produces albumin, clotting factors'
        ]
      },
      {
        id: 'stomach',
        name: 'Stomach',
        position: [-0.5, 0.3, 0],
        size: [0.8, 0.6, 0.4],
        color: '#d97706',
        description: 'J-shaped digestive organ',
        clinicalNotes: [
          'Fundus, body, antrum, pylorus',
          'Gastric acid pH 1.5-3.5',
          'Intrinsic factor for B12 absorption',
          'Peptic ulcer disease risk factors'
        ]
      }
    ]
  },
  {
    id: 'urinary',
    name: 'Urinary System',
    icon: Activity,
    color: '#10b981',
    organs: [
      {
        id: 'kidneys',
        name: 'Kidneys',
        position: [0, -0.2, -0.8],
        size: [2, 0.8, 0.4],
        color: '#10b981',
        description: 'Paired organs that filter blood and produce urine',
        clinicalNotes: [
          'Normal GFR: >90 mL/min/1.73m²',
          'Kidney palpable if enlarged',
          'Urine output: 0.5-1 mL/kg/hr',
          'Creatinine clearance estimates GFR'
        ]
      },
      {
        id: 'bladder',
        name: 'Bladder',
        position: [0, -1.2, 0],
        size: [0.6, 0.4, 0.4],
        color: '#059669',
        description: 'Hollow organ that stores urine',
        clinicalNotes: [
          'Normal capacity: 400-600 mL',
          'Detrusor muscle for contraction',
          'Urinary retention vs incontinence',
          'Post-void residual <50 mL normal'
        ]
      }
    ]
  },
  {
    id: 'musculoskeletal',
    name: 'Musculoskeletal System',
    icon: Bone,
    color: '#6b7280',
    organs: [
      {
        id: 'spine',
        name: 'Vertebral Column',
        position: [0, 0.5, -0.5],
        size: [0.2, 3, 0.3],
        color: '#6b7280',
        description: 'Series of vertebrae protecting spinal cord',
        clinicalNotes: [
          'Cervical (7), thoracic (12), lumbar (5)',
          'Kyphosis (thoracic), lordosis (cervical/lumbar)',
          'Disc herniation common at L4-L5, L5-S1',
          'Straight leg raise test for sciatica'
        ]
      },
      {
        id: 'ribcage',
        name: 'Rib Cage',
        position: [0, 0.8, 0],
        size: [2.2, 1.6, 1.2],
        color: '#4b5563',
        description: 'Protective bony structure around thoracic organs',
        clinicalNotes: [
          '12 pairs of ribs',
          'True ribs (1-7), false ribs (8-12)',
          'Intercostal spaces for chest tube insertion',
          'Flail chest: paradoxical movement'
        ]
      }
    ]
  }
];

export default function AnatomyViewer3D() {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const cameraRef = useRef<THREE.PerspectiveCamera>();
  const organMeshesRef = useRef<Map<string, THREE.Mesh>>(new Map());
  
  const [selectedSystem, setSelectedSystem] = useState<string>('cardiovascular');
  const [selectedOrgan, setSelectedOrgan] = useState<Organ | null>(null);
  const [isRotating, setIsRotating] = useState(true);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a0a);
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(5, 2, 5);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;
    mountRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 10, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0xffffff, 0.5, 100);
    pointLight.position.set(-10, 0, 0);
    scene.add(pointLight);

    // Create human body outline
    const bodyOutlineGeometry = new THREE.CylinderGeometry(0.8, 1, 3.5, 8);
    const bodyOutlineMaterial = new THREE.MeshBasicMaterial({
      color: 0x333333,
      wireframe: true,
      transparent: true,
      opacity: 0.2
    });
    const bodyOutline = new THREE.Mesh(bodyOutlineGeometry, bodyOutlineMaterial);
    bodyOutline.position.y = 0.5;
    scene.add(bodyOutline);

    // Create head outline
    const headGeometry = new THREE.SphereGeometry(0.6, 16, 12);
    const headMaterial = new THREE.MeshBasicMaterial({
      color: 0x333333,
      wireframe: true,
      transparent: true,
      opacity: 0.2
    });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.position.y = 2.8;
    scene.add(head);

    // Create organs for all systems
    organSystems.forEach(system => {
      system.organs.forEach(organ => {
        const geometry = new THREE.BoxGeometry(...organ.size);
        const material = new THREE.MeshLambertMaterial({
          color: organ.color,
          transparent: true,
          opacity: 0.8
        });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(...organ.position);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        mesh.userData = { organ, system: system.id };
        
        organMeshesRef.current.set(organ.id, mesh);
        scene.add(mesh);
      });
    });

    // Mouse interaction
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onMouseClick = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(Array.from(organMeshesRef.current.values()));

      if (intersects.length > 0) {
        const clickedMesh = intersects[0].object as THREE.Mesh;
        const organData = clickedMesh.userData.organ;
        setSelectedOrgan(organData);
        setSelectedSystem(clickedMesh.userData.system);
      }
    };

    renderer.domElement.addEventListener('click', onMouseClick);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      if (isRotating && cameraRef.current) {
        const time = Date.now() * 0.0005;
        cameraRef.current.position.x = Math.cos(time) * 6;
        cameraRef.current.position.z = Math.sin(time) * 6;
        cameraRef.current.lookAt(0, 0, 0);
      }

      // Highlight selected system organs
      organMeshesRef.current.forEach((mesh, organId) => {
        const material = mesh.material as THREE.MeshLambertMaterial;
        if (mesh.userData.system === selectedSystem) {
          material.opacity = 0.9;
          mesh.scale.setScalar(1.1);
        } else {
          material.opacity = 0.3;
          mesh.scale.setScalar(1.0);
        }
      });

      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      if (!mountRef.current) return;
      
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('click', onMouseClick);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [selectedSystem, isRotating]);

  const currentSystem = organSystems.find(s => s.id === selectedSystem);

  return (
    <div className="w-full h-full bg-gray-950 text-white">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
        {/* 3D Viewer */}
        <div className="lg:col-span-2">
          <Card className="h-full bg-gray-900 border-gray-800">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-white flex items-center gap-2">
                  <Heart className="h-6 w-6 text-red-500" />
                  3D Human Anatomy Viewer
                </CardTitle>
                <div className="flex gap-2">
                  <Button
                    variant={isRotating ? "default" : "outline"}
                    size="sm"
                    onClick={() => setIsRotating(!isRotating)}
                    className="text-xs"
                  >
                    {isRotating ? 'Stop Rotation' : 'Start Rotation'}
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div 
                ref={mountRef} 
                className="w-full h-96 lg:h-[600px] rounded-lg overflow-hidden"
                style={{ minHeight: '400px' }}
              />
            </CardContent>
          </Card>
        </div>

        {/* Control Panel */}
        <div className="space-y-6">
          {/* System Selection */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white text-lg">Body Systems</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                {organSystems.map((system) => {
                  const IconComponent = system.icon;
                  return (
                    <Button
                      key={system.id}
                      variant={selectedSystem === system.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedSystem(system.id)}
                      className="h-auto p-3 flex flex-col items-center gap-1 text-xs"
                    >
                      <IconComponent className="h-4 w-4" style={{ color: system.color }} />
                      <span className="text-center leading-tight">{system.name}</span>
                    </Button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* System Details */}
          {currentSystem && (
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <currentSystem.icon className="h-5 w-5" style={{ color: currentSystem.color }} />
                  {currentSystem.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {currentSystem.organs.map((organ) => (
                    <div
                      key={organ.id}
                      className={`p-3 rounded-lg border cursor-pointer transition-all ${
                        selectedOrgan?.id === organ.id
                          ? 'border-blue-500 bg-blue-950/20'
                          : 'border-gray-700 hover:border-gray-600'
                      }`}
                      onClick={() => setSelectedOrgan(organ)}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Badge style={{ backgroundColor: organ.color }} className="text-white">
                          {organ.name}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-300 mb-2">{organ.description}</p>
                      {selectedOrgan?.id === organ.id && (
                        <div className="space-y-2">
                          <h4 className="text-sm font-semibold text-white">Clinical Notes:</h4>
                          <ul className="space-y-1">
                            {organ.clinicalNotes.map((note, index) => (
                              <li key={index} className="text-xs text-gray-400 flex items-start gap-2">
                                <span className="text-yellow-500 mt-1">•</span>
                                {note}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Usage Instructions */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white text-sm">How to Use</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-xs text-gray-400">
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">•</span>
                  Click on body system buttons to highlight organs
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">•</span>
                  Click on organs in the 3D view to see details
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">•</span>
                  Toggle rotation for better viewing angles
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">•</span>
                  Clinical notes provide PLAB-relevant information
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}