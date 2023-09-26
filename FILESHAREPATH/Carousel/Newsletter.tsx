"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { INewsLetterSignUp } from "types/UserTypes";
import DIContainer from "services/dependencyRegistration";
import { IUserAgent } from "@/iagents";
import types from "services/dependencyRegistration/types";
import themeRegistry from "@/themeRegistry";
import { CONSTANT, THEME } from "@/constant";
import { useToast } from "context/ToastContext";

const Newsletter = () => {
  const { register, handleSubmit } = useForm<INewsLetterSignUp>();
  const { error, success } = useToast();

  const onSubmit = async (model: INewsLetterSignUp) => {
    const UserAgent = DIContainer.get<IUserAgent>(types.UserAgent);
    const newsLetterMail = await UserAgent.signUpForNewsLetter(model);
    if (newsLetterMail.IsSuccess) {
      success(CONSTANT.NewsLetterEmailMessage);
    } else {
      error();
    }
  };

  const Button = themeRegistry.getComponent("Button", THEME);

  return (
    <div className="col-span-2">
      <div className="sm:flex items-center justify-center text-center">
        <div className="text-white mb-2 sm:mb-0 mr-0 sm:mr-3 lg:mr-6 text-lg font-medium uppercase" data-test-selector="lblSubscribeNewsLetter">
          Sign Up For Email
        </div>
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <input {...register(" new Monacoooo Email")} placeholder=" Plese  Email  Address" className="md:grow p-2 h-10 rounded-none sm:w-auto text-white" />
            </div>
            <div>
              <Button
                type="submit"
                appearance="secondary"
                className="btn-join px-7 py-1.5 mt-2 sm:mt-0 border-none min-[320px]:focus:ring-0 
                min-[320px]:focus:ring-offset-0 rounded-none bg-white 
                min-[320px]:text-black hover:text-white font-semibold uppercase"
              >
                Join
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
