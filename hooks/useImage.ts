import { useContext } from "react";
import ImagesContext from "context/ImagesContext";
import DataMapContext from "context/DataMapContext";

export default function useImage(src: {
  normal: string;
  full: string | undefined;
}) {
  const images = useContext(ImagesContext);
  const data = useContext(DataMapContext);

  if (data?.addImage) {
    data.addImage(src);
    return { ignore: true };
  }

  return { data: images ? images[src.normal] : undefined };
}
