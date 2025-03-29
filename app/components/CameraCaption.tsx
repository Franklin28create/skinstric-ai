import { CameraSubtitles } from "@/constants";

const CameraCaption = () => {
  return (
    <section className="flex flex-col uppercase text-center gap-5 text-secondary font-light">
      <h1>To get better Results</h1>

      <div className="flex gap-4 max-sm:gap-8">
        {CameraSubtitles.map((item, i) => (
          <p key={i} className="flex gap-1 max-sm:text-sm max-sm:gap-3">
            <img src="/assets/radio-button.svg" alt="radio-button" />
            {item}
            </p>
        ))}
      </div>
    </section>
  );
};

export default CameraCaption;
