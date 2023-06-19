import BrandIcon from "../assets/icons/dashboard.svg";
import PcIcon from "../assets/icons/desktop.svg";
import OrderIcon from "../assets/icons/orders.svg";
import UserIcon from "../assets/icons/user.svg";
import Components from "../assets/icons/components.svg";
import Category from "../assets/icons/categorys.svg";

const sidebar_menu = [
  {
    id: 1,
    icon: BrandIcon,
    path: "/",
    title: "Brands",
  },
  {
    id: 2,
    icon: OrderIcon,
    path: "/orders",
    title: "Orders",
  },
  {
    id: 3,
    icon: PcIcon,
    path: "/Pc",
    title: "PCs",
  },
  {
    id: 4,
    icon: UserIcon,
    path: "/users",
    title: "Users",
  },
  {
    id: 5,
    icon: Components,
    path: "/components",
    title: "Components",
  },
  {
    id: 6,
    icon: Category,
    path: "/category",
    title: "Categories",
  },
];

export default sidebar_menu;
