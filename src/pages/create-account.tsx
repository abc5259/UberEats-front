import { useMutation } from "@apollo/client";
import Helmet from "react-helmet";
import gql from "graphql-tag";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/button";
import { FormError } from "../components/form-error";
import nuberLogo from "../images/logo.svg";
import { UserRole } from "../__generated__/globalTypes";
import {
  createAccountMutation,
  createAccountMutationVariables,
} from "../__generated__/createAccountMutation";

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccountMutation($createAccountInput: CreateAccountInput!) {
    createAccount(input: $createAccountInput) {
      ok
      error
    }
  }
`;

type Inputs = {
  email: string;
  password: string;
  role: UserRole;
};

export const CreateAccount = () => {
  const navigate = useNavigate();
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<Inputs>({
    mode: "onChange",
    defaultValues: {
      role: UserRole.Client,
    },
  });
  const onCompleted = ({ createAccount: { ok } }: createAccountMutation) => {
    if (ok) {
      alert("Account Created! Log in now!");
      navigate("/", { replace: true });
    }
  };
  const [createAccounMutation, { data: createAccountMutationResult, loading }] =
    useMutation<createAccountMutation, createAccountMutationVariables>(
      CREATE_ACCOUNT_MUTATION,
      {
        onCompleted,
      }
    );
  const onValid: SubmitHandler<Inputs> = createAccountInput => {
    if (!loading) {
      createAccounMutation({
        variables: {
          createAccountInput,
        },
      });
    }
  };
  return (
    <>
      <Helmet>
        <title>Creat Account | UberEats</title>
      </Helmet>
      <div className="h-screen flex items-center flex-col mt-10 lg:mt-28">
        <div className="w-full max-w-screen-sm flex flex-col px-5 items-center">
          <img src={nuberLogo} className="w-52 mb-10" />
          <h4 className="w-full font-medium text-left text-3xl mb-5">
            Let's get started
          </h4>
          <form
            onSubmit={handleSubmit(onValid)}
            className="grid gap-3 mt-5 w-full mb-3"
          >
            <input
              {...register("email", {
                required: "이메일을 적어주세요",
                pattern: {
                  value:
                    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: "이메일 형식이어야 합니다.",
                },
              })}
              type="email"
              placeholder="Email"
              className="input"
            />
            {errors.email?.message && (
              <FormError errorMessage={errors.email?.message} />
            )}
            <input
              {...register("password", {
                required: "password를 적어주세요",
              })}
              type="password"
              placeholder="Password"
              className="input"
            />
            {errors.password?.message && (
              <FormError errorMessage={errors.password?.message} />
            )}
            <select
              {...register("role", {
                required: true,
              })}
              className="input"
            >
              {Object.keys(UserRole).map(role => (
                <option key={role}>{role}</option>
              ))}
            </select>
            <Button
              canClick={isValid}
              loading={loading}
              actionText={"Create Account"}
            />
            {createAccountMutationResult?.createAccount.error && (
              <FormError
                errorMessage={createAccountMutationResult.createAccount.error}
              />
            )}
          </form>
          <div>
            Already have an Account?{" "}
            <Link to="/" className="text-lime-600 hover:underline">
              Log in now
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
