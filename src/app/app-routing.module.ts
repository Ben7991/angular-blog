import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { CategoriesComponent } from './pages/admin/categories/categories.component';
import { TagsComponent } from './pages/admin/tags/tags.component';
import { PostsComponent } from './pages/admin/posts/posts.component';
import { CommentsComponent } from './pages/admin/comments/comments.component';
import { UsersComponent } from './pages/admin/users/users.component';
import { CreateCategoryComponent } from './pages/admin/categories/create-category/create-category.component';
import { EditCategoryComponent } from './pages/admin/categories/edit-category/edit-category.component';
import { CreateTagComponent } from './pages/admin/tags/create-tag/create-tag.component';
import { EditTagComponent } from './pages/admin/tags/edit-tag/edit-tag.component';
import { CreatePostComponent } from './pages/admin/posts/create-post/create-post.component';
import { EditPostComponent } from './pages/admin/posts/edit-post/edit-post.component';
import { EditCommentComponent } from './pages/admin/comments/edit-comment/edit-comment.component';
import { CreateUserComponent } from './pages/admin/users/create-user/create-user.component';
import { EditUserComponent } from './pages/admin/users/edit-user/edit-user.component';
import { ProfileComponent } from './pages/admin/profile/profile.component';
import { userResolver } from './pages/admin/users/user.resolver';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';

const appRoute: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      { path: '', component: DashboardComponent, pathMatch: 'full' },
      { path: 'categories', component: CategoriesComponent },
      { path: 'categories/create', component: CreateCategoryComponent },
      { path: 'categories/:id', component: EditCategoryComponent },
      { path: 'tags', component: TagsComponent },
      { path: 'tags/create', component: CreateTagComponent },
      { path: 'tags/:id', component: EditTagComponent },
      { path: 'posts', component: PostsComponent },
      { path: 'posts/create', component: CreatePostComponent },
      { path: 'posts/:id', component: EditPostComponent },
      { path: 'comments', component: CommentsComponent },
      { path: 'comments/:id', component: EditCommentComponent },
      {
        path: 'users',
        component: UsersComponent,
        resolve: { users: userResolver },
      },
      { path: 'users/create', component: CreateUserComponent },
      {
        path: 'users/:id',
        component: EditUserComponent,
        resolve: { users: userResolver },
      },
      { path: 'profile', component: ProfileComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoute)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
