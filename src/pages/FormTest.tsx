import { SubmitHandler, useForm } from "react-hook-form";
import api from "../services/api";
import { useState } from "react";
import { UserInterfaceBdd } from "../interfaces/IUser";
import fakeUsers from "../data/fakeUsers";
import { useAuthStore2 } from "../stores/useAuthStore2";

interface Idata {
  username: string;
}

function FormTest() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<Idata>(
    {
       defaultValues: {
      username: "Toto",
    }}
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

  type axiosDataType = {message: string, fakusers: UserInterfaceBdd[]} | undefined
  const [axiosData, setAxiosData] = useState<axiosDataType>();
  //const axiosDataArr: Omit<axiosDataType, "message"> =  axiosData ? Object.entries(axiosData.fakusers) : [];
  const axiosDataArr: UserInterfaceBdd[] = axiosData?.fakusers ?? [];
  console.log("**fakeusers : ", Array.from(axiosDataArr));
  // TODO: mettre tous les userFakers dans Nest ?
  // TODO: test update
  // TODO: faire tests avec Prisma 


// utilisation du Store (useAuthStore2)
const {user, connection_date, setUser, getAge} = useAuthStore2();


  const handleList = async () => {
    console.log("handle List");
    try {
      const res = await api.get('/users');
      console.log("res.data *1* :", res.data);
      const {message, fakusers} = res.data;
      setAxiosData(fakusers[0]); // => UseState
      console.log("message : ",message)
        console.log("res.data.fakusers[1] : ", res.data.fakusers[1]);
        setUser(res.data.fakusers[1]); // => store
        console.log("enregistrement de l'utilisateur dans le Store.");      
    }
    catch (err) {
      console.error("erreur get axios : ", err);
    }
  }
  
  const messageSubmit = isSubmitting ? "Transfert en cours..." : "";

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="username">User Name</label>
        <input className="inline-block px-5 m-3 border-2 rounded-2xl"
          placeholder="Bill"
          {...register("username", { required: "Le nom est obligatoire..." })}
        />
        {errors.username && <p className="text-red-600">{errors.username.message}</p>}
        <input type="submit" className="custom-button" disabled={isSubmitting} />
        {/* isSubmitting && <p>test</p> */}
        {<p>{messageSubmit}</p>}


      </form>

      <div className="m-2xl m-10 bg-emerald-100">
        <button className="custom-button" onClick={handleList}>Listing users</button>
      </div>

      {/* {axiosData && axiosData.fakusers.forEach((item) => (`<p>${item}</p>`))} */}
      
<h2>{axiosData && axiosData.message}</h2>

{axiosDataArr.map(user => (
  <p key={user.id}>{user.email} - {user.birthdate} - {user.role} - {user.first_name} {user.last_name} - {user.updatedAt?.toLocaleString()}</p>
))}
    </>

  );
}

export default FormTest;