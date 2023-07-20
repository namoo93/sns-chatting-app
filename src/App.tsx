import { Route, Routes } from 'react-router-dom';
import { Reset } from 'styled-reset';
import PageList from 'pages/__dev__/PageList';
import Components from './pages/__dev__/Components';
import GlobalStyle from './styles/GlobalStyle';
import * as Pages from 'pages';
import MediaMain from 'pages/media/MediaMain';
import axios from 'axios';
import { rememberToken, removeToken } from 'net/rest/api';
import { useEffect, useState } from 'react';
import userAtom from './stores/userAtom';
import tokenAtom from './stores/tokenAtom';
import { useUpdateAtom } from 'jotai/utils';
import Splash from './pages/Splash';
import { preload } from './net/useFetch';
import i18n from 'i18next';
import { initReactI18next, useTranslation } from 'react-i18next';
import AuthUtil from './utils/AuthUtil';
import MySetting from './MySetting';

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources: {
    en: require('./langs/en.json'),
    lo: require('./langs/lo.json'),
  },
  lng: 'en',
  fallbackLng: 'en',

  interpolation: {
    escapeValue: false,
  },
});

axios.defaults.baseURL = MySetting.httpUrl;

function App() {
  const [loaded, setLoaded] = useState<boolean>(false);
  const setUser = useUpdateAtom(userAtom);
  const setToken = useUpdateAtom(tokenAtom);
  const { i18n } = useTranslation();

  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      function (response) {
        return response;
      },
      function (error) {
        // 401 오류 수신시
        if (error.response.status === 401) {
          removeToken();
          setToken('');
          window.location.href = '/auth/sign-in';
        }
        return Promise.reject(error);
      },
    );
    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, [setToken]);

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoaded(true);
        return;
      }
      setToken(token);
      rememberToken(token);

      // 언어 설정 로드
      const lang = localStorage.getItem('lang') || 'en';
      if (lang) {
        await i18n.changeLanguage(lang);
      }

      try {
        const data = await AuthUtil.getMe();
        if (data) {
          setUser(data);
        }
      } catch (error) {
      } finally {
        setLoaded(true);

        // preload
        preload('/auth/contacts')
          .then(() => preload('/auth/contacts/birthday'))
          .then(() => preload('/auth/contacts/favorites'))
          .then(() => preload('/socials/timeline?page=1&limit=10'));
      }
    })();
  }, [setToken, setUser]);

  // TODO : 로드 상태 표시 필요
  if (!loaded) return <></>;

  return (
    <>
      <Reset />
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/__dev__/page-list" element={<PageList />} />
        <Route path="/__dev__/components" element={<Components />} />
        <Route path="/splash" element={<Splash />} />
        <Route path="/landing" element={<Pages.LandingPage />} />
        <Route path="/auth/sign-up" element={<Pages.SignUpPage />} />
        <Route path="/auth/sign-up/already" element={<Pages.AlreadyAccountPage />} />
        <Route path="/auth/sign-up/verification" element={<Pages.VerificationAccountPage />} />
        <Route path="/auth/sign-up/profile-enroll" element={<Pages.ProfileEnrollPage />} />
        <Route path="/auth/sign-in" element={<Pages.SignInPage />} />
        <Route path="/auth/sms" element={<Pages.SMSPage />} />
        <Route path="/auth/sign-in/verification" element={<Pages.VerificationAccountPage />} />
        <Route path="/lock" element={<Pages.LockPage />} />
        {/* <Route
          path="/auth/permissions"
          element={<Pages.AuthPermissionsPage />}
        /> */}
        <Route path="/contacts" element={<Pages.ContactsMainPage />} />
        <Route path="/chats" element={<Pages.ChatsMainPage />} />
        <Route path="/chats/add-friends/:add_type" element={<Pages.ChatsAddFriendsPage />} />
        <Route path="/chats/add-friends/:add_type/:room_id" element={<Pages.ChatsAddFriendsPage />} />
        <Route path="/chats/archived" element={<Pages.ChatsArchivedPage />} />
        <Route path="/chats/:room_id" element={<Pages.ChatsRoomPage />} />
        <Route path="/ringing" element={<Pages.ChatsRingingPage />} />
        <Route path="/chats/call/:room_id" element={<Pages.ChatsCallPage />} />
        <Route path="/chats/:room_id/detail" element={<Pages.ChatsRoomDetailPage />} />
        <Route path="/chats/:room_id/media" element={<Pages.ChatsRoomMediaPage />} />
        <Route path="/media-detail/:id" element={<Pages.MediaDetailPage />} />
        <Route path="/image-edit/:id" element={<Pages.ImageEditorPage />} />
        <Route path="/video-edit/:id" element={<Pages.VideoEditorPage />} />
        <Route path="/contacts" element={<Pages.ContactsMainPage />} />
        <Route path="/profile-detail" element={<Pages.ProfileDetailMainPage />} />
        <Route path="/contacts/add-friends" element={<Pages.ContactsAddFriendsPage />} />
        <Route path="/kokkokme" element={<Pages.KokKokMeMainPage />} />
        <Route path="/kokkokme/kokkokeme-search" element={<Pages.SearchPage />} />
        <Route path="/kokkokme/user-timeline/:userInfo" element={<Pages.UserTimelinePage />} />
        <Route path="/kokkokme/post-detail/:postId" element={<Pages.PostDetailPage />} />
        <Route path="/kokkokme/likes/:postId" element={<Pages.LikesPage />} />
        <Route path="/kokkokme/user-timeline/activity" element={<Pages.ActivityPage />} />
        <Route path="/kokkokme/user-timeline/followers/:userInfo" element={<Pages.FollowersPage />} />
        <Route path="/kokkokme/kokkokme-post" element={<Pages.KokKokMePostPage />} />
        <Route path="/media" element={<MediaMain />} />
        <Route path="/more" element={<Pages.MoreMainPage />} />
        <Route path="/more/profile-edit/change-number-info" element={<Pages.ChangeNumberInfoPage />} />
        <Route path="/more/profile-edit/change-mail-info" element={<Pages.ChangeMailInfoPage />} />
        <Route path="/more/settings/general" element={<Pages.GeneralPage />} />
        <Route path="/more/settings/notifications-settings" element={<Pages.NotificationsPage />} />
        <Route
          path="/more/settings/notifications-settings/kokkokme/live-notifications"
          element={<Pages.LiveNotificationsPage />}
        />
        <Route path="/more/settings/privacy-and-security" element={<Pages.PrivacyAndSecurityPage />} />
        <Route path="/more/settings/privacy-and-security/bolcked-users" element={<Pages.BlockedUsersPage />} />
        <Route path="/more/settings/privacy-and-security/kokkokme" element={<Pages.KokKokMePrivacyPage />} />
        <Route
          path="/more/settings/privacy-and-security/kokkokme/privacy-settings"
          element={<Pages.PrivacySettingsPage />}
        />
        <Route path="/more/settings/privacy-and-security/kokkokme/settings/except" element={<Pages.ExceptPage />} />
        <Route
          path="/more/settings/privacy-and-security/kokkokme/settings/hide-all-activities"
          element={<Pages.HideAllActivitiesPage />}
        />
        <Route path="/more/settings/privacy-and-security/passcode" element={<Pages.PasscodePage />} />
        <Route path="/more/settings/theme" element={<Pages.ThemePage />} />
        <Route path="/more/settings/theme/chat-background" element={<Pages.ChatBackgroundPage />} />
        <Route path="/more/settings/language" element={<Pages.LanguagePage />} />
        <Route path="/more/settings/chatting" element={<Pages.ChattingPage />} />
        <Route path="/more/settings/chatting/export-chats" element={<Pages.ExportChattingPage />} />

        <Route path="/more/settings/storage" element={<Pages.StoragePage />} />
        <Route path="/more/settings/call" element={<Pages.CallPage />} />
        <Route path="/more/settings/help" element={<Pages.HelpPage />} />
        <Route path="/more/saved-messages" element={<Pages.SavedMessagesPage />} />
        <Route path="/more/profile-edit/email-input" element={<Pages.EmailInputPage />} />
        <Route path="/more/profile-edit/official-account" element={<Pages.OfficialAccountPage />} />
      </Routes>
    </>
  );
}

export default App;
