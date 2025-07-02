import '../../assets/css/UserProfile.css';


const UserProfile = () => {

    //const [var1, setVar1] = useState<string>("var1_init"); // hook useState
    
    const handleActionClick = () => {
        //setVar1("var1_mod");
        //console.log("var1 : ", var1);
    }

    const {urlImages} = "{urlImages}/";

    return (
        <>
{/* <link rel="stylesheet" type="text/css" href="../../assets/css.UserProfile.css" /> */}


<div className="frame_userprofile-1">
<div className="node-2">
<div className="group-user-profile-3">
<div className="iphone-15-pro-4">
<div className="frame-7-5"></div>
</div>
<div className="background_notifview-6"></div>
<div className="modify-image-7">
<p className="text-8"><span className="text-rgb-222-222-222">modify Profile image</span></p>
</div>
<div className="updatebutton-9">
<p className="text-10"><span className="text-rgb-222-222-222">update</span></p>
</div>
<div className="birthday-11">
<div className="input-form-12">
<div className="input-13">
<div className="content-14">
</div>
</div>
<p className="text-15"><span className="text-rgb-38-50-56">Birthday</span></p>
</div>
</div>
<div className="firstname-16">
<div className="input-form-17">
<div className="input-18">
<div className="content-19">
</div>
</div>
<p className="text-20"><span className="text-rgb-38-50-56">First Name
</span></p>
</div>
</div>
<div className="lastname-21">
<div className="input-form-22">
<div className="input-23">
<div className="content-24">
</div>
</div>
<p className="text-25"><span className="text-rgb-38-50-56">Last Name
</span></p>
</div>
</div>
<div className="navbar_notifview-26">
<div className="homepage-button-27">
<div className="button-outline-28">
</div>
<div className="home-29">
<img src={`${urlImages}/vector-30.svg`} className="vector-30" alt="vector" />
</div>
</div>
<div className="burger-menu-31">
<div className="button-outline-32">
</div>
<div className="menu-33">
<img src="{urlImages}/vector-34.svg" className="vector-34" alt="vector" />
</div>
</div>
<div className="group-user-button-35">
<div className="button-outline-users-36">
</div>
<div className="users-37">
<img src="{urlImages}/vector-38.svg" className="vector-38" alt="vector" />
</div>
</div>
<div className="mail-button-39">
<div className="button-outline-40">
</div>
<div className="mail-41">
<img src="{urlImages}/vector-42.svg" className="vector-42" alt="vector" />
</div>
</div>
<div className="number_5_redcircle-43">
<img src="{urlImages}/ellipse-1-44.svg" className="ellipse-1-44" alt="ellipse-1" />
<p className="text-45"><span className="text-white">5</span></p>
</div>
</div>
<div className="emailprofileuser-46">
<div className="input-form-47">
<div className="input-48">
<div className="content-49">
</div>
</div>
<p className="text-50"><span className="text-rgb-38-50-56">Email</span></p>
</div>
</div>
<div className="phonenumber-51">
<div className="input-form-52">
<div className="input-53">
<div className="content-54">
</div>
</div>
<p className="text-55"><span className="text-rgb-38-50-56">Phone number</span></p>
</div>
</div>
<div className="addressblock-56">
<div className="_card-blog-post-57">
<div className="zip-code-58">
<div className="input-form-59">
<p className="text-60"><span className="text-rgb-38-50-56">Zip code</span></p>
<div className="input-61">
<div className="content-62">
</div>
</div>
</div>
</div>
<div className="zip-code-63">
<div className="input-form-64">
<p className="text-65"><span className="text-rgb-38-50-56">City</span></p>
<div className="input-66">
<div className="content-67">
</div>
</div>
</div>
</div>
<div className="streetnum-68">
<div className="input-form-69">
<div className="streetname-70">
<div className="input-form-71">
<p className="text-72"><span className="text-rgb-38-50-56">Street Name</span></p>
<div className="input-73">
<div className="content-74">
</div>
</div>
</div>
</div>
<p className="text-75"><span className="text-rgb-38-50-56">Street n°</span></p>
<div className="input-76">
<div className="content-77">
</div>
</div>
</div>
</div>
</div>
</div>
<div className="footer_notifview-78">
<img src="{urlImages}/x-79.png" className="x-79" alt="x" />
<img src="{urlImages}/facebook-80.svg" className="facebook-80" alt="facebook" />
<div className="instagram-81">
<img src="{urlImages}/vector-82.svg" className="vector-82" alt="vector" />
<img src="{urlImages}/vector-83.svg" className="vector-83" alt="vector" />
<img src="{urlImages}/vector-84.svg" className="vector-84" alt="vector" />
</div>
<img src="{urlImages}/rgpd-85.svg" className="rgpd-85" alt="rgpd" />
<img src="{urlImages}/legal-notice-86.svg" className="legal-notice-86" alt="legal-notice" />
<img src="{urlImages}/about-us-87.svg" className="about-us-87" alt="about-us" />
</div>
<div className="avatar-88">
<img src="{urlImages}/shape-89.png" className="shape-89" alt="shape" />
</div>
</div>
<div className="lastname-90"></div>
</div>
</div>



        <div>
            <a href="#" onClick={() => handleActionClick()}> ClickMe </a>
        </div>
        </>
    )
}

export default UserProfile;
