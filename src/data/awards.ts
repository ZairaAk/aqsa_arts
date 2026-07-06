export type Award = {
  id: string;
  year: string;
  title: string;
  description: string;
};

const awards: Award[] = [
  {
    id: "award-1",
    year: "1998",
    title: "State Recognition for Master Craftsmanship",
    description:
      "Honoured by the state handicrafts department for outstanding contribution to preserving Aari embroidery techniques.",
  },
  {
    id: "award-2",
    year: "2006",
    title: "Exhibition Feature, National Crafts Fair",
    description:
      "Selected to showcase handcrafted Aari work at a national-level crafts exhibition, representing Kashmiri artisans.",
  },
  {
    id: "award-3",
    year: "2015",
    title: "Excellence in Traditional Textile Arts",
    description:
      "Recognised for decades of dedication to hand embroidery and mentoring the next generation of local artisans.",
  },
];

export function getAwards() {
  return awards;
}
