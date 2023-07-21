import { Canvas } from "@/components/Canvas";
import useFetchData from "@/hooks/useFetchData";

import CircleLoading from "@/assets/CircleLoading";
import Image from "next/image";

const Home = () => {
  const { data, isLoading, fetchImage } = useFetchData(5000);

  return (
    <main className={`flex flex-col min-h-screen items-center p-24 gap-4`}>
      <h1>Generate an Image with your drawing!</h1>

      <div className="flex justify-around w-full">
        <div className="flex gap-4">
          <Canvas height={500} width={500} />
          <button
            disabled={isLoading}
            className="bg-red-200 h-fit self-center p-3 rounded-md text-white"
            onClick={() => fetchImage("https://random.imagecdn.app/500/500")}
          >
            Generate
          </button>
        </div>

        <div className="w-[500px] h-[500px] border border-red-200 flex flex-col justify-center ">
          {isLoading ? (
            <CircleLoading className="h-4 w-4 animate-spin text-pink-400 mx-auto" />
          ) : data ? (
            <Image
              src={data}
              alt="Image generated from the drawing on the Canvas "
              width={500}
              height={500}
            />
          ) : null} {/* TODO: couldn't make request - Error message */}
        </div>
      </div>
    </main>
  );
};

export default Home;
