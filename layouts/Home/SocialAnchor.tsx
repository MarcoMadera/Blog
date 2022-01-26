import useAnalytics from "hooks/useAnalytics";
import { PropsWithChildren, ReactElement } from "react";
import { A } from "components/tags";
import { HitType } from "types/analytics";

interface SocialAnchorProps {
  socialNetwork: string;
  socialTarget: string;
}

export function SocialAnchor({
  children,
  socialNetwork,
  socialTarget,
}: PropsWithChildren<SocialAnchorProps>): ReactElement {
  const { trackWithGoogleAnalytics } = useAnalytics();
  return (
    <A
      href={socialTarget}
      aria-label={`Página de ${socialNetwork}`}
      title={socialNetwork}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => {
        trackWithGoogleAnalytics(HitType.SOCIAL, {
          socialAction: "click",
          socialNetwork: socialNetwork,
          socialTarget: socialTarget,
        });
      }}
    >
      {children}
    </A>
  );
}
