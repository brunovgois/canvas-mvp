import { useState } from "react";

const useFetchData = (timeoutTime?: number) => {
  const [data, setData] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchImage = (url: string) => {
    setIsLoading(true)
    setTimeout(async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.blob();

        const imageUrl = URL.createObjectURL(data);
        setData(imageUrl)
        setIsLoading(false)

      } catch (error) {
        console.error('Error fetching image:', error);
        setIsLoading(false)
      }
    }, timeoutTime ?? 0)
  };

  return { data, isLoading, fetchImage };
}

export default useFetchData