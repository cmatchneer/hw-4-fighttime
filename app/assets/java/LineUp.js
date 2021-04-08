import Char from "./Char.js";
const Legolas = new Char(
  "Legolas",
  150,
  40,
  "assets/images/legolas.jpg",
  "assets/images/legolas_wins.gif",
  "assets/images/legolas_losses.gif",
  "assets/audio/legolas_ready.m4a",
  "assets/audio/legolas_win_round.wav",
  "assets/audio/legolas_lose.m4a",
  "assets/audio/legolas_wins.m4a"
);
const Gimli = new Char(
  "Gimli",
  280,
  40,
  "assets/images/gimli.jpg",
  "assets/images/gimli_wins.gif",
  "assets/images/gimli_losses.gif",
  "assets/audio/gimli_ready.m4a",
  "assets/audio/gimli_win_round.m4a",
  "assets/audio/gimli_lose.m4a",
  "assets/audio/gimli_wins.m4a"
);
const Aragorn = new Char(
  "Aragorn",
  250,
  35,
  "assets/images/aragorn.jpg",
  "assets/images/aragorn_wins.gif",
  "assets/images/aragorn_losses.gif",
  "assets/audio/aragorn_ready.mp3",
  "assets/audio/aragorn_win_round.m4a",
  "assets/audio/aragorn_loses.m4a",
  "assets/audio/aragorn_wins.m4a"
);
const Gandalf = new Char(
  "Gandalf",
  200,
  45,
  "assets/images/gandalf.jpg",
  "assets/images/gandalf_wins.gif",
  "assets/images/gandalf_losses.gif",
  "assets/audio/gandalf_ready.m4a",
  "assets/audio/gandalf_win_round.mp3",
  "assets/audio/gandalf_lose.m4a",
  "assets/audio/gandalf_win.mp3"
);
const list = { Legolas, Gimli, Aragorn, Gandalf };

export { list };
