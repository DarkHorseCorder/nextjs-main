export const messageHandler = (
  notifyHadler: any,
  message: string,
  type: string,
  callback?: Function
) => {
  notifyHadler(message, { type });
  callback && callback();
};

export const capitalizeFirstLetter = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const getSubPath = (fullPath: string, subPathFormat: string) => {
  const slashLenInFullPath = (fullPath.match(/\//g) || []).length;
  const slashLenInSubPathFormat = (subPathFormat.match(/\//g) || []).length;
  if (slashLenInFullPath === slashLenInSubPathFormat) return fullPath;
  else {
    const token = fullPath.split("/").slice(0, slashLenInSubPathFormat + 1);
    return token.join("/");
  }
};

export * from "./validators";
