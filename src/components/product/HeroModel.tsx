import { toMediaUrl } from "@/lib/utils";

interface IProps {
  modelSrc: string;
}

export default function HeroModel({ modelSrc }: IProps) {
  return (
    <section className="h-[calc(100vh-4rem)] w-full bg-black">
      {/* <ModelViewer src="/models/qj.glb" /> */}
      <div className="mx-auto h-full xl:container">
        <video
          className="h-full w-full"
          src={toMediaUrl(modelSrc)}
          autoPlay
          loop
          muted
          preload="metadata"
          playsInline
        ></video>
      </div>
    </section>
  );
}
