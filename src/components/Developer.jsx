import React, { useEffect, useRef, useMemo, useCallback } from 'react';
import { useGraph } from '@react-three/fiber';
import { useAnimations, useFBX, useGLTF } from '@react-three/drei';
import { SkeletonUtils } from 'three-stdlib';

// Animation configuration
const ANIMATION_CONFIG = {
  fadeTime: 0.5,
  defaultAnimation: 'idle',
  animations: ['idle', 'salute', 'clapping', 'victory']
};

// Asset paths
const getAssetPath = (filename) => `${import.meta.env.BASE_URL}3d/${filename}`;

const Developer = ({ 
  animationName = ANIMATION_CONFIG.defaultAnimation, 
  scale = [3, 3, 3],
  showDebug = false,
  onAnimationChange,
  ...props 
}) => {
  const group = useRef();
  const currentAnimation = useRef(animationName);

  // Load GLB model with error handling
  const { scene, error: modelError } = useGLTF(getAssetPath('developer.glb'));
  
  // Clone scene for independent instances
  const clone = useMemo(() => {
    if (!scene) return null;
    try {
      return SkeletonUtils.clone(scene);
    } catch (error) {
      console.error('Error cloning scene:', error);
      return null;
    }
  }, [scene]);

  const { nodes, materials } = useGraph(clone || {});

  // Load FBX animations with error handling
  const animationFiles = useMemo(() => {
    const files = {};
    ANIMATION_CONFIG.animations.forEach(name => {
      try {
        files[name] = useFBX(getAssetPath(`${name}.fbx`));
      } catch (error) {
        console.error(`Error loading ${name} animation:`, error);
      }
    });
    return files;
  }, []);

  // Process animations
  const animations = useMemo(() => {
    const processedAnimations = [];
    
    Object.entries(animationFiles).forEach(([name, fbx]) => {
      if (fbx?.animations?.[0]) {
        fbx.animations[0].name = name;
        processedAnimations.push(fbx.animations[0]);
      }
    });
    
    return processedAnimations;
  }, [animationFiles]);

  const { actions, mixer } = useAnimations(animations, group);

  // Animation switching logic
  const switchAnimation = useCallback((newAnimationName) => {
    if (!actions || !newAnimationName) return;

    const targetAction = actions[newAnimationName] || actions[ANIMATION_CONFIG.defaultAnimation];
    if (!targetAction) return;

    // Stop all current animations
    Object.values(actions).forEach(action => {
      if (action.isRunning()) {
        action.fadeOut(ANIMATION_CONFIG.fadeTime);
      }
    });

    // Start new animation
    targetAction.reset().fadeIn(ANIMATION_CONFIG.fadeTime).play();
    currentAnimation.current = newAnimationName;

    // Callback for animation change
    onAnimationChange?.(newAnimationName);
  }, [actions, onAnimationChange]);

  // Handle animation changes
  useEffect(() => {
    if (animationName !== currentAnimation.current) {
      switchAnimation(animationName);
    }
  }, [animationName, switchAnimation]);

  // Initial animation setup
  useEffect(() => {
    if (actions && Object.keys(actions).length > 0) {
      switchAnimation(animationName);
    }
  }, [actions, animationName, switchAnimation]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (mixer) {
        mixer.stopAllAction();
      }
    };
  }, [mixer]);

  // Error handling
  if (modelError) {
    console.error('Failed to load developer model:', modelError);
    return null;
  }

  if (!clone || !nodes) {
    return null; // Loading state - you might want to add a loading spinner here
  }

  // Render body parts
  const renderBodyPart = (nodeName, materialName, additionalProps = {}) => {
    const node = nodes[nodeName];
    const material = materials[materialName];
    
    if (!node || !material) return null;

    return (
      <skinnedMesh
        key={nodeName}
        geometry={node.geometry}
        material={material}
        skeleton={node.skeleton}
        morphTargetDictionary={node.morphTargetDictionary}
        morphTargetInfluences={node.morphTargetInfluences}
        {...additionalProps}
      />
    );
  };

  return (
    <group ref={group} scale={scale} {...props} dispose={null}>
      {/* Debug indicator */}
      {(showDebug || process.env.NODE_ENV === 'development') && (
        <mesh position={[0, 3, 0]} scale={0.1}>
          <sphereGeometry args={[1, 8, 8]} />
          <meshBasicMaterial 
            color={actions && actions[animationName] ? '#00ff00' : '#ff0000'} 
          />
        </mesh>
      )}

      {/* Skeleton root */}
      {nodes.Hips && <primitive object={nodes.Hips} />}

      {/* Body parts */}
      {renderBodyPart('Wolf3D_Hair', 'Wolf3D_Hair')}
      {renderBodyPart('Wolf3D_Glasses', 'Wolf3D_Glasses')}
      {renderBodyPart('Wolf3D_Body', 'Wolf3D_Body')}
      {renderBodyPart('Wolf3D_Outfit_Bottom', 'Wolf3D_Outfit_Bottom')}
      {renderBodyPart('Wolf3D_Outfit_Footwear', 'Wolf3D_Outfit_Footwear')}
      {renderBodyPart('Wolf3D_Outfit_Top', 'Wolf3D_Outfit_Top')}
      {renderBodyPart('EyeLeft', 'Wolf3D_Eye')}
      {renderBodyPart('EyeRight', 'Wolf3D_Eye')}
      {renderBodyPart('Wolf3D_Head', 'Wolf3D_Skin')}
      {renderBodyPart('Wolf3D_Teeth', 'Wolf3D_Teeth')}
    </group>
  );
};

// Preload assets
useGLTF.preload(getAssetPath('developer.glb'));
ANIMATION_CONFIG.animations.forEach(name => {
  useFBX.preload(getAssetPath(`${name}.fbx`));
});

export default Developer;