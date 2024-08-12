import { useEffect, useState } from "react";
import { Button } from "./styles";
import { FaArrowAltCircleUp } from "react-icons/fa";

export function ScrollButton(props: {visibilityTreshold: number}): JSX.Element {
  const [visibility, setVisibility] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => setVisibility(document.documentElement.scrollTop > props.visibilityTreshold));
  }, []);

  return (
    <Button>
      <FaArrowAltCircleUp onClick={() =>
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        })
      }
      style={{ display: visibility ? 'inline' : 'none' }} />
    </Button>
  );
}