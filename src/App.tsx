import { FC, useEffect } from 'react';
import { Routes, Route, useMatch, useNavigate } from 'react-router-dom';
import { Header } from './common/components/header/header.component';
import { routes } from './core/routes';

interface AppProps {}

export const App: FC<AppProps> = () => {
  const isGlobalFeedPage = useMatch(routes.globalFeed);
  const navigate = useNavigate();

  useEffect(() => {
    if (isGlobalFeedPage) {
      navigate(routes.personalFeed.path);
    }
  }, []);

  return (
    <div className="pb-16">
      <Header />
      <Routes>
        {Object.values(routes).map((route) => (
          <Route path={route.path} element={<route.element />} />
        ))}
      </Routes>
    </div>
  );
};
