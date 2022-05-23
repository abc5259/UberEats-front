import { isLoggedInVar } from "../apollo";

export const LoggedInRouter = () => {
  return (
    <div>
      <h1>LoggedInRouter</h1>
      <button onClick={() => isLoggedInVar(false)}>Log Out</button>
    </div>
  );
};
