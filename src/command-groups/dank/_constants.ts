import { APIEmbed } from "discord.js";
import { generateCommandList } from "./generateCommandList";

export type SubCommand = {
  title: string;
  description: string;
  reply: string | { embeds: APIEmbed[] };
};

const LEBOWSKI_GIFS = [
  "https://i.giphy.com/media/dsRMAQaWlNWgny7nga/giphy.webp",
  "https://media.tenor.com/J_fLDxHnwZEAAAAM/the-dude-lebowski.gif",
  "https://media.tenor.com/CDPuQi4b_S0AAAAd/the-big-lebowski-coen-brothers.gif",
  "https://64.media.tumblr.com/c763c578790531922b87fce7af853c82/3228a5b2fe5aa920-f4/s400x600/da687064762a7398bee8148cfd87ee4ce02688fd.gif",
  "https://i.giphy.com/media/If06XcAqynYH8QEP9S/giphy.webp",
];

export const DANK_SUB_COMMANDS: Record<string, SubCommand> = {
  dvs: {
    title: "dvs",
    description: "Describe Death Valley with two adjectives",
    reply: "https://twitter.com/PBE_Confessions/status/1265037681001627657",
  },
  krash: {
    title: "krash",
    description: "Commit bank robbery",
    reply:
      "Absolute bank robbery, trading $1.5M in cap space for a future gg catcher",
  },
  mis: {
    title: "mis",
    description: "fr?",
    reply: "fr?",
  },
  // help: {
  //   title: "help",
  //   description: "List commands",
  //   reply: { embeds: [generateCommandList()] },
  // },
  "m4xx-kuma": {
    title: "m4xx-kuma",
    description: "Unleash the beast",
    reply:
      "https://tenor.com/view/barghest-bear-cybernetic-bear-machine-roar-gif-26208002",
  },
  poe: {
    title: "poe",
    description: "How many K's will Poe Scott get in his next start?",
    reply: `Poe Scott will get... ${Math.floor(Math.random() * 28)} K's!`,
  },
  dvd: {
    title: "dvd",
    description: "Will it ever touch the corner?",
    reply:
      "https://thumbs.gfycat.com/HandsomeDeafeningAmethystgemclam-max-1mb.gif",
  },
  scud: {
    title: "scud",
    description: "Invoke the wrath of HO",
    reply:
      ":regional_indicator_p::regional_indicator_u::regional_indicator_n::regional_indicator_i::regional_indicator_s::regional_indicator_h:    :regional_indicator_v::regional_indicator_a::regional_indicator_n::regional_indicator_d::regional_indicator_a::regional_indicator_l::regional_indicator_s:",
  },
  "dvs-w": {
    title: "dvs-w",
    description: "oh sick a W",
    reply: "https://cdn.betterttv.net/emote/5d38aaa592fc550c2d5996b8/3x.gif",
  },
  dinger: {
    title: "dinger",
    description: "hit a bomb",
    reply: "https://media.tenor.com/u2AyPN_ZndUAAAAC/home-run-home.gif",
  },
  walk: {
    title: "walk",
    description: "take your base",
    reply: "https://media.tenor.com/g0Tp5wjXrSgAAAAC/simpsons-batter.gif",
  },
  "three-true-outcomes": {
    title: "three-true-outcomes",
    description: "What are the three true outcomes?",
    reply: "1.)Home Run\n2.)Grand Slam\n3.)Walkoff",
  },
  lebowski: {
    title: "lebowski",
    description: "Get The Dude ready for his next start",
    reply: LEBOWSKI_GIFS[Math.floor(Math.random() * LEBOWSKI_GIFS.length)],
  },
  ostman: {
    title: "ostman",
    description: "Send Ostman to take care of business",
    reply: "https://media.tenor.com/BqedYho27HAAAAAC/station19-fire-truck.gif",
  },
  jones: {
    title: "jones",
    description: "Fear the Bean Warrior",
    reply: "https://media.tenor.com/pXIBwmID3d8AAAAC/crazy-eyes-kid.gif",
  },
  tsunami: {
    title: "tsunami",
    description: "Initiate wave sequence",
    reply: "https://www.youtube.com/watch?v=0EWbonj7f18",
  },
};
