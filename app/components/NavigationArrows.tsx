import { NavigationArrowsTypes } from "@/types";

const NavigationArrows = ({
  handleLeftArrowClick,
  handleRightArrowClick,
  leftButtonText = "Proceed",
}: NavigationArrowsTypes) => {
  return (
    <div className="w-full flex justify-between">
      <button className="intro_btn" onClick={handleLeftArrowClick}>
        <img src="/assets/arrow-left.svg" alt="arrow" />
        Back
      </button>

      <button
        className="intro_btn opacity-0"
        id="proceed_btn"
        onClick={handleRightArrowClick}
      >
        {leftButtonText}
        <img src="/assets/arrow-right.svg" alt="arrow" />
      </button>
    </div>
  );
};

export default NavigationArrows;
