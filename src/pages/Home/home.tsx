import "../../index.scss";

type Props = {
  user: string;
  onLogout: () => void;
};

export default function Home({ user, onLogout }: Props) {
  return (
    <div className="terminal">
      <h1>WELCOME, {user.toUpperCase()}</h1>
      <p>Balance: $1,234.56</p>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
}
