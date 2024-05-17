import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../includes/components/Header";

const Profile = () => {
  const name = sessionStorage.getItem("name");
  const book=sessionStorage.getItem("bookedShow")
  


  return (
    <div>
      <Header />
      <div className="text-center w-100 p-3" style={{ backgroundColor: "rgb(17,17,17)" }}>
        <p className="h1">Ahoy, {name}!</p>
      </div>
    </div>
  );
};

export default Profile;
