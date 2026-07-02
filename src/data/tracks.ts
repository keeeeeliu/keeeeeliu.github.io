export type Track = {
  title: string;
  src: string;
  tag: string;
  duration: string;
};

/** The listening room. Order here is the order everywhere. */
export const tracks: Track[] = [
  { title: "chocolates in sanya", src: "/music/chocolates-in-sanya.wav", tag: "lo-fi", duration: "2:30" },
  { title: "mission", src: "/music/mission-2-17.wav", tag: "cinematic", duration: "2:17" },
  { title: "like dream, like illusion", src: "/music/like-dream-like-illusion.wav", tag: "dreamy", duration: "3:19" },
  { title: "meet me at the next corner", src: "/music/meet-me-at-the-next-corner3-16.wav", tag: "mellow", duration: "3:16" },
  { title: "mirror", src: "/music/mirror-3-07.wav", tag: "ambient", duration: "3:08" },
  { title: "LYMLY", src: "/music/LYMLY-2-34.wav", tag: "pop", duration: "2:35" },
  { title: "liar", src: "/music/liar.wav", tag: "moody", duration: "2:17" },
];
