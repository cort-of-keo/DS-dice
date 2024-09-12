import { useTexture } from "@react-three/drei";

import albedo from "./albedo-d3.jpg";
import orm from "./orm-d3.jpg";
import normal from "./normal-d3.jpg";
import { gltfTexture } from "../../helpers/gltfTexture";

export function Dsd3Material(
  props: JSX.IntrinsicElements["meshPhysicalMaterial"]
) {
  const [albedoMap, ormMap, normalMap] = useTexture(
    [albedo, orm, normal],
    (textures) => gltfTexture(textures, ["SRGB", "LINEAR", "LINEAR"])
  );

  return (
    <meshPhysicalMaterial
      map={albedoMap}
      aoMap={ormMap}
      metalnessMap={ormMap}
      roughnessMap={ormMap}
      normalMap={normalMap}
      clearcoat={1}
      clearcoatRoughness={0.3}
      {...props}
    />
  );
}
