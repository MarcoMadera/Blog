import { useDate } from "hooks/useDate";
import useToolTip from "hooks/useToolTip";
import { ReactElement } from "react";
import { getQuotedTwitterFormattedDate, getTwitterFormattedDate } from "utils";

export default function TweetCreatedAt({
  created_at,
  variant,
}: {
  created_at: string;
  variant?: "short";
}): ReactElement {
  const { getToolTipAttributes } = useToolTip();
  const { date, isoString } = useDate(created_at);

  const title = `Publicado: ${
    date
      ? date.toLocaleDateString("es", {
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
    <time
      dateTime={isoString}
      className="dt-published"
      {...getToolTipAttributes(title)}
    >
      {date &&
        (variant === "short"
          ? getQuotedTwitterFormattedDate(date)
          : getTwitterFormattedDate(date))}
    </time>
  );
}
