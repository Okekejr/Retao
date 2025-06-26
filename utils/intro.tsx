import { t } from "@/localization/t";

export type IntroUtilsT = {
  key: string;
  title: string;
  desc: string;
  image: any;
}[];

export const getIntroUtils = (): IntroUtilsT => [
  {
    key: "titleAndAdd",
    title: t("listingIntro.steps.titleAndAdd.title"),
    desc: t("listingIntro.steps.titleAndAdd.desc"),
    image: require("../assets/img/write.png"),
  },
  {
    key: "images",
    title: t("listingIntro.steps.images.title"),
    desc: t("listingIntro.steps.images.desc"),
    image: require("../assets/img/photo.png"),
  },
  {
    key: "finish",
    title: t("listingIntro.steps.finish.title"),
    desc: t("listingIntro.steps.finish.desc"),
    image: require("../assets/img/finish.png"),
  },
];
