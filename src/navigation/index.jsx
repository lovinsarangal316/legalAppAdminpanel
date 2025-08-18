import PvtLayout from "../layouts/PvtLayout";
import AppList from "../pages/appMgmt/AppList";
import Login from "../pages/auth/Login";
import BannersList from "../pages/bannerMgmt/BannersList";
import CreateBanner from "../pages/bannerMgmt/CreateBanner";
import UpdateBanner from "../pages/bannerMgmt/UpdateBanner";
import FaqList from "../pages/contentMgmt/faq/FaqList";
import Publication from "../pages/contentMgmt/publication/PubList";
import Dashboard from "../pages/Dashboard";
import SupportChat from "../pages/supportDesk/ChatSupport";
import SupportTicket from "../pages/supportDesk/Ticket";
import Usermanagement from "../pages/userMgmt/UserList";
import CreateUser from "../pages/userMgmt/CreateUser";
import UpdateUser from "../pages/userMgmt/UpdateUser";
import UserDetail from "../pages/userMgmt/UserDetails";
import { pathData } from "./constants";
import ProtectedRoute from "./protectedRoute";
import PublicRoute from "./publicRoute";
import AboutUs from "../pages/contentMgmt/AboutUs";
import TermsAndConditions from "../pages/contentMgmt/T&C";
import PrivacyPolicy from "../pages/contentMgmt/PrivacyPolicy";
import CreatePublication from "../pages/contentMgmt/publication/CreatePub";
import UpdatePublication from "../pages/contentMgmt/publication/UpdatePub";
import PublicationDetail from "../pages/contentMgmt/publication/PubDetails";
import FaqDetail from "../pages/contentMgmt/faq/FaqDetails";
import UpdateFAQ from "../pages/contentMgmt/faq/UpdateFaq";
import CreateFAQ from "../pages/contentMgmt/faq/CreateFaq";
import AppDetails from "../pages/appMgmt/AppDetails";
import ProfilePage from "../pages/profile/ProfileDetails";
import EditProfilePage from "../pages/profile/EditProfile";
import PaymentList from "../pages/payments/PaymentList";
import PaymentDetails from "../pages/payments/PaymentDetails";
import TmList from "../pages/trademarks/TmList";
import TmDetails from "../pages/trademarks/TmDetails";
import TicketDetails from "../pages/supportDesk/TicketDetails";
import ForgotPassword from "../pages/auth/ForgotPassword";
import Otp from "../pages/auth/Otp";
import CreatePassword from "../pages/auth/CreatePassword";
const routerData = [
  {
    id: 1,
    path: pathData.dashboard,
    element: (
      <ProtectedRoute>
        <PvtLayout>
          <Dashboard />
        </PvtLayout>
      </ProtectedRoute>
    ),
  },

  {
    id: 2,
    path: pathData.applicationManagement,
    element: (
      <ProtectedRoute>
        <PvtLayout>
          <AppList />
        </PvtLayout>
      </ProtectedRoute>
    ),
  },
  {
    id: 3,
    path: pathData.bannersManagement,
    element: (
      <ProtectedRoute>
        <PvtLayout>
          <BannersList />
        </PvtLayout>
      </ProtectedRoute>
    ),
  },

  {
    id: 5,
    path: pathData.privacyPolicy,
    element: (
      <ProtectedRoute>
        <PvtLayout>
          <PrivacyPolicy />
        </PvtLayout>
      </ProtectedRoute>
    ),
  },
  {
    id: 6,
    path: pathData.termsAndCondition,
    element: (
      <ProtectedRoute>
        <PvtLayout>
          <TermsAndConditions />
        </PvtLayout>
      </ProtectedRoute>
    ),
  },
  {
    id: 7,
    path: pathData.aboutUs,
    element: (
      <ProtectedRoute>
        <PvtLayout>
          <AboutUs />
        </PvtLayout>
      </ProtectedRoute>
    ),
  },

  {
    id: 9,
    path: pathData.userManagement,
    element: (
      <ProtectedRoute>
        <PvtLayout>
          <Usermanagement />
        </PvtLayout>
      </ProtectedRoute>
    ),
  },

  {
    id: 10,
    path: pathData.login,
    element: (
      <PublicRoute>
        {" "}
        <Login />
      </PublicRoute>
    ),
  },
  {
    id: 11,
    path: pathData.userManagementCreateUser,
    element: (
      <ProtectedRoute>
        <PvtLayout>
          <CreateUser />
        </PvtLayout>
      </ProtectedRoute>
    ),
  },
  {
    id: 12,
    path: `${pathData.userManagementUpdateUser}:id`,
    element: (
      <ProtectedRoute>
        <PvtLayout>
          <UpdateUser />
        </PvtLayout>
      </ProtectedRoute>
    ),
  },
  {
    id: 13,
    path: `${pathData.createBanner}`,
    element: (
      <ProtectedRoute>
        <PvtLayout>
          <CreateBanner />
        </PvtLayout>
      </ProtectedRoute>
    ),
  },
  {
    id: 14,
    path: `${pathData.contentPublication}`,
    element: (
      <ProtectedRoute>
        <PvtLayout>
          <Publication />
        </PvtLayout>
      </ProtectedRoute>
    ),
  },
  {
    id: 15,
    path: `${pathData.contentFaq}`,
    element: (
      <ProtectedRoute>
        <PvtLayout>
          <FaqList />
        </PvtLayout>
      </ProtectedRoute>
    ),
  },
  {
    id: 16,
    path: `${pathData.userMgmtUsersDetail}:id`,
    element: (
      <ProtectedRoute>
        <PvtLayout>
          <UserDetail />
        </PvtLayout>
      </ProtectedRoute>
    ),
  },
  {
    id: 17,
    path: `${pathData.updateBanner}:id`,
    element: (
      <ProtectedRoute>
        <PvtLayout>
          <UpdateBanner />
        </PvtLayout>
      </ProtectedRoute>
    ),
  },
  {
    id: 18,
    path: `${pathData.supportChat}`,
    element: (
      <ProtectedRoute>
        <PvtLayout>
          <SupportChat />
        </PvtLayout>
      </ProtectedRoute>
    ),
  },
  {
    id: 19,
    path: `${pathData.supportTicket}`,
    element: (
      <ProtectedRoute>
        <PvtLayout>
          <SupportTicket />
        </PvtLayout>
      </ProtectedRoute>
    ),
  },
  {
    id: 20,
    path: `${pathData.contentCreatePublication}`,
    element: (
      <ProtectedRoute>
        <PvtLayout>
          <CreatePublication />
        </PvtLayout>
      </ProtectedRoute>
    ),
  },
  {
    id: 21,
    path: `${pathData.contentUpdatePublication}:id`,
    element: (
      <ProtectedRoute>
        <PvtLayout>
          <UpdatePublication />
        </PvtLayout>
      </ProtectedRoute>
    ),
  },
  {
    id: 22,
    path: `${pathData.contentDetailPublication}:id`,
    element: (
      <ProtectedRoute>
        <PvtLayout>
          <PublicationDetail />
        </PvtLayout>
      </ProtectedRoute>
    ),
  },
  {
    id: 23,
    path: `${pathData.contentCreateFaq}`,
    element: (
      <ProtectedRoute>
        <PvtLayout>
          <CreateFAQ />
        </PvtLayout>
      </ProtectedRoute>
    ),
  },
  {
    id: 24,
    path: `${pathData.contentUpdateFaq}:id`,
    element: (
      <ProtectedRoute>
        <PvtLayout>
          <UpdateFAQ />
        </PvtLayout>
      </ProtectedRoute>
    ),
  },
  {
    id: 25,
    path: `${pathData.contentDetailFaq}:id`,
    element: (
      <ProtectedRoute>
        <PvtLayout>
          <FaqDetail />
        </PvtLayout>
      </ProtectedRoute>
    ),
  },
  {
    id: 26,
    path: `${pathData.applicationDetail}:id`,
    element: (
      <ProtectedRoute>
        <PvtLayout>
          <AppDetails />
        </PvtLayout>
      </ProtectedRoute>
    ),
  },
  {
    id: 27,
    path: `${pathData.profile}`,
    element: (
      <ProtectedRoute>
        <PvtLayout>
          <ProfilePage />
        </PvtLayout>
      </ProtectedRoute>
    ),
  },
  {
    id: 28,
    path: `${pathData.editProfile}`,
    element: (
      <ProtectedRoute>
        <PvtLayout>
          <EditProfilePage />
        </PvtLayout>
      </ProtectedRoute>
    ),
  },
  {
    id: 29,
    path: `${pathData.payments}`,
    element: (
      <ProtectedRoute>
        <PvtLayout>
          <PaymentList />
        </PvtLayout>
      </ProtectedRoute>
    ),
  },

  {
    id: 30,
    path: `${pathData.paymentDetails}`,
    element: (
      <ProtectedRoute>
        <PvtLayout>
          <PaymentDetails />
        </PvtLayout>
      </ProtectedRoute>
    ),
  },
  {
    id: 31,
    path: `${pathData.tradeMarks}`,
    element: (
      <ProtectedRoute>
        <PvtLayout>
          <TmList />
        </PvtLayout>
      </ProtectedRoute>
    ),
  },
  {
    id: 32,
    path: `${pathData.tradeMarkDetails}:id`,
    element: (
      <ProtectedRoute>
        <PvtLayout>
          <TmDetails />
        </PvtLayout>
      </ProtectedRoute>
    ),
  },
  {
    id: 33,
    path: `${pathData.supportTicketDetails}:id`,
    element: (
      <ProtectedRoute>
        <PvtLayout>
          <TicketDetails />
        </PvtLayout>
      </ProtectedRoute>
    ),
  },
  {
    id: 34,
    path: pathData.forgotPassword,
    element: (
      <PublicRoute>
        {" "}
        <ForgotPassword />
      </PublicRoute>
    ),
  },
  {
    id: 35,
    path: pathData.otp,
    element: (
      <PublicRoute>
        {" "}
        <Otp />
      </PublicRoute>
    ),
  },
  {
    id: 36,
    path: pathData.createPassword,
    element: (
      <PublicRoute>
        {" "}
        <CreatePassword />
      </PublicRoute>
    ),
  },
];

export default routerData;
