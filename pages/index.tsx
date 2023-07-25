import { Canvas } from "@/components/Canvas";
import useFetchData from "@/hooks/useFetchData";

import CircleLoading from "@/assets/CircleLoading";
import Image from "next/image";

const Home = () => {
  const { data, isLoading, isError, fetchImage } = useFetchData(5000);

  return (
    <main
      className={`flex flex-col min-h-screen items-center p-24 pt-2 gap-4 bg-[#f1e7d4]`}
    >
      <h1 className="font-sans font-bold text-2xl drop-shadow-md text-black">
        Generate an image with your drawing!
      </h1>

      <div className="flex justify-between w-full">
        <div className="flex gap-4">
          <Canvas height={500} width={500} />
          <button
            disabled={isLoading}
            className="bg-[#2f4a43] font-sans h-fit self-center p-3 rounded-md text-white mx-6 mb-52 w-28"
            onClick={() => fetchImage("https://random.imagecdn.app/500/500")}
          >
            {isLoading ? "Generating" : "Generate"}
          </button>

          <div className="w-[500px] h-[500px] flex flex-col justify-center border border-orange-100 bg-gray-400">
            {isLoading ? (
              <CircleLoading className="h-4 w-4 animate-spin text-white mx-auto" />
            ) : data && !isError ? (
              <Image
                src={data}
                alt="Image generated from the drawing on the Canvas "
                width={500}
                height={500}
              />
            ) : null}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
