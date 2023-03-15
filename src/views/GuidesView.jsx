import { useState, useEffect, useContext } from "react";
import { Link } from 'react-router-dom';

import GuideRegister from "../components/organisms/GuideRegister";

import Topbar from "../components/Topbar";
import Footer from "../components/Footer";
import Guides from "../components/Guides";

import { UserConnect } from "../App";

function GuidesView() {
  const [guideList, setGuidelist] = useState([])
  const [errorMsg, setErrorMsg] = useState("");
  const { userLog } = useContext(UserConnect);

  useEffect(() => { displayGuideList() }, [])

  async function displayGuideList() {
    let token = localStorage.getItem("token");

    const options =
    {
      method: 'GET',
      headers:
      {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        Authorization: "Bearer " + token
      }
    };
    const response = await fetch('http://localhost:3001/guides/', options);
    const data = await response.json()
    console.log(data);
    if (!data) {
      setGuidelist([]);
      setErrorMsg("Aucun résultat trouvé");
    }

    if (Array.isArray(data)) {
      setGuidelist(data);
      setErrorMsg("");
    }
  }

  return (
    <div>
      {!userLog && (
        <>
          <p>Vous n'avez pas l'autorisation d'accéder à cette page</p>
          <p><Link to="/">Retour à l'accueil</Link></p>

        </>
      )}
      {userLog && (
        <>
          <Topbar />
          {userLog.role !== "guide" && (<GuideRegister />)}
          <div id="guidesList">
            <p>Liste des guides</p>
            {errorMsg}
            {guideList.map((guide) => (
              <Guides
                key={guide.slug}
                firstName={guide.firstName}
                lastName={guide.lastName}
                mail={guide.mail}
                password={guide.password}
                description={guide.description}
                experienceYears={guide.experienceYears}
                profilePicture={guide.guidePicture}
                state={guide.state}
                slug={guide.slug}
              />
            ))}
          </div>
          <div>
            <Footer ClassName="footer" />
          </div>
        </>
      )}
    </div>
  );
}

export default GuidesView;
