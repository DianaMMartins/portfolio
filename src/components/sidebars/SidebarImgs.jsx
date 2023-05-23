import images from "../../data/sidebar-images.json";
import left from "../../data/images/leftSidebar/profileL.png";
import right from "../../data/images/rightSidebar/profileR.png";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const SidebarImages = ({ side }) => {
  const currentPath = useLocation().pathname;
  const imagesObject = images.find((object) => object.path === currentPath);
  const imagesArray = imagesObject ? imagesObject[side] : null;
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  let pastImageIndex = selectedImageIndex === 0 ? imagesArray.length - 1 : 0;

  console.log(pastImageIndex, selectedImageIndex);

  useEffect(() => {
    if (imagesArray && imagesArray.length > 1) {
      const intervalId = setInterval(() => {
        pastImageIndex = selectedImageIndex;

        const nextIndex = selectedImageIndex + 1;
        const validatedNextIndex =
          nextIndex < imagesArray.length ? nextIndex : 0;
        setSelectedImageIndex(validatedNextIndex);
        clearInterval(intervalId);
      }, 10000);
    }
  }, [currentPath, imagesArray, selectedImageIndex]);

  return (
    <section className="sidebar-images">
      {imagesArray === null ? (
        <img src={side === "left" ? left : right} alt={side} />
      ) : imagesArray.length > 1 ? (
        <section>
          <img
            src={require(`../../data/images${imagesArray[pastImageIndex]}`)}
            alt={currentPath}
            className="absolute"
            id="img1"
          />
          <img
            src={require(`../../data/images${imagesArray[selectedImageIndex]}`)}
            alt={currentPath}
            // trigger re-render component to restart animation
            // https://stackoverflow.com/questions/63186710/how-to-trigger-a-css-animation-on-every-time-a-react-component-re-renders
            key={selectedImageIndex}
            className="fadeInAnimation"
            id="img2"
          />
        </section>
      ) : (
        <img
          src={require(`../../data/images${imagesArray[0]}`)}
          alt={currentPath}
          id="img1"
        />
      )}
    </section>
  );
};
