import ProductOverview from './compoenents/ProductOverview';
import Footer from './compoenents/Footer';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import QuotePage from './compoenents/QuotePage';
import { useEffect } from 'react';
import { autoLogin} from './services/api';

function App() {
  useEffect(() => {
    async function loginOnce() {
      try {
        await autoLogin();
      } catch (err) {
        console.error("Auto login failed ❌", err);
      }
    }
    loginOnce();
  }, []);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<ProductOverview />} /> {/* ✅ fixed */}
          <Route path="/quote" element={<QuotePage />} />
        </Routes>
      </Router>
      <Footer />
    </>
  );
}

export default App;
