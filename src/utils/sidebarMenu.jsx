import { MdDashboard } from "react-icons/md";
import { FaAppStoreIos } from "react-icons/fa";
import { GiKnightBanner } from "react-icons/gi";
import { SiContentstack, SiGnuprivacyguard } from "react-icons/si";
import { FaUser } from "react-icons/fa";
import { pathData } from "../navigation/constants";
import { FaGalacticRepublic } from "react-icons/fa";
import { FaQq } from "react-icons/fa";
import { TiDocumentText } from "react-icons/ti";
import { IoIosPeople } from "react-icons/io";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { IoTicketOutline } from "react-icons/io5";
const sidebarMenu = [
  {
    label: "Dashboard",
    icon: <MdDashboard className="mb-1" />,
    path: pathData.dashboard,
    ismatchurl: [pathData.dashboard],
  },
  {
    label: "User Management",
    icon: <FaUser className="mb-1" />,
    path: pathData.userManagement,
    ismatchurl: [
      pathData.userManagement,
      pathData.userManagementCreateUser,
      `${pathData.userManagementUpdateUser}`,
      `${pathData.userMgmtUsersDetail}`,
    ],
  },
  {
    label: "Application Management",
    icon: <FaAppStoreIos className="mb-1" />,
    path: pathData.applicationManagement,
    ismatchurl: [pathData.applicationManagement, pathData.applicationDetail],
  },
  {
    label: "Banner Management",
    icon: <GiKnightBanner className="mb-1" />,
    path: pathData.bannersManagement,
    ismatchurl: [
      pathData.bannersManagement,
      pathData.createBanner,
      pathData.updateBanner,
    ],
  },
  {
    label: "Trademarks",
    icon: <GiKnightBanner className="mb-1" />,
    path: pathData.tradeMarks,
    ismatchurl: [pathData.tradeMarks, pathData.tradeMarkDetails],
  },
  // {
  //   label: "Payments",
  //   icon: <GiKnightBanner className="mb-1" />,
  //   path: pathData.payments,
  //   ismatchurl: [pathData.payments, pathData.paymentDetails],
  // },
  {
    label: "Content Management",
    icon: <SiContentstack className="mb-1" />,
    isSubmenu: true,
    subIcon: <SiContentstack className="mb-1" />,
    submenu: [
      {
        label: "Publications",
        path: `${pathData.contentPublication}`,
        icon: <FaGalacticRepublic className="mb-1 me-3" />,
        ismatchurl: [
          pathData.contentPublication,
          pathData.contentCreatePublication,
          pathData.contentUpdatePublication,
          pathData.contentDetailPublication,
        ],
      },
      {
        label: "FAQS",
        path: `${pathData.contentFaq}`,
        icon: <FaQq className="mb-1 me-3" />,
        ismatchurl: [
          pathData.contentFaq,
          pathData.contentCreateFaq,
          pathData.contentUpdateFaq,
          pathData.contentDetailFaq,
        ],
      },
      {
        label: "Privacy Policy",
        icon: <SiGnuprivacyguard className="mb-1 me-3" />,
        path: pathData.privacyPolicy,
        ismatchurl: [pathData.privacyPolicy],
      },
      {
        label: "About Us",
        icon: <IoIosPeople className="mb-1 me-3" />,
        path: pathData.aboutUs,
        ismatchurl: [pathData.aboutUs],
      },
      {
        label: "Terms And Conditions",
        icon: <TiDocumentText className="mb-1 me-3" />,
        path: pathData.termsAndCondition,
        ismatchurl: [pathData.termsAndCondition],
      },
    ],
  },
  {
    label: "Support",
    icon: <SiContentstack className="mb-1" />,
    isSubmenu: true,
    subIcon: <SiContentstack className="mb-1" />,
    submenu: [
      {
        label: "Chat",
        path: `${pathData.supportChat}`,
        icon: <IoChatbubbleEllipsesOutline className="mb-1 me-3" />,
        ismatchurl: [pathData.supportChat],
      },
      {
        label: "Ticket",
        path: `${pathData.supportTicket}`,
        icon: <IoTicketOutline className="mb-1 me-3" />,
        ismatchurl: [pathData.supportTicket, pathData.supportTicketDetails],
      },
    ],
  },
];
export default sidebarMenu;
