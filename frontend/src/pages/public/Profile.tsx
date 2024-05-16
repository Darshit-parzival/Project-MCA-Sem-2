import Header from "../includes/components/Header"

const Profile = () => {
  const Name = sessionStorage.getItem("name");
  return (
    <div>
      <Header />
      <div
        className="text-center w-100 p-3"
        style={{ backgroundColor: "rgb(17,17,17)" }}
      >
        <p className="h1">Ahoy, {Name}!</p>
      </div>
    </div>
  )
}

export default Profile