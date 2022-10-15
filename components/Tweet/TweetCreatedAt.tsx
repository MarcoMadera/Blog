import useToolTip from "hooks/useToolTip";
import { ReactElement, useEffect, useState } from "react";
import { getQuotedTwitterFormattedDate, getTwitterFormattedDate } from "utils";

export default function TweetCreatedAt({
  created_at,
  variant,
}: {
  created_at: string;
  variant?: "short";
}): ReactElement {
  const { getToolTipAttributes } = useToolTip();
  const [createdAt, setCreatedAt] = useState<Date | undefined>(undefined);
  const [createdAtIsoString, setCreatedAtIsoString] = useState<
    string | undefined
  >(undefined);

  useEffect(() => {
    if (created_at && window) {
      setCreatedAt(new Date(created_at));
      setCreatedAtIsoString(new Date(created_at)?.toISOString());
    }
  }, [created_at]);

  const title = `Publicado: ${
    createdAt
      ? createdAt?.toLocaleDateString("es", {
          year: "numeric",
          month: "short",
          day: "numeric",
          weekday: "long",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      : ""
  }`;

  return (
    <time dateTime={createdAtIsoString} {...getToolTipAttributes(title)}>
      {createdAtIsoString &&
        (variant === "short"
          ? getQuotedTwitterFormattedDate(createdAtIsoString)
          : getTwitterFormattedDate(createdAtIsoString))}
    </time>
  );
}
