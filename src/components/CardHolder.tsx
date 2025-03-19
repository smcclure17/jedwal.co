export interface CardHolderProps {
  children: React.ReactNode;
}

export const CardHolder = ({ children }: CardHolderProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-4 sm:px-0 justify-items-center md:w-4/5 mx-auto">
      {children}
    </div>
  );
};
