export const DEFAULT_POMODORO_MINUTE = 1;
export const DEFAULT_POMODORO_SECOND = 6;
export const DEFAULT_SHORT_BREAK_MINUTE = 0;
export const DEFAULT_SHORT_BREAK_SECOND = 5;
export const DEFAULT_LONG_BREAK_MINUTE = 0;
export const DEFAULT_LONG_BREAK_SECOND = 10;

type Alarm = {
  id: string;
  name: string;
  src: string;
};

export const alarms: Alarm[] = [
  {
    id: "c84f98d7-93f0-49d2-8c58-752a767d2402",
    name: "Small gong",
    src: "/alarms/small-gong.mp3"
  },
  {
    id: "0e7cfb6a-87a5-4374-a3cc-2a1ecbb2ef73",
    name: "Large gong",
    src: "/alarms/large-gong.mp3"
  },
  {
    id: "e3b0c442-98fc-462d-a1e8-3bf0bb407ad5",
    name: "Birds chirping",
    src: "/alarms/birds-chirping.mp3"
  },
  {
    id: "d0f5c79b-7bfb-4d1c-9837-4a7ffab39175",
    name: "Game show winner",
    src: "/alarms/game-show-winner-bell.mp3"
  },
  {
    id: "4d92517f-e30b-4f19-9e84-0047d9c94d7e",
    name: "Hotel desk bell",
    src: "/alarms/hotel-desk-bell.mp3"
  },
  {
    id: "617bdd67-589f-4e27-94ad-d8d3994c1c29",
    name: "Police siren",
    src: "/alarms/police-siren.mp3"
  },
  {
    id: "89e2a07f-fc7d-4c56-bc5a-024d21bbfc57",
    name: "Train steam whistle",
    src: "/alarms/train-steam-whistle.mp3"
  }
];
