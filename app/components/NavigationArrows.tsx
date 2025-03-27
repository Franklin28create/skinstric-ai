const NavigationArrows = ({
  handleLeftArrowClick,
  handleRightArrowClick,
  leftButtonText = "Proceed",
}: {
  handleLeftArrowClick: () => void;
  handleRightArrowClick?: () => void;
  leftButtonText?: string;
}) => {
  // TODO: ADD TYPE TO INDEX.D.TS

  return (
    <div className="w-full flex justify-between">
      <h1 className="intro_btn" onClick={handleLeftArrowClick}>
        <img src="/assets/arrow-left.svg" alt="arrow" />
        Back
      </h1>

      <h1
        className="intro_btn opacity-0"
        id="proceed_btn"
        onClick={handleRightArrowClick}
      >
        {leftButtonText}
        <img src="/assets/arrow-right.svg" alt="arrow" />
      </h1>
    </div>
  );
};

export default NavigationArrows;
