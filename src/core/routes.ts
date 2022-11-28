import { SignInPage } from "../modules/auth/pages/sign-in.page"
import { SignUpPage } from "../modules/auth/pages/sign-up.page"
import { ArticlePage } from "../modules/feed/pages/article.page"
import { GlobalFeedPage } from "../modules/feed/pages/global-feed.page"
import { ProfilePage } from "../modules/profile/pages/profile.page"

export const routes = {
  globalFeed: {
    path: '/',
    element: GlobalFeedPage,
  },
  personalFeed: {
    path: '/personal-feed',
    element: GlobalFeedPage,
  },
  profile: {
    path: '/@:profile',
    element: ProfilePage,
  },
  profileFavorites: {
    path: '/@:profile/favorites',
    element: ProfilePage,
  },
  singleArticle: {
    path: '/article/:slug',
    element: ArticlePage,
  },
  signIn: {
    path: '/sign-in',
    element: SignInPage,
  },
  signUp: {
    path: '/sign-up',
    element: SignUpPage,
  }
}