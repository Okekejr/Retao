export type IntroUtilsT = {
  key: string;
  title: string;
  desc: string;
  image: any;
}[];

export const IntroUtils: IntroUtilsT = [
  {
    key: "title&Add",
    title: "Write a Great Title",
    desc: "Make it catchy and clear with a helpful description.",
    image: require("../assets/img/write.png"),
  },
  {
    key: "images",
    title: "Upload Up to 3 Photos",
    desc: "Show your item from different angles to build trust.",
    image: require("../assets/img/photo.png"),
  },
  {
    key: "finish",
    title: "Finishing Touches & Publish",
    desc: "Pick availability, review info, and list your item.",
    image: require("../assets/img/finish.png"),
  },
];
