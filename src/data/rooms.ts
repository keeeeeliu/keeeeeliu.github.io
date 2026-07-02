export type Room = {
  href: string;
  cls: string;
  icon: string;
  title: string;
  desc: string;
  swatches?: string[];
};

/** Homepage cards — left-to-right, top-to-bottom grid order. */
export const rooms: Room[] = [
  {
    href: "/bunnies",
    cls: "room-olive span-2",
    icon: "the bunnies",
    title: "Chris & Oliver",
    desc: "a living photo diary of the two of them",
    swatches: ["#D9B4AE", "#DDA030", "#EDE7D6"],
  },
  {
    href: "/sounds",
    cls: "room-mustard",
    icon: "sounds",
    title: "chocolates in sanya",
    desc: "a little listening room",
  },
  {
    href: "/making",
    cls: "room-terracotta",
    icon: "making",
    title: "things i've made",
    desc: "projects, experiments, and the process",
  },
  {
    href: "/words",
    cls: "room-cream",
    icon: "words",
    title: "essays & fragments",
    desc: "things I keep thinking about",
  },
  {
    href: "/collected",
    cls: "room-pink",
    icon: "collected",
    title: "things worth keeping",
    desc: "songs, books, excerpts — things I love, not mine",
  },
  {
    href: "/moments",
    cls: "room-brown span-3",
    icon: "moments",
    title: "a photo log",
    desc: "ordinary days, in no order",
    swatches: ["#DDA030", "#D9B4AE", "#F4EFE0"],
  },
];

export type RoomNavLink = {
  href: string;
  label: string;
};

export type RoomNav = {
  prev: RoomNavLink;
  next: RoomNavLink | null;
};

function normalizePath(pathname: string) {
  return pathname.replace(/\/$/, "") || "/";
}

/** Map a URL to its trail room (includes nested pages like /words/...). */
export function roomPathFor(pathname: string): string | null {
  const path = normalizePath(pathname);
  const match = rooms.find((r) => path === r.href || path.startsWith(`${r.href}/`));
  return match?.href ?? null;
}

export function getRoomNav(pathname: string): RoomNav | null {
  const roomPath = roomPathFor(pathname);
  if (!roomPath) return null;

  const index = rooms.findIndex((r) => r.href === roomPath);
  if (index === -1) return null;

  const prev =
    index === 0
      ? { href: "/", label: "home" }
      : { href: rooms[index - 1].href, label: rooms[index - 1].icon };

  const next = index < rooms.length - 1 ? { href: rooms[index + 1].href, label: rooms[index + 1].icon } : null;

  return { prev, next };
}
