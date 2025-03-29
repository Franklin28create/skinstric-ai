import { NavigationArrowsTypes } from "@/types";

const NavigationArrows = ({
  handleLeftArrowClick,
  handleRightArrowClick,
  leftButtonText = "Proceed",
  isConfirmButton = false,
  setConfirmedDemographics,
}: NavigationArrowsTypes) => {
  return (
    <div
      className={`w-full flex justify-between ${
        isConfirmButton ? "px-8 items-center max-sm:bg-primary-200 max-sm:py-2 max-sm:rounded-xl max-sm:flex-col max-sm:gap-2" : "px-4 absolute bottom-2 z-50 left-0"
      }`}
    >
      <button className="intro_btn" onClick={handleLeftArrowClick}>
        <img src="/assets/arrow-left.svg" alt="arrow" />
        Back
      </button>

      {isConfirmButton ? (
        <>
          <p className="text-primary-300 font-light max-md:hidden">
            If A.I. estimate is wrong, select the correct one.
          </p>

          <div className="flex gap-2">
            <button
              className="reset_btn"
              onClick={() =>
                // @ts-ignore
                setConfirmedDemographics({
                  race: false,
                  gender: false,
                  age: false,
                })
              }
            >
              Reset
            </button>
            <button className="confirm_btn" onClick={handleRightArrowClick}>
              Confirm
            </button>
          </div>
        </>
      ) : (
        <button
          className="intro_btn opacity-0"
          id="proceed_btn"
          onClick={handleRightArrowClick}
        >
          {leftButtonText}
          <img src="/assets/arrow-right.svg" alt="arrow" />
        </button>
      )}
    </div>
  );
};

export default NavigationArrows;
