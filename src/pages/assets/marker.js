import Image from "next/image";
import image from "./Marker.png";

export default function Marker() {
  return <Image src={image} height={70} width={50}></Image>;
}
