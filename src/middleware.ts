export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/", "/inventory", "/settings"],
};
