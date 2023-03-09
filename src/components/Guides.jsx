import { useNavigate } from "react-router-dom";
import Button from "./atoms/Button";

function Guides (
    {firstName,
    lastName,
    mail, 
    experienceYears,
    state,
    slug,}
    ) 
{
  const navigate = useNavigate();

  function goToGuidesPage ()
  {
    console.log(slug);
    navigate('/guides-page/'+slug);
  }

  return (
    <div id="postGuides">
      <div><p> ICI LA PHOTO DE PROFIL </p></div>
      <div className="content">
          <div className="guideInfos">
            <p><span className="guideInfo">Nom :</span> {firstName} </p>
            <p><span className="guideInfo">Prénom :</span> {lastName} </p>
            <p><span className="guideInfo">mail :</span> {mail} </p>
            <p><span className="guideInfo">Années d'expériences :</span> {experienceYears} </p>
            <p><span className="guideInfo">Etat :</span> {state} </p>
          </div>
          <div className="gameInfos">
            <Button onClick = {goToGuidesPage}>Voir le Guide</Button>
          </div>
      </div>  
    </div> 
  );
}

export default Guides;