import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { ViewOneComponent } from './view-one/view-one.component';
import { ViewOneChild1Component } from './view-one-child1/view-one-child1.component';


const routes: Routes = [
    {path: "", component: HomepageComponent},
    {
        path:"view-one",
        component: ViewOneComponent,
        children: [
            {path: ":name", component: ViewOneChild1Component}
        ]
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [HomepageComponent, ViewOneComponent]
