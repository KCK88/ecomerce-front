import {type ReactNode, useMemo} from "react";
import debounce from 'lodash.debounce';

interface ButtonProps {
  // color: string;
  // hoverColor: string;
  // textColor: string;
  children: ReactNode;
  onClick: () => void;
  [key: string]: any;
}

export default function CustButton({ children, onClick, ...props }: ButtonProps) {
  const debouncedOnClick = useMemo(
    () => debounce(onClick, 500),
    [onClick]
  );

  return (
    <button
      onClick={debouncedOnClick}
      {...props}
    >
      {children}
    </button>
  );
}