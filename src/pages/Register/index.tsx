import RegisterForm from "./RegisterForm";

const Register = () => {
  return (
    <div className="flex flex-col h-full items-center justify-center bg-black p-4">
      <img
        src="https://www.supermarketperimeter.com/ext/resources/2023/01/06/TikTok_Logo.jpg?height=844&t=1673020601&width=844"
        className="h-[250px] aspect-square object-cover"
        alt=""
      />
      <RegisterForm />
    </div>
  );
};

export default Register;
