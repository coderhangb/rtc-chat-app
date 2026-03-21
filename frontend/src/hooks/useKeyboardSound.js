const keySounds = [
  new Audio("../../sound/keystroke1.mp3"),
  new Audio("../../sound/keystroke2.mp3"),
  new Audio("../../sound/keystroke3.mp3"),
  new Audio("../../sound/keystroke4.mp3"),
];

function useKeyboardSound() {
  const playRandom = () => {
    const audio = keySounds[Math.floor(Math.random() * keySounds.length)];
    audio.currentTime = 0;
    audio.play().catch((error) => console.log("Fail to play audio", error));
  };

  return { playRandom };
}

export default useKeyboardSound;
