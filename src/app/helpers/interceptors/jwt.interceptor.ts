import { HttpInterceptorFn } from '@angular/common/http';
import { User } from '../../interfaces/user';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const currentUser = localStorage.getItem("currentUser");
  const parsedUser: User | null = currentUser ? JSON.parse(currentUser) : null;

  if (currentUser && parsedUser?.token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${parsedUser?.token}`
      }
    });
  }

  return next(req);
};
