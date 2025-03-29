const CameraButtons = ({
  isPictureTaken,
  handleBackClick,
  handleProceedClick,
}: {
  isPictureTaken: boolean;
  handleBackClick: () => void;
  handleProceedClick: () => void;
}) => {
  return (
    <div className="max-w-8xl text-white px-8 absolute bottom-5 w-full flex justify-between z-10">
      <button
        className="flex items-center gap-4 uppercase font-light cursor-pointer"
        onClick={handleBackClick}
      >
        <img src="/assets/arrow-left.svg" alt="arrow-left" className="invert" />
        {isPictureTaken && <p className="camera_btn">back</p>}
      </button>
      <button className="flex items-center gap-4 uppercase font-light camera_btn cursor-pointer"
      onClick={handleProceedClick}
      >
        Proceed
        <img src="/assets/arrow-right.svg" alt="" className={`invert`} />
      </button>
    </div>
  );
};

export default CameraButtons;
