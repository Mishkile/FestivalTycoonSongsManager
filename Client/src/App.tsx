import GetUserModsFolder from "./Components/GetUserModsFolder";
import { Routes, Route, Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import SongsPage from "./Pages/SongsPage";
import Drawer from "./Components/Drawer";
import AddSong from "./Pages/AddSong";
import AddLengths from "./Pages/AddLengths";
const App = () => {
  const docPathRedux = useSelector((state: any) => state.documentsPath);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  useEffect(() => {
    // will clear the folder path from local storage 
    // localStorage.clear()
   
    const docPathLocalStorage = localStorage.getItem('documentsPath');
    if (!docPathLocalStorage) {
      navigate('/first');
    } else if (docPathRedux === '') {
      dispatch({ type: 'SET_DOCUMENTS_PATH', payload: docPathLocalStorage });
      navigate("/")

    } else {
      navigate("/")
    }





  }, [docPathRedux]);


  return (
    <div style={{ width: "100vw", height: "100vh", border: "1px solid green" ,display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column"}}>
      <Drawer />

      <Routes>
        <Route path="/first" element={<GetUserModsFolder />} />
        <Route path="/add" element={<AddSong />} />
        <Route path="/" element={<SongsPage />} />
        <Route path="/song/:id" element={<AddLengths />} />
        

      </Routes>
      {/* <GetUserModsFolder /> */}
    </div>
  );
};

export default App;
