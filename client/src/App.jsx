import { Suspense, useState } from "react";
import "./App.css";
import Website from "./pages/Website";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Properties from "./pages/Properties/Properties";
import Property from "./pages/Property/Property";
import Layout from "./components/Layout/Layout";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { ToastContainer } from "react-toastify";
//to work correct toast we have to import its css tools
//and toast send us messages
import "react-toastify/dist/ReactToastify.css";
import UserDeatailContext from "./Context/UserDetaisContext";
import Bookings from "./pages/Bookings/Bookings";
import Favorites from "./pages/Favorites/Favorites";
//import Favourites from "./pages/Favourites/Favourites";

function App() {
  const queryClient = new QueryClient();
  const [userDetails, setUserDetails] = useState({
    favourites: [],
    bookings: [],
    token: null,
  });
  return (
    <UserDeatailContext.Provider value={{ userDetails, setUserDetails }}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<Website />} />
                <Route path="/properties">
                  <Route index element={<Properties />} />
                  <Route path=":propertyId" element={<Property />} />
                </Route>
                <Route path="/bookings" element={<Bookings />} />
                <Route path="favourites" element={<Favorites />} />
              </Route>
            </Routes>
          </Suspense>
        </Router>
        <ToastContainer />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </UserDeatailContext.Provider>
  );
}

export default App;
