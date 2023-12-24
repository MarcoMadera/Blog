export default function convertParamsToObject(params: unknown): object {
  if (typeof params !== "string") return {};
  const paramsArray = params.split("&");
  const paramsObject = paramsArray.reduce((acc, param) => {
    const [key, value] = param.split("=");
    return { ...acc, [key]: value };
  }, {});
  return paramsObject;
}
