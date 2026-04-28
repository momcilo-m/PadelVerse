import { ErrorHandler, inject, Injectable, NgZone, Provider } from "@angular/core";
import { Router } from "@angular/router";
import { NotificationService } from "../services/notification.service";

@Injectable({
    providedIn: 'root'
})
export class SimpleErrorHandler implements ErrorHandler {

    constructor() { }
    private router = inject(Router)
    private notificationService = inject(NotificationService)

    private unprotected = ["/", "/home", "/complex",'/matches'];
    private unprotectedIndexed = ["/complex/","/match/"]

    handleError(error: any): void {

        const currentUrl = this.router.url;

        console.log(currentUrl)

        const isUnprotected =
            this.unprotected.includes(currentUrl) ||
            this.unprotectedIndexed.some(path => currentUrl.startsWith(path));

        // console.log("a", !(this.router.url === "/" || this.router.url === "home"))
        // console.log(error, this.router.url)

        console.log(error.statusCode === 401, !isUnprotected)
        //Greska sa servera
        if (error.statusCode === 401 && !isUnprotected) {
            this.notificationService.error(error.message)
            this.router.navigate(['/login']);
        }
        //Greska clijenta
        else if(error.statusCode === 411)
        {
            this.notificationService.error(error.message)
            this.router.navigate(['/login']);
        }
        else if (error.statusCode === 404) {
            this.notificationService.error(error.message)
            this.router.navigate(['/home']);
        }
        else if (error.statusCode === 500) {
            this.notificationService.error("Internal server error")
        }
        else if (error.statusCode === 600) {
            this.notificationService.success(error.message)
            this.router.navigate(['/profile']);
        }
        else {
            console.log("default")
        }
    }
}