import { useEffect, useState } from 'react'
import { Link,  useNavigate } from 'react-router-dom';
import axios from "axios";

const Registrazione = () => {

  const [registerFormData, setRegisterFormData] = useState({
    nome: "",
    cognome: "",
    codiceFiscale: "",
    indirizzo: "",
    email: "",
    username: "",
    password: "",
    confermaPassword: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setRegisterFormData({ ...registerFormData, [e.target.name]: e.target.value });
  };

  const handleSumbit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/auth/register", {
        nome: registerFormData.nome, 
        cognome: registerFormData.cognome, 
        indirizzo: registerFormData.indirizzo,
        email: registerFormData.email, 
        username: registerFormData.username, 
        codiceFiscale: registerFormData.codiceFiscale,                    
        password: registerFormData.password
      });
      if(response.status === 201){
        console.log(response.data);    
        navigate('/');            
      }      
    } catch (error) {
      //TODO: Gestisci eccezione
      console.error("Error:", error);
    }
  }

  return (
    <div className="row">
      <div className="col-md-6 offset-md-3">
        <h2 className="text-center text-dark">Registrazione</h2>
        <div className="card ">
          <form className="card-body cardbody-color p-lg-5" onSubmit={handleSumbit}>
            <div className="text-center">
              <img src="https://cdn.pixabay.com/photo/2016/03/31/19/56/avatar-1295397__340.png" className="img-fluid profile-image-pic img-thumbnail rounded-circle my-3"
                width="200px" alt="profile" />
            </div>
            <div className="mb-3">
              <input type="text" className="form-control" 
              placeholder="Nome" name="nome"            
              value={registerFormData.nome} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <input type="text" className="form-control" 
              placeholder="Cognome"  name="cognome"             
              value={registerFormData.cognome} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <input type="text" className="form-control" 
              placeholder="Codice fiscale"    name="codiceFiscale"           
              value={registerFormData.codiceFiscale} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <input type="text" className="form-control" 
              placeholder="Indirizzo"      name="indirizzo"         
              value={registerFormData.indirizzo} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <input type="text" className="form-control" 
              placeholder="Email"   name="email"            
              value={registerFormData.email} onChange={handleChange} />
            </div>   
            <div className="mb-3">
              <input type="text" className="form-control" 
              placeholder="Username"      name="username"         
              value={registerFormData.username} onChange={handleChange} />
            </div>           
            <div className="mb-3">
              <input type="password" className="form-control"   
              placeholder="Password"        name="password"    
              value={registerFormData.password} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <input type="password" className="form-control"   
              placeholder="Conferma password"    name="confermaPassword"        
              value={registerFormData.confermaPassword} onChange={handleChange} />
            </div>
            <div className="text-center">
              <button className="btn btn-color px-5 mb-3 w-100" onClick={handleSumbit}>Registrati</button>
              </div>
            <div id="emailHelp" className="form-text text-center mb-3 text-dark">Sei già registrato? 
              <Link to="/login" className="text-dark fw-bold"> Accedi</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Registrazione