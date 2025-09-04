import { SubmitHandler, useForm } from "react-hook-form";
import api from "../services/api";
import { useEffect, useState } from "react";
import { UserInterfaceBdd } from "../interfaces/IUser";
//import fakeUsers from "../data/fakeUsers";
import { userStore } from "../stores/userStore";

interface Idata {
  username: string;
}

function FormTest() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<Idata>(
    {
      defaultValues: {
        username: "Toto",
      }
    }
  );

  async function sleep(ms: number) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    })
  }

  const onSubmit: SubmitHandler<Idata> = async (data) => {

    await sleep(1000);
    if (data.username.toLowerCase() === "bill") {
      alert(JSON.stringify(data));
    } else {
      console.log
      alert("Formulaire pas envoyé, mec : tu n'es pas Bill !");

    }
  };

  type axiosDataType = { message: string, fakusers: UserInterfaceBdd[] } | undefined
  const [axiosData, setAxiosData] = useState<axiosDataType>();
  //const axiosDataArr: Omit<axiosDataType, "message"> =  axiosData ? Object.entries(axiosData.fakusers) : [];
  useEffect( () => {
    console.log("useEffect axiosData => ", axiosData?.message)
  },[axiosData])
  //console.log("**fakeusers : ", Array.from(axiosDataArr));

  // utilisation du Store (useAuthStore2)
  const { user, connection_date, setUser, getAge } = userStore();

  const handleList = async () => {
    console.log("handle List");
    try {
      const res = await api.get('/users');
      //console.log("res.data *1* :", res.data);
      const { message, fakusers } = res.data;
      console.log("fakusers :", fakusers)
      console.log("fakusers[0] :", fakusers[0])
      console.log("res : ", res);
      console.log("res.data.fakusers : ", res.data.fakusers);
      res && setAxiosData({message: "Enregistrement du tableau fakusers dans le useState", fakusers: fakusers}); // => enregistrement dans le UseState
      //console.log("vérif si axiosData populate : ", axiosData)    // impossible : async => pas encore défini
      console.log("message : ", message)
      console.log("res.data.fakusers[1] : ", res.data.fakusers[1]);
      setUser(res.data.fakusers[1]); // => store
      console.log("enregistrement de l'utilisateur dans le Store.");
    }
    catch (err) {
      console.error("erreur get axios : ", err);
    }
  }

  const messageSubmit = isSubmitting ? "Transfert en cours..." : "";

  const [bddUser, setBddUser] = useState<UserInterfaceBdd>();
  const [pass1, setPass1] = useState<string>("");
  const [pass2, setPass2] = useState<string>("");
  const [idChosen, setIdChosen] = useState<string>("1");

  useEffect(() => {
    console.log("MAJ bddUser, idChosen")
  }, [bddUser, idChosen])


  async function handleClick1(): Promise<Boolean> {
    try {
      // recup 1 user à partir de la BDD
      setBddUser(undefined) // reset du bddUser (useState) si déjà défini
      const { data } = await api.get(`users/test/${idChosen}`)
      if (!data) { throw new Error(`utilisateur ${idChosen} impossible à récupérer.`) }
      else {
        console.log("data : ", data);
        if (data && pass1 === pass2) {
          console.log(data)
          if (data && data.user.password === pass1) {
            setBddUser(data.user);
            return true;
          }
        }
      }
    }
    catch (err) {
      console.log("problème de fonction handleClick1");
    }
    return false;
  }

const listID  = (): string  => {
  let res="";
  for (let j=1; j<7; j++){
    res += "<option>"+j+"</option>";
  }
  return res;
  //dangerouslySetInnerHTML={{ __html: listID() }}
}

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="username" className="custbigfont ">User Name</label>
        <input className="custinput mt-10 px-5"
          placeholder="Bill"
          {...register("username", { required: "Le nom est obligatoire..." })}
        />
        {errors.username && <p className="text-red-600">{errors.username.message}</p>}

        <input type="submit" className="custom-button m-3" disabled={isSubmitting} />
        {/* isSubmitting && <p>test</p> */}
        {<p>{messageSubmit}</p>}
      </form>

      <div className="flex items-center m-3 bg-emerald-100 p-4">
        <button className="custom-button p-3 h-1/2" onClick={handleList}>Listing users</button>
      </div>
      <div>
      {axiosData?.message}
      {axiosData && axiosData.fakusers.map((item) => (<p key={item.id}>{item.id} | {item.first_name} {item.last_name} , {item.role}</p>))}
      </div>

      <div className="px-4 text-green-600 m-3">
        <p>Bonjour, spec. ceci est un blobfish.</p>
      </div>
      <hr />
      <p>Password de test : <i className="text-shadow-amber-700 font-bold">Azerty123456#</i></p>
      <p>Dans la BDD, enregistrement d'1 user avec id=1 :</p>
      <p className="text-blue-800 text-lg font-light">insert into User values (default, 'Michel', 'Testor', "1973-10-22", "test@test.fr", "Azerty123456#", "02.03.04.05.06", "volunteer", default, default);</p>
      <div data-cy="passwords" className="flex flex-row items-center leading-1 text-red-950 max-w-3xl">

        <label htmlFor="idc" className="custlabel shrink-0 p-2">ID : </label>
        <select id="idcId" name="idc1" data-cy="select1" className="custinput pl-3 pr-3"   onChange={(e) => setIdChosen(e.target.value)}>        
          <option> 1 </option>
          <option> 2 </option>
          <option> 3 </option>
          <option> 4 </option>
          <option> 5 </option>
        </select>


        <label htmlFor="pass1" className="custlabel shrink-0 p-3">Password 1</label>
        <input id="pass1" name="npass1" type="password" data-cy="password1" className="custinput" onChange={(e) => setPass1(e.target.value)} />

        <label htmlFor="pass2" className="custlabel shrink-0 p-3">Password 2 </label>
        <input id="pass2" name="npass2" type="password" data-cy="password2" className="custinput" onChange={(e) => setPass2(e.target.value)} />

        <div className="block h-10 bg-amber-0 min-w-5">&nbsp;</div>
        <button type="submit" name="nbutt1" id="butt1" className="custom-button" onClick={handleClick1}>Envoyer</button>
      </div>
      <div className="text-gray-400">{bddUser ? bddUser?.email : "mail user non défini."}</div>
      <div className="text-green-800 text-3xl"> {bddUser ? "Trouvé " + bddUser?.first_name + " !" : ""}</div>
      <div className="text-gray-500">{pass1 ? "pass1 : " + pass1 : "pas de pass1"}</div>
      <div className="text-gray-500">{pass2 ? "pass2 : " + pass2 : "pas de pass2"}</div>
      <div className="text-gray-500">{idChosen ? "id : " + idChosen : "ID non défini"}</div>
        
    </>

  );
}

export default FormTest;

// fake user simu.
// insert into User values (default, 'Michel', 'Testor', "1973-10-22", "test@test.fr", "Azerty123456#", "02.03.04.05.06", "volunteer", default, default);
