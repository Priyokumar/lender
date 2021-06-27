import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  { path: "", redirectTo: "/login", pathMatch: "full" },
  {
    path: "login",
    loadChildren: () =>
      import("./modules/auth/auth.module").then((module) => module.AuthModule),
  },
  {
    path: "dashboard",
    loadChildren: () =>
      import("./modules/dashboard/dashboard.module").then(
        (module) => module.DashboardModule
      ),
  },
  {
    path: "security",
    loadChildren: () =>
      import("./modules/security/security.module").then(
        (module) => module.SecurityModule
      ),
  },
  {
    path: "customers",
    loadChildren: () =>
      import("./modules/customer/customer.module").then(
        (module) => module.CustomerModule
      ),
  },
  {
    path: "products",
    loadChildren: () =>
      import("./modules/product/product.module").then(
        (module) => module.ProductModule
      ),
  },
  {
    path: "leads",
    loadChildren: () =>
      import("./modules/lead/lead.module").then((module) => module.LeadModule),
  },
  {
    path: "accounts",
    loadChildren: () =>
      import("./modules/account/account.module").then(
        (module) => module.AccountModule
      ),
  },
  {
    path: "repayments",
    loadChildren: () =>
      import("./modules/repayment/repayment.module").then(
        (module) => module.RepaymentModule
      ),
  },
  {
    path: "customer360",
    loadChildren: () =>
      import("./modules/customer360/customer360.module").then(
        (module) => module.Customer360Module
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
