import { useState } from "react";
import { Input } from "../../shared/ui/Input";
import { Button } from "../../shared/ui/Button";

// import { useAuthStore } from "../../store/authStore.js";

const LoginPage = () => {
  // const [email, setEmail] = useState("");
  // const [password, setPasswoed] = useState("");

  // const { login, isLoading, error } = useAuthStore();

  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   await LoginPage(email, password);
  // };

  return (
    <form>
      <Input type="email" placeholder="Email Address"></Input>
      <Input type="password" placeholder="Password"></Input>
      <Button>Login</Button>
    </form>
  );
};

export default LoginPage;
