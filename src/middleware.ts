import { cookies } from "next/headers";
import { NextResponse, NextRequest } from "next/server";
import { decrypt } from "./libs/session";
import { publicDecrypt } from "crypto";
import { getData } from "./libs/fetchData";

const publicRouteList = ["/login"];
export async function middleware(request: NextRequest) {
  // Vérification de la validité du token de l'utilisateur

  await getData({ endpoint: "/users", method: "GET" });
  // Récupération de la session de l'utilsiateur
  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);
  // Redirection vers la route appropiée
  const isPublicRoute = publicRouteList.includes(request.nextUrl.pathname);
  if (isPublicRoute && session?.data) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (!isPublicRoute && !session?.data) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|login/*.*|favicon.ico).*)", // tout sauf fichiers système et API
  ],
};
