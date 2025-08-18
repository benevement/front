import { useAuthStore } from "../../stores/useAuthStore";

const VolunteerTask = () => {
    // endpoints : 
    // endpoint côté gauche : GET /events/{event_id}
    // endpoint côté droit : GET /events/{event_id}/tasks

    // variables d'authentifications tirées du store
    const role = useAuthStore((state) => (state.user?.role));
    const token = useAuthStore((state) => (state.token));

    const isVolunteer = role && role == "volunteer" ? true : false;


    return (
        <>
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 border-2 border-blue-500">
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm border-2 border-amber-100">
                    {/* <section id="sectionLeft" className="grid sm:grid-cols-[40%,60%] h-max bg-amber-400"> */}
                    {/* col-span-2 max-sm:-col-end-2  */}
                        <div className="grid grid-cols-5 gap-x-3 bg-cyan-300">
                            <div className="px-5 col-span-2  bg-red-100">bloc1</div>
                            <div className="px-5 col-span-3  bg-red-200">bloc2</div>
                            </div>
                        <div className="bg-cyan-400">COP</div>
                    {/* </section> */}

                   
                </div>
            </div>

            
        </>
    )

}

export default VolunteerTask;
