

import React, { useRef, useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";

import scene from "../assets/3d/fox.glb?url";


export function Fox({ currentAnimation = "idle", ...props }) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF(scene);
  const { actions, names } = useAnimations(animations, group);

  useEffect(() => {
    if (!actions || !currentAnimation) return;

    // Optional: Debug available animation names
    console.log("Available animations:", names);

    // Fade out all current animations
    Object.values(actions).forEach((action) => {
      if (action.isRunning()) {
        action.fadeOut(0.2);
      }
    });

    // Play the new one with fade-in
    const newAction = actions[currentAnimation];
    if (newAction) {
      newAction.reset().fadeIn(0.4).play();
    }
  }, [actions, currentAnimation]);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name='Sketchfab_Scene'>
        <primitive object={nodes.GLTF_created_0_rootJoint} />
        <skinnedMesh
          geometry={nodes.Object_7.geometry}
          material={materials.PaletteMaterial001}
          skeleton={nodes.Object_7.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Object_8.geometry}
          material={materials.PaletteMaterial001}
          skeleton={nodes.Object_8.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Object_9.geometry}
          material={materials.PaletteMaterial001}
          skeleton={nodes.Object_9.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Object_10.geometry}
          material={materials.PaletteMaterial001}
          skeleton={nodes.Object_10.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Object_11.geometry}
          material={materials.PaletteMaterial001}
          skeleton={nodes.Object_11.skeleton}
        />
      </group>
    </group>
  );
}

useGLTF.preload(scene);
