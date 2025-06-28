import React, { useEffect, useRef, useState } from 'react';
import { useGraph } from '@react-three/fiber';
import { useAnimations, useFBX, useGLTF } from '@react-three/drei';
import { SkeletonUtils } from 'three-stdlib';

const Developer = ({ animationName = 'idle', ...props }) => {
  const group = useRef();
  const [animationsLoaded, setAnimationsLoaded] = useState(false);
  const [availableAnimations, setAvailableAnimations] = useState({});

  // Load the main model
  const { scene } = useGLTF('/3d/developer.glb');
  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes, materials } = useGraph(clone);

  // Load animations with individual error handling
  const loadAnimations = () => {
    const animations = {};
    
    try {
      const { animations: idle } = useFBX('/3d/idle.fbx');
      if (idle && idle[0]) {
        idle[0].name = 'idle';
        animations.idle = idle[0];
      }
    } catch (error) {
      console.warn('Failed to load idle animation:', error);
    }

    try {
      const { animations: salute } = useFBX('/3d/salute.fbx');
      if (salute && salute[0]) {
        salute[0].name = 'salute';
        animations.salute = salute[0];
      }
    } catch (error) {
      console.warn('Failed to load salute animation:', error);
    }

    try {
      const { animations: clapping } = useFBX('/3d/clapping.fbx');
      if (clapping && clapping[0]) {
        clapping[0].name = 'clapping';
        animations.clapping = clapping[0];
      }
    } catch (error) {
      console.warn('Failed to load clapping animation:', error);
    }

    try {
      const { animations: victory } = useFBX('/3d/victory.fbx');
      if (victory && victory[0]) {
        victory[0].name = 'victory';
        animations.victory = victory[0];
      }
    } catch (error) {
      console.warn('Failed to load victory animation:', error);
    }

    return animations;
  };

  // Get all available animations
  const animations = loadAnimations();
  const animationArray = Object.values(animations).filter(Boolean);
  
  // Use animations hook only with successfully loaded animations
  const { actions } = useAnimations(animationArray, group);

  // Update available animations state
  useEffect(() => {
    setAvailableAnimations(animations);
    setAnimationsLoaded(animationArray.length > 0);
  }, []);

  // Handle animation changes
  useEffect(() => {
    if (!actions || Object.keys(actions).length === 0) {
      console.log('No animations available yet');
      return;
    }

    // Stop all current animations
    Object.values(actions).forEach(action => {
      if (action && typeof action.stop === 'function') {
        try {
          action.stop();
        } catch (error) {
          console.warn('Error stopping animation:', error);
        }
      }
    });

    // Try to play the requested animation
    const targetAction = actions[animationName];
    
    if (targetAction && typeof targetAction.play === 'function') {
      try {
        targetAction.reset().fadeIn(0.5).play();
        console.log(`Playing animation: ${animationName}`);
        
        return () => {
          try {
            if (targetAction && typeof targetAction.fadeOut === 'function') {
              targetAction.fadeOut(0.5);
            }
          } catch (error) {
            console.warn('Error fading out animation:', error);
          }
        };
      } catch (error) {
        console.warn(`Error playing animation "${animationName}":`, error);
        
        // Fallback to idle if available
        const idleAction = actions['idle'];
        if (idleAction && animationName !== 'idle') {
          try {
            idleAction.reset().fadeIn(0.5).play();
            console.log('Falling back to idle animation');
            
            return () => {
              try {
                if (idleAction && typeof idleAction.fadeOut === 'function') {
                  idleAction.fadeOut(0.5);
                }
              } catch (error) {
                console.warn('Error fading out idle animation:', error);
              }
            };
          } catch (fallbackError) {
            console.warn('Error playing fallback idle animation:', fallbackError);
          }
        }
      }
    } else {
      console.warn(`Animation "${animationName}" not found. Available:`, Object.keys(actions));
      
      // Try to play idle as ultimate fallback
      const idleAction = actions['idle'];
      if (idleAction && animationName !== 'idle') {
        try {
          idleAction.reset().fadeIn(0.5).play();
          console.log('Using idle as fallback animation');
          
          return () => {
            try {
              if (idleAction && typeof idleAction.fadeOut === 'function') {
                idleAction.fadeOut(0.5);
              }
            } catch (error) {
              console.warn('Error fading out fallback animation:', error);
            }
          };
        } catch (error) {
          console.warn('Error playing fallback animation:', error);
        }
      }
    }
  }, [animationName, actions, animationsLoaded]);

  // Debug: Log available animations
  useEffect(() => {
    if (actions && Object.keys(actions).length > 0) {
      console.log('Available animations:', Object.keys(actions));
    }
  }, [actions]);

  return (
    <group ref={group} {...props} dispose={null}>
      {/* Status indicator for debugging */}
      {process.env.NODE_ENV === 'development' && (
        <mesh position={[0, 3, 0]} scale={0.1}>
          <sphereGeometry args={[1, 8, 8]} />
          <meshBasicMaterial color={animationsLoaded ? '#00ff00' : '#ff0000'} />
        </mesh>
      )}
      
      {nodes.Hips && <primitive object={nodes.Hips} />}
      
      {nodes.Wolf3D_Hair && (
        <skinnedMesh
          geometry={nodes.Wolf3D_Hair.geometry}
          material={materials.Wolf3D_Hair}
          skeleton={nodes.Wolf3D_Hair.skeleton}
        />
      )}
      
      {nodes.Wolf3D_Glasses && (
        <skinnedMesh
          geometry={nodes.Wolf3D_Glasses.geometry}
          material={materials.Wolf3D_Glasses}
          skeleton={nodes.Wolf3D_Glasses.skeleton}
        />
      )}
      
      {nodes.Wolf3D_Body && (
        <skinnedMesh
          geometry={nodes.Wolf3D_Body.geometry}
          material={materials.Wolf3D_Body}
          skeleton={nodes.Wolf3D_Body.skeleton}
        />
      )}
      
      {nodes.Wolf3D_Outfit_Bottom && (
        <skinnedMesh
          geometry={nodes.Wolf3D_Outfit_Bottom.geometry}
          material={materials.Wolf3D_Outfit_Bottom}
          skeleton={nodes.Wolf3D_Outfit_Bottom.skeleton}
        />
      )}
      
      {nodes.Wolf3D_Outfit_Footwear && (
        <skinnedMesh
          geometry={nodes.Wolf3D_Outfit_Footwear.geometry}
          material={materials.Wolf3D_Outfit_Footwear}
          skeleton={nodes.Wolf3D_Outfit_Footwear.skeleton}
        />
      )}
      
      {nodes.Wolf3D_Outfit_Top && (
        <skinnedMesh
          geometry={nodes.Wolf3D_Outfit_Top.geometry}
          material={materials.Wolf3D_Outfit_Top}
          skeleton={nodes.Wolf3D_Outfit_Top.skeleton}
        />
      )}
      
      {nodes.EyeLeft && (
        <skinnedMesh
          name="EyeLeft"
          geometry={nodes.EyeLeft.geometry}
          material={materials.Wolf3D_Eye}
          skeleton={nodes.EyeLeft.skeleton}
          morphTargetDictionary={nodes.EyeLeft.morphTargetDictionary}
          morphTargetInfluences={nodes.EyeLeft.morphTargetInfluences}
        />
      )}
      
      {nodes.EyeRight && (
        <skinnedMesh
          name="EyeRight"
          geometry={nodes.EyeRight.geometry}
          material={materials.Wolf3D_Eye}
          skeleton={nodes.EyeRight.skeleton}
          morphTargetDictionary={nodes.EyeRight.morphTargetDictionary}
          morphTargetInfluences={nodes.EyeRight.morphTargetInfluences}
        />
      )}
      
      {nodes.Wolf3D_Head && (
        <skinnedMesh
          name="Wolf3D_Head"
          geometry={nodes.Wolf3D_Head.geometry}
          material={materials.Wolf3D_Skin}
          skeleton={nodes.Wolf3D_Head.skeleton}
          morphTargetDictionary={nodes.Wolf3D_Head.morphTargetDictionary}
          morphTargetInfluences={nodes.Wolf3D_Head.morphTargetInfluences}
        />
      )}
      
      {nodes.Wolf3D_Teeth && (
        <skinnedMesh
          name="Wolf3D_Teeth"
          geometry={nodes.Wolf3D_Teeth.geometry}
          material={materials.Wolf3D_Teeth}
          skeleton={nodes.Wolf3D_Teeth.skeleton}
          morphTargetDictionary={nodes.Wolf3D_Teeth.morphTargetDictionary}
          morphTargetInfluences={nodes.Wolf3D_Teeth.morphTargetInfluences}
        />
      )}
    </group>
  );
};

// Preload the model
useGLTF.preload('/3d/developer.glb');

export default Developer;
