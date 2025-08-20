import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";


interface Idata {
    username: string;
}

function FormTest() {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<Idata>();
  
    async function sleep(ms: number){
        return new Promise ((resolve) => {
            setTimeout(resolve, ms);
        })
    } 

//const [isSubmitting, setIsSubmitting] = useState<Boolean>(false);

    const onSubmit: SubmitHandler<Idata> = async (data) => {
        
      await sleep(2000);
      if (data.username === "bill") {
        alert(JSON.stringify(data));
      } else {
        alert("There is an error");

      }
    };
  
const messageSubmit = isSubmitting ? "Transfert en cours..." : "";

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="username">User Name</label>
        <input className="block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="Bill"
          {...register("username", { required: "Le nom est obligatoire..." })}
        />
        {errors.username && <p className="text-red-600">{errors.username.message}</p>}
        <input type="submit" className="custom-button" disabled={isSubmitting} />
        {/* isSubmitting && <p>test</p> */}
        {<p>{messageSubmit}</p>}
      </form>
    );
  }

  export default FormTest;