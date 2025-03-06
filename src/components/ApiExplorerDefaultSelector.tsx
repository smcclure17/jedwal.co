import { Spinner } from "./Spinner";

export const ApiExplorerDefaultSelector = () => {
  return (
    <div className="bg-white w-full rounded-lg shadow-xs h-96 flex items-center justify-center">
      <span className="text-center">
        Select or create an API to get started
      </span>
    </div>
  );
};

export const ApiExplorerLoading = () => {
  return (
    <div className="bg-white w-full rounded-lg shadow-xs h-96 flex min-h-72 items-center justify-center">
      <span className="text-center">
        <Spinner srText="Loading API details..." />
      </span>
    </div>
  );
};

export const ApiExplorerNotFound = () => {
  return (
    <div className="bg-white w-full rounded-lg shadow-xs h-96 flex items-center justify-center">
      <span className="text-center">API Not Found</span>
    </div>
  );
};
