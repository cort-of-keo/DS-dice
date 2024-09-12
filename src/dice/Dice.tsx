import React from "react";
import { Die } from "../types/Die";
import * as THREE from "three";

import { DiceMesh } from "../meshes/DiceMesh";
import { DiceMaterial } from "../materials/DiceMaterial";

type DiceProps = JSX.IntrinsicElements["group"] & { die: Die };

export const Dice = React.forwardRef<THREE.Group, DiceProps>(
  ({ die, children, ...props }, ref) => {
    return (
      <DiceMesh
        diceType={die.type}
        {...props}
        ref={ref}
      >
        <DiceMaterial diceStyle={die.style} />
        {children}
      </DiceMesh>
    );
  }
);
