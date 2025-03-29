import { DemographicsOptions } from "@/types";

const DemographicOptionsButton = ({
  option,
  confirmedDemographics,
  currentDemographic,
  userDemographics,
  setCurrentDemographic,
  selectedDemographics,
}: DemographicsOptions) => {
  return (
    <button
      disabled={confirmedDemographics[option]}
      className={`h-[104px] p-2 flex justify-between items-start flex-col ${
        currentDemographic === option
          ? "bg-secondary text-white"
          : "bg-primary-150 hover:bg-primary-300 border-t-2"
      } transition-colors duration-400`}
      onClick={() => {
        if (currentDemographic !== option)
            // @ts-ignore
          setCurrentDemographic(option);
      }}
    >
      <div>
        {Object.keys(userDemographics).length > 0 ? (
          <h1 className="capitalize">
            {Object.keys(selectedDemographics[option])}
          </h1>
        ) : (
          <h1>Loading...</h1>
        )}
      </div>

      <h1 className="uppercase font-light">{option}</h1>
    </button>
  );
};

export default DemographicOptionsButton;
