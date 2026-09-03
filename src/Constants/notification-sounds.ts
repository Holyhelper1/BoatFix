import brightRingUrl from "../assets/sounds/bright-clear-ringing-short-notification-sound.mp3";
import incomingMessageUrl from "../assets/sounds/incoming-message-notification.mp3";
import passedLevelUrl from "../assets/sounds/passed-level-in-a-computer-game.mp3";
import pykUrl from "../assets/sounds/pyk-toon-n-n.mp3";
import receivedMailUrl from "../assets/sounds/received-mail-notification.mp3";
import ringtoneSmsUrl from "../assets/sounds/ringtone-sms-notification.mp3";
import spaceUrl from "../assets/sounds/space-notification-sound.mp3";

export const NOTIFICATION_SOUNDS = [
  { id: "space", label: "Пространство", src: spaceUrl },
  { id: "level", label: "Уровень пройден", src: passedLevelUrl },
  { id: "bright-ring", label: "Чёткий звонок", src: brightRingUrl },
  { id: "sms", label: "SMS-мелодия", src: ringtoneSmsUrl },
  { id: "pyk", label: "Пык", src: pykUrl },
  { id: "mail", label: "Входящая почта", src: receivedMailUrl },
  { id: "message", label: "Входящее сообщение", src: incomingMessageUrl },
] as const;

export type NotificationSoundId = (typeof NOTIFICATION_SOUNDS)[number]["id"];

export type NotificationSoundOption = "none" | NotificationSoundId;

export const NO_SOUND_OPTION: NotificationSoundOption = "none";

export const DEFAULT_SOUND_ID: NotificationSoundOption = "none";
