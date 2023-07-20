export const changeRole = (role: number) =>
  ({
    1: "權限管理員",
    2: "員工",
    3: "一般用戶",
  }[role] ?? []);

export const getTextLimit = (limit: number, str: string) => {
  var rex = /[^\x00-\xff]/g;
  return limit * 2 - (str?.match(rex)?.length ?? 0);
};

export const fontCount = (str: string | undefined) => {
  var rex = /[^\x00-\xff]/g;
  return str?.replace(rex, "OO").length ?? 0;
};
