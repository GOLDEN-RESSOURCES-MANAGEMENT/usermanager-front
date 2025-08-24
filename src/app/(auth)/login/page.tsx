"use client";
import Buttons from "@/components/Buttons";
import Icon from "@/components/Icon";
import Image from "next/image";
import React from "react";
import { GoShieldLock } from "react-icons/go";

const Login = () => {
  return (
    <div className="grid gap-3 grid-cols-1   lg:grid-cols-2 2xl:grid-cols-3 w-screen h-screen ">
      <div className=" py-2 flex-col flex items-center xl:items-end justify-around">
        <Form />
      </div>
      <div className="2xl:col-span-2 hidden lg:flex  items-center justify-around">
        <div className="  relative h-full w-full mx-5 xl:w-1/2">
          <Image src={"/login/undraw_safe_0mei.svg"} alt="Image" fill />
        </div>
      </div>
    </div>
  );
};

export default Login;

const Form = () => {
  return (
    <form action="" className="bg-white" method="">
      <div className="space-y-5">
        {/* En tete du formulaire */}
        <div className="text-center">
          <Icon size="ultrabig">
            <GoShieldLock />
          </Icon>
          <div className="text-center text-2xl">
            Le <span className="font-bold italic">Super</span> gestionnaire
            d'utilisateur
          </div>
        </div>
        {/* Champ de validation du formulaire */}
        <div className="">
          <div className="text-xl">Connectez-vous a votre compte</div>
        </div>
        <div className="w-[350px] space-y-8">
          {/* Email */}
          <div className="space-y-2 ">
            <div>
              <label className="" htmlFor="email">
                Email
              </label>
            </div>
            <div>
              <input
                className="border border-gray-300 shadow rounded-lg w-full h-11 px-2 "
                type="text"
                name=""
                id=""
              />
            </div>
          </div>
          {/* Mot de passe */}
          <div className="space-y-2 ">
            <div>
              <label htmlFor="email">Mot de passe</label>
            </div>
            <div>
              <input
                className="border border-gray-300 shadow rounded-lg w-full h-11 px-2 "
                type="text"
                name=""
                id=""
              />
            </div>
          </div>
          {/* Soumission du formulaire */}
          <div className="">
            <Buttons type="primary" variant="solid" title="Se connecter" />
            {/* <button className="bg-primary text-white font-semibold h-11 rounded-lg w-full">
              Se connecter
            </button> */}
          </div>
        </div>
      </div>
    </form>
  );
};
