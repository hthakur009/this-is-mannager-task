
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export default function middleware(request: NextRequest) {
 
    const authToken = request.cookies.get("loginToken")?.value;
    if(request.nextUrl.pathname=="/api/loging" || request.nextUrl.pathname == "/api/users"){
        return;
    }
    const logingUserAccessPath = request.nextUrl.pathname === "/loginPage" ||
                                 request.nextUrl.pathname === "/singup";
    
    if(logingUserAccessPath){
        if(authToken){
            return NextResponse.redirect(new URL("/users", request.url));
        }
    }else{
            if(!authToken){
                if(request.nextUrl.pathname.startsWith("/api")){
                    return NextResponse.json({
                        message:"access denide!!",
                        success:false
                    })
                }
                return NextResponse.redirect(new URL("/loginPage", request.url));
            }
        }
    
    return NextResponse.next();
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/','/loginPage','/singup','/addTask', '/showTask','/api/:path*']
}