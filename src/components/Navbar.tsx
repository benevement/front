import * as z from "zod/v4";
 
const User = z.object({
  name: z.string(),
});
 
// some untrusted data...
const input = { name:"lalalalalalalalalalalalalalalalalalalalala" };
 
// the parsed result is validated and type safe!
const data = User.parse(input);
 
// so you can use it with confidence :)
console.log(data.name);



const Navbar = () => {
  return (
    <div>Navbar</div>
  )
}

export default Navbar