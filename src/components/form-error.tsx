interface IFormErrorProps {
  errorMessage: string;
}

export const FormError = ({ errorMessage }: IFormErrorProps) => {
  return <span className="font-medium text-red-500">{errorMessage}</span>;
};
