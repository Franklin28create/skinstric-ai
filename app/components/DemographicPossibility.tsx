import { DemographicPossibilityProps } from "@/types";

const DemographicPossibility = ({
  demographic,
  value,
  currentDemographic,
  selectedDemographics,
  confirmedDemographics,
  setSelectedDemographics,
}: DemographicPossibilityProps) => {
  return (
    <button
    // @ts-ignore
      disabled={confirmedDemographics[currentDemographic]}
      className={`flex px-2 justify-between cursor-pointer items-center ${
        Object.keys(selectedDemographics[currentDemographic])[0] === demographic
          ? "bg-secondary text-white"
          : "hover:bg-primary-300 transition-colors duration-300"
      }`}
      onClick={() => {
        if (
          Object.keys(selectedDemographics[currentDemographic])[0] !==
          demographic
        ) {
          setSelectedDemographics({
            ...selectedDemographics,
            [currentDemographic]: {
              [demographic]: value,
            },
          });
        }
      }}
    >
      <h2 className="flex gap-2 py-2">
        <img
          src={
            Object.keys(selectedDemographics[currentDemographic])[0] ===
            demographic
              ? "/assets/radio-button_selected.svg"
              : "/assets/radio-button.svg"
          }
          alt=""
        />
        <span className="capitalize">{demographic}</span>
      </h2>

      <p>{value as number} %</p>
    </button>
  );
};

export default DemographicPossibility;
