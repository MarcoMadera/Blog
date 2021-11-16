import useMounted from "hooks/useMounted";
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
  const mounted = useMounted();
  const { getToolTipAttrbutes } = useToolTip();
  const createdAt =
    typeof window !== "undefined" && mounted ? new Date(created_at) : null;

  const title = `Publicado: ${createdAt?.toLocaleDateString("es", {
    year: "numeric",
    month: "short",
    day: "numeric",
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  })}`;

  return (
    <time dateTime={createdAt?.toISOString()} {...getToolTipAttrbutes(title)}>
      {variant === "short"
        ? getQuotedTwitterFormattedDate(created_at)
        : getTwitterFormattedDate(created_at)}
    </time>
  );
}
