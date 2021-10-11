import useMounted from "hooks/useMounted";
import { ReactElement } from "react";
import { getQuotedTwitterFormattedDate, getTwitterFormattedDate } from "utils";

export default function TweetCreatedAt({
  created_at,
  variant,
}: {
  created_at: string;
  variant?: "short";
}): ReactElement {
  const mounted = useMounted();
  const createdAt =
    typeof window !== "undefined" && mounted ? new Date(created_at) : null;

  return (
    <time
      dateTime={createdAt?.toISOString()}
      title={`Publicado: ${createdAt?.toLocaleDateString("es", {
        year: "numeric",
        month: "short",
        day: "numeric",
        weekday: "long",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })}`}
    >
      {variant === "short"
        ? getQuotedTwitterFormattedDate(created_at)
        : getTwitterFormattedDate(created_at)}
    </time>
  );
}
