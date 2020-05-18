import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from "react";
import Breakpoint, {
  breakpointEnum,
  lg,
  md,
  sm,
  xl,
  xxl,
} from "../Context/Breakpoint";

const BreakpointCatcher: FunctionComponent = (props) => {
  const breakpoint = useContext(Breakpoint);
  const [BP, setBP] = useState(breakpoint);

  const resizeHandler = () => {
    switch (true) {
      case window.innerWidth < sm:
        return setBP(breakpointEnum.xs);
      case window.innerWidth < md:
        return setBP(breakpointEnum.sm);
      case window.innerWidth < lg:
        return setBP(breakpointEnum.md);
      case window.innerWidth < xl:
        return setBP(breakpointEnum.lg);
      case window.innerWidth < xxl:
        return setBP(breakpointEnum.xl);
      default:
        return setBP(breakpointEnum.xxl);
    }
  };

  useEffect(() => {
    resizeHandler();
  }, []);

  useEffect(() => {
    window.onresize = resizeHandler;
    return () => {
      window.onresize = null;
    };
  }, [BP]);

  return <Breakpoint.Provider value={BP}>{props.children}</Breakpoint.Provider>;
};

export default BreakpointCatcher;
