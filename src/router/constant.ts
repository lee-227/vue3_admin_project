export const LAYOUT = () => import("@/layouts/default/index");
export const getParentLayout = (name: string) => {
  return () =>
    new Promise(resolve => {
      resolve({
        ...{},
        name
      });
    });
};
export const PAGE_NOT_FOUND_ROUTE = {name:''};
