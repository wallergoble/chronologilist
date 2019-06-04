import React, { Suspense } from "react";
import "./abc-def.css";
import { getCredentialsFromURL } from "../../utils/spotifyCredentials";
const AuthenticatedApp = React.lazy(() =>
  import("../AuthenticatedApp/AuthenticatedApp")
);
const UnauthenticatedApp = React.lazy(() =>
  import("../UnauthenticatedApp/UnauthenticatedApp")
);

const AbcDef: React.FC = () => {
  let credentials = getCredentialsFromURL();

  return (
    <Suspense fallback={<p> Loading... </p>}>
      {credentials ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </Suspense>
  );
};

export default AbcDef;
