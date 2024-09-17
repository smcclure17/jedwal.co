export interface CardHolderProps {
  children: React.ReactNode;
}

export const CardHolder = ({ children }: CardHolderProps) => {
  return (
    <div className="flex flex-col space-y-8 sm:space-y-0 sm:flex-row sm:space-x-8 sm:max-w-full">
      {children}
    </div>
  );
};
