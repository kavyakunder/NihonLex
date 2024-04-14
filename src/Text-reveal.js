import {
  TextRevealCard,
  TextRevealCardTitle,
  TextRevealCardDescription,
} from "./component/ui/text-reveal-card";
export function TextRevealCardPreview({ mouseEnter, text, revealText }) {
  console.log("mouseneter", mouseEnter);
  return (
    <div className="flex items-center justify-center rounded-2xl w-full">
      <TextRevealCard
        text={text}
        revealText={revealText}
        mouseEnter={mouseEnter}
        // text="You know the business"
        // revealText="I know the chemistry "
      >
        {/* <TextRevealCardTitle>
          Sometimes, you just need to see it.
        </TextRevealCardTitle> */}
        {/* <TextRevealCardDescription>
          This is a text reveal card. Hover over the card to reveal the hidden
          text. */}
        {/* </TextRevealCardDescription> */}
      </TextRevealCard>
    </div>
  );
}
