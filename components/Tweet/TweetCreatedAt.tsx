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
  const { getToolTipAttrbutes } = useToolTip();
  const [createdAt, setCreatedAt] = useState<Date | undefined>(undefined);

  useEffect(() => {
    if (created_at && window) {
      setCreatedAt(new Date(created_at));
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
    <time dateTime={createdAt?.toISOString()} {...getToolTipAttrbutes(title)}>
      {variant === "short"
        ? getQuotedTwitterFormattedDate(created_at)
        : getTwitterFormattedDate(created_at)}
    </time>
  );
}
