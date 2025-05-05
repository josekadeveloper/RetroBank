import "./animated-letters.scss";

const AnimatedLetters = ({
  strArray,
  idx,
}: {
  strArray: string[];
  idx: number;
}) => {
  return (
    <span>
      {strArray.map((char, i) => (
        <span key={char + i} className={`text-animate _${i + idx}`}>
          {char}
        </span>
      ))}
    </span>
  );
};

export default AnimatedLetters;
