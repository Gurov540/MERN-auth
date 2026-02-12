import "./App.css";

import { Button } from "./shared/ui/Button";
import { Input } from "./shared/ui/Input";

function App() {
  return (
    <>
      <Button type="submit">Регистрация</Button>
      <Input type="email" placeholder="Login" fullWidth></Input>
    </>
  );
}

export default App;
