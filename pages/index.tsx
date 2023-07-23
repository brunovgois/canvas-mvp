import { Canvas } from "@/components/Canvas";
import useFetchData from "@/hooks/useFetchData";

import CircleLoading from "@/assets/CircleLoading";
import Image from "next/image";

const Home = () => {
  const { data, isLoading, isError, fetchImage } = useFetchData(5000);

  return (
    <main className={`flex flex-col min-h-screen items-center p-24 gap-4`}>
      <h1 className="font-sans">Generate an image with your drawing!</h1>

      <div className="flex justify-between w-full">
        <div className="flex gap-4">
          <Canvas height={500} width={500} />
          <button
            disabled={isLoading}
            className="bg-red-200 font-sans h-fit self-center p-3 rounded-md text-white mx-6"
            onClick={() => fetchImage("https://random.imagecdn.app/500/500")}
          >
            {isLoading ? "Generating" : "Generate"}
          </button>

          <div className="w-[500px] h-[500px] flex flex-col justify-center">
            {isLoading ? (
              <CircleLoading className="h-4 w-4 animate-spin text-pink-400 mx-auto" />
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
