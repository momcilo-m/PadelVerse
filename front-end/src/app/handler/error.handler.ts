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

    handleError(error: any): void {

        console.log(error)

        if (error.statusCode === 401 && !(this.router.url === "/" || this.router.url === "home")) {
            this.notificationService.error(error.message)
            this.router.navigate(['/login']);
        }
        else if (error.statusCode === 404) {
            this.notificationService.error(error.message)
            this.router.navigate(['/']);
        }
        else if (error.statusCode === 500) {
            this.notificationService.error("Internal server error")
        }
        else if (error.statusCode === 600) {
            this.notificationService.success(error.message)
            this.router.navigate(['/profile']);
        }
    }
}