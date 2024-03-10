// icons
import { ImSpinner3 as SpinnerIcon } from "react-icons/im";

const Loader = () => {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <p className="flex items-center gap-2">
        <SpinnerIcon className="animate-spin" />
        <strong>Loading...</strong>
      </p>
    </div>
  );
};

export default Loader;
