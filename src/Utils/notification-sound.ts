import {
  DEFAULT_SOUND_ID,
  NOTIFICATION_SOUNDS,
  type NotificationSoundOption,
} from "../Constants/notification-sounds";

const SOUND_STORAGE_KEY = "boatfix_notification_sound";

const getSoundSrc = (id: NotificationSoundOption): string | null => {
  if (id === DEFAULT_SOUND_ID) return null;
  return NOTIFICATION_SOUNDS.find((sound) => sound.id === id)?.src ?? null;
};

export const getSavedSoundId = (): NotificationSoundOption => {
  const saved = localStorage.getItem(SOUND_STORAGE_KEY);
  if (saved === null) return DEFAULT_SOUND_ID;
  const isKnownSound = NOTIFICATION_SOUNDS.some((sound) => sound.id === saved);
  return isKnownSound ? (saved as NotificationSoundOption) : DEFAULT_SOUND_ID;
};

export const saveSoundId = (id: NotificationSoundOption): void => {
  localStorage.setItem(SOUND_STORAGE_KEY, id);
};

const playAudio = (src: string) => {
  const audio = new Audio(src);
  audio.onended = () => {
    audio.src = "";
  };
  void audio.play().catch(() => {
    audio.src = "";
  });
};

export const playNotificationSound = (id: NotificationSoundOption): void => {
  const src = getSoundSrc(id);
  if (src === null) return;
  playAudio(src);
};
