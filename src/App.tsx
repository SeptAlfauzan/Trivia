import { Suspense, lazy } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Loading from "./presentation/components/Loading";
import ErrorBoundary from "./presentation/components/ErrorBoundary";
const Home = lazy(() => import("./presentation/features/home"));
const Quiz = lazy(() => import("./presentation/features/quiz"));
const Score = lazy(() => import("./presentation/features/score"));
const Auth = lazy(() => import("./presentation/features/auth"));
const PageNotFound = lazy(() => import("./presentation/features/404"));

function App() {
  const navigate = useNavigate();
  return (
    <div>
      <Suspense fallback={<Loading />}>
        <ErrorBoundary
          handleOnError={() => navigate("/")}
          handleErrorText="Back to Home"
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Auth />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/score" element={<Score />} />
            <Route path="/not-found" element={<PageNotFound />} />

            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </ErrorBoundary>
      </Suspense>
    </div>
  );
}

export default App;
