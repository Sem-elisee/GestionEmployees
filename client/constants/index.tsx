import {
  LayoutDashboard,
  UsersRound,
  Settings,
  BarChart3Icon,
  // ChevronRight,
} from "lucide-react";
{
  /* <ChartNoAxesCombined /> */
}
{
  /* <ChartLine /> */
}

interface DataItem {
  id: number;
  icon: any;
  title: string;
  link: string;
}

export const data: DataItem[] = [
  {
    id: 1,
    icon: <BarChart3Icon className="w-4 h-5" />,
    title: "Tableau de Bord",
    link: "/tableaudebord",
  },
  {
    id: 2,
    icon: <UsersRound className="w-4 h-5" />,
    title: "Employé",
    link: "/employe",
  },

  {
    id: 4,
    icon: <Settings className="w-4 h-5" />,
    title: "Paramètre",
    link: "/parametre",
  },
];
// {
//   id: 3,
//   icon: "/img (11).jpg",
//   title: "Hiking tour",
// },
// import * as z from "zod";

// const dataExplore = z.object({
//   icons: z.any(),
// });

// type dataExplore = z.infer<typeof dataExplore>;

// export const Explore: dataExplore[] = [
//   {
//     icons: <Send />,
//   },
//   {
//     icons: <IoWalletOutline className=" text-2xl" />,
//   },
//   {
//     icons: <UsersRound />,
//   },
//   {
//     icons: <BadgePercent />,
//   },
// ];

// const commentExplore = z.object({
//   title: z.string(),
//   desc1: z.string(),
//   desc2: z.string(),
// });

// type commentExplore = z.infer<typeof commentExplore>;

// export const Explore2: commentExplore[] = [
//   {
//     title: "Airport pickup",
//     desc1: "We provide escort from the",
//     desc2: "airport to the hotel",
//   },
//   {
//     title: "Easy booking",
//     desc1: "Quick and easy booking of tours for",
//     desc2: " upcomming dates",
//   },
//   {
//     title: "Best tour guide",
//     desc1: "Our best tour guide is ready",
//     desc2: "to guide your trip",
//   },
//   {
//     title: "Lots of promos",
//     desc1: "Various promotions and",
//     desc2: "drawings of tours",
//   },
// ];
