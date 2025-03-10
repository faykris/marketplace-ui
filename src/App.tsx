import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { HomePage } from "./components/HomePage/HomePage.tsx";
import { ProductsCatalog } from "./components/ProductsCatalog/ProductsCatalog.tsx";
import { SellerDashboard } from "./components/SellerDashboard/SellerDashboard.tsx";
import { AdminDashboard } from "./components/adminDashboard/AdminDashboard.tsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <HomePage>
                <ProductsCatalog />
              </HomePage>
            }
          />
          <Route
            path="/seller-dashboard"
            element={
              <HomePage>
                <SellerDashboard />
              </HomePage>
            }
          />
          <Route
            path="/admin-dashboard"
            element={
              <HomePage>
                <AdminDashboard />
              </HomePage>
            }
          />
        </Routes>
      </BrowserRouter>
      <Toaster
        position="bottom-center"
        toastOptions={{
          iconTheme: {
            primary: "#1d9ea8",
            secondary: "#ffffff",
          },
        }}
      />
    </>
  );
}

export default App;
