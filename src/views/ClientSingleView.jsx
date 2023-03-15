import { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';

import Topbar from "../components/Topbar";
import Footer from "../components/Footer";

import Input from "../components/atoms/Input";
import Button from "../components/atoms/Button";
import PopupAlert from "../components/organisms/PopupAlert";
import "../styles/styleParcoursRegister.css";

function SingleClientView() {

  const [client, setClient] = useState({})
  const [newClient, setNewClient] = useState({ firstName: "", lastName: "", mail: "", password: "", clientPicture: "" });
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [editMode, setEditMode] = useState(false); // For the task to edit

  let params = useParams();
  const navigate = useNavigate();

  useEffect(() => { displayClient() }, [])

  function handleChange(e) {
    setNewClient({ ...newClient, [e.target.name]: e.target.value });
  }

  async function displayClient() {
    let token = localStorage.getItem("token");
    let options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + token,
      }
    };
    const response = await fetch(`http://localhost:3001/clients/${params.slug}`, options);
    const data = await response.json();
    if (!data) {
      setClient({});
    }
    console.log(data);
    setClient(data);
  }

  function backToClientsList() {
    navigate("/clients");
  }

  const itemsArray = [
    {
      name: "clientPicture",
      type: "file",
      label: "Photo de profil",
      value: newClient.clientPicture,
      accept: "image/jpeg,image/png, image/jpg"
    },
    {
      name: "firstName",
      label: "Prénom",
      value: newClient.firstName
    },
    {
      name: "lastName",
      label: "Nom",
      value: newClient.lastName
    },
    {
      name: "Mail",
      label: "Mail",
      value: newClient.mail,
      type: "mail"
    },
    {
      name: "password",
      label: "Mot de passe",
      value: newClient.password,
      type: "password"
    }
  ];

  async function updateClient(e) {
    e.preventDefault();
    const clientData = new FormData(e.target);
    clientData.append("slug", client.slug);

    let token = localStorage.getItem("token");
    const options =
    {
      method: 'PUT',
      headers:
      {
        Authorization: "Bearer " + token
      },
      body: clientData
    };
    const response = await fetch(`http://localhost:3001/clients/updateadmin/`, options);
    const data = await response.json();
    console.log(data.status);
    if (data.status === 200) {
      setEditMode(!editMode);
      navigate('/clients/' + client.slug);
    }
  }

  function setAlertState(state) {
    setDeleteAlert(state);
  }

  // Cancel a customer deletion
  function cancelDelete() {
    setAlertState(false);
  }

  // Confirm a customer deletion
  async function confirmDelete() {
    let token = localStorage.getItem("token");
    const options =
    {
      method: 'DELETE',
      headers:
      {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        Authorization: "Bearer " + token
      },
      body: JSON.stringify({
        slug: params.slug
      })
    };
    const response = await fetch(`http://localhost:3001/clients/delete/`, options);
    const data = await response.json();
    if (data.status === "200") {
      setAlertState(false);
      backToClientsList();
    }
  }

  return (
    <div>
      <Topbar />
      <div>
        {deleteAlert && (
          <PopupAlert type="ce profil d'utilisateur" cancel={() => cancelDelete()} confirm={() => confirmDelete()} />
        )}
        <h1>Page de {client.firstName} {client.lastName}</h1>
            <div>
              {editMode && (
                <div className="parcoursregistercontainer">
                  <form onSubmit={updateClient} encType="multipart/form-data">
                    {itemsArray.map((item) => (
                      <Input
                        name={item.name}
                        label={item.label}
                        value={item.value}
                        required={item.required}
                        type={item.type}
                        onChange={handleChange}
                      />
                    ))}
                    <div className="buttonContainer">
                      <Button>VALIDER</Button>
                      <Button onClick={() => setEditMode(!editMode)}>ANNULER</Button>
                    </div>
                  </form>
                </div>
              )}
              {!editMode && (
                <div>
                  <img style={{ width: 10 + '%' }} src={`http://localhost:3001${client.clientPicture}`} alt="Photo de profil de l'utilisateur" />
                  <div className="content">
                    <div className="clientInfos">
                      <p><span className="clientInfo">Nom Prénom :</span> {client.firstName} {client.lastName}</p>
                      <p><span className="clientInfo">Mail :</span> {client.mail} </p>
                      <div className="clientInfos">
                        <Button onClick={() => setEditMode(!editMode)}>Modifier le profil</Button>
                        <Button onClick={() => setAlertState(true)}>Supprimer le profil</Button>
                      </div>
                    </div>
                  </div>
                  <Button onClick={() => backToClientsList()}>Retour aux clients</Button>
                </div>

              )}
            </div>
        <div>
          <Footer />
        </div>
      </div>
    </div>

  );
}

export default SingleClientView;