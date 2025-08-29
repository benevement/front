import { SubmitHandler, useForm } from "react-hook-form";
import api from "../services/api";
import { useState } from "react";
import { UserInterfaceBdd } from "../interfaces/IUser";
//import fakeUsers from "../data/fakeUsers";
import { useAuthStore2 } from "../stores/useAuthStore2";

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
    if (data.username === "bill") {
      alert(JSON.stringify(data));
    } else {
      console.log
      alert("Formulaire envoyé, mec.");

    }
  };

  type axiosDataType = { message: string, fakusers: UserInterfaceBdd[] } | undefined
  const [axiosData, setAxiosData] = useState<axiosDataType>();
  //const axiosDataArr: Omit<axiosDataType, "message"> =  axiosData ? Object.entries(axiosData.fakusers) : [];
  const axiosDataArr: UserInterfaceBdd[] = axiosData?.fakusers ?? [];
  console.log("**fakeusers : ", Array.from(axiosDataArr));
  // TODO: mettre tous les userFakers dans Nest ?
  // TODO: test update
  // TODO: faire tests avec Prisma 


  // utilisation du Store (useAuthStore2)
  const { user, connection_date, setUser, getAge } = useAuthStore2();


  const handleList = async () => {
    console.log("handle List");
    try {
      const res = await api.get('/users');
      console.log("res.data *1* :", res.data);
      const { message, fakusers } = res.data;
      res && setAxiosData(fakusers[0]); // => 1er enregistrement dans le UseState
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

  function handleClick1(){
    alert("envoyé !")
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
      {axiosData?.message}
      {/* {axiosData && axiosData.fakusers.forEach((item) => (`<p>${item}</p>`))} */}

      <div className="px-4 text-green-600 m-3">
        <p>Bonjour, spec. ceci est un blobfish.</p>
      </div>
      <div data-cy="ladiv2test" className="leading-5 text-3xl text-red-400 mt-5">
        LADIV2TEST
      </div>
      <div data-cy="passwords" className="flex flex-col items-center leading-1 text-2xl text-red-950 max-w-3xl">
        
        <label htmlFor="pass1" className="custlabel">Password 1</label>
        <input id="pass1" name="npass1" type="text" data-cy="password1" className="custinput" />

        <label htmlFor="pass2" className="custlabel">Password 2 </label>
        <input id="pass2" name="npass2" type="text" data-cy="password2" className="custinput" />
       
       <div className="block h-20 bg-amber-200 min-w-10">&nbsp;</div>
        <button type="submit" name="nbutt1" id="butt1" className="custom-button" onClick={() => handleClick1()}>Envoyer</button>
      </div>

      <h2>{axiosData && axiosData.message}</h2>

      {axiosDataArr.map(user => (
        <p key={user.id}>{user.email} - {user.birthdate} - {user.role} - {user.first_name} {user.last_name} - {user.updatedAt?.toLocaleString()}</p>
      ))}
    </>

  );
}

export default FormTest;