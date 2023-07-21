import { useState } from "react";

type useFetchDataProps = {
  timeoutTime?: number
}

const useFetchData = ({ timeoutTime }: useFetchDataProps) => {
  const [data, setData] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchImage = async (url: string) => {
    let artificialTimeout
    setIsLoading(true)
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
  };


  return { data, isLoading, fetchImage };
}

export default useFetchData