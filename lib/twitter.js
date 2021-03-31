export async function getTweetData(id) {
  const result = await fetch(
    `https://api.twitter.com/2/tweets/${id}?&tweet.fields=attachments,author_id,context_annotations,entities,created_at,public_metrics,source&expansions=attachments.media_keys&media.fields=width,height,preview_image_url,type`,
    {
      headers: {
        authorization: `Bearer ${process.env.TWITTER_API_TOKEN}`,
      },
    }
  );
  const data = await result.json();
  return data;
}
