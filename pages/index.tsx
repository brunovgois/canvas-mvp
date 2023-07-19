import { Canvas } from "@/components/Canvas";

const Home = () => {
  return (
    <main
      className={`flex min-h-screen items-center justify-between p-24`}
    >
      <Canvas height={600} width={600} />

      <div>
        imagem gerada
      </div>

    </main>
  )
}

export default Home