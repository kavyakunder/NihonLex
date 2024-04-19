import { TextRevealCard } from "./component/ui/text-reveal-card";
export function TextRevealCardPreview({ text, revealText }) {
  return (
    <div className="flex items-center justify-center rounded-2xl w-full">
      <TextRevealCard text={text} revealText={revealText}></TextRevealCard>
    </div>
  );
}
