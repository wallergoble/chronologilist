import React, { Suspense } from "react";
import "./asdf-qwer.css";
import { getCredentialsFromURL } from "../../utils/spotifyCredentials";
const AuthenticatedApp = React.lazy(() =>
  import("../AuthenticatedApp/AuthenticatedApp")
);
const UnauthenticatedApp = React.lazy(() =>
  import("../UnauthenticatedApp/UnauthenticatedApp")
);

const AsdfQwer: React.FC = () => {
  let credentials = getCredentialsFromURL();

  return (
    <Suspense fallback={<p> Loading... </p>}>
      {credentials ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </Suspense>
  );
};

export default AsdfQwer;
