import React,{useState} from "react";
import Swal from "sweetalert2";
import axios from 'axios';

const Form=()=>{
    const [email, setEmail] = useState("");
    const [pass, setPassword] = useState("");
    const viewUser = async (e) => {
        try {
          e.preventDefault();
          const emailck = { email };
          const password={pass};
          const userObject = {
            email:"sfsfds",
            pass:"sfsdfsdf"
        };
        // const register = await axios({
        //     method: 'post',
        //     url: 'http://localhost:5000/signup',
        //     data: {
        //       email:"qwertyu@gmail.com",
        //       password: "123"
        //     }
        //   });
        //   console.log(register);
 
          await axios.post('http://localhost:5000/signup', userObject)
            .then((res) => {
                console.log(res.data)
            }).catch((error) => {
                console.log(error)
            });
         // const response = await client.request(USER_EXISTS_QUERY, emailck);
        //   if (response.userExists) {
        //     Swal.fire({
        //       icon: "success",
        //       title: "Great",
        //       text: "Thank You!",
        //     });
        //   } else {
        //     Swal.fire({
        //       icon: "error",
        //       title: "Opps...",
        //       text: "Please register with us!",
        //     });
        //   }
          //console.log({ response });
        } catch (err) {
          console.log(err);
        }
      };

    return (
    <form className="container" onSubmit={viewUser}>
      <div className="form-group">
        <label htmlFor="exampleInputEmail1">Email address</label>
        <input
          type="email"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <label htmlFor="exampleInputEmail1">Password</label>
        <input
          type="password"
          className="form-control"
          id="exampleInputPassword"
          aria-describedby="passwordHelp"
          value={pass}
          onChange={e => setPassword(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
    );

}

export default Form;