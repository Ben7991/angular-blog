import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AppRoutingModule } from './app-routing.module';
import { CategoriesComponent } from './pages/admin/categories/categories.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { TagsComponent } from './pages/admin/tags/tags.component';
import { PostsComponent } from './pages/admin/posts/posts.component';
import { CommentsComponent } from './pages/admin/comments/comments.component';
import { UsersComponent } from './pages/admin/users/users.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { ModelSummaryComponent } from './components/model-summary/model-summary.component';
import { SummaryComponent } from './components/model-summary/summary/summary.component';
import { CreateCategoryComponent } from './pages/admin/categories/create-category/create-category.component';
import { GoBackComponent } from './components/go-back/go-back.component';
import { EditCategoryComponent } from './pages/admin/categories/edit-category/edit-category.component';
import { CreateTagComponent } from './pages/admin/tags/create-tag/create-tag.component';
import { EditTagComponent } from './pages/admin/tags/edit-tag/edit-tag.component';
import { CreatePostComponent } from './pages/admin/posts/create-post/create-post.component';
import { EditPostComponent } from './pages/admin/posts/edit-post/edit-post.component';
import { EditCommentComponent } from './pages/admin/comments/edit-comment/edit-comment.component';
import { CreateUserComponent } from './pages/admin/users/create-user/create-user.component';
import { EditUserComponent } from './pages/admin/users/edit-user/edit-user.component';
import { ProfileComponent } from './pages/admin/profile/profile.component';
import { AlertModalComponent } from './components/alert-modal/alert-modal.component';
import { AlertModalDirective } from './shared/directives/alert-modal.directive';
import { UpperCaseFirstLetterPipe } from './shared/pipes/upper-case-first-letter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    CategoriesComponent,
    DashboardComponent,
    TagsComponent,
    PostsComponent,
    CommentsComponent,
    UsersComponent,
    PageHeaderComponent,
    ModelSummaryComponent,
    SummaryComponent,
    CreateCategoryComponent,
    GoBackComponent,
    EditCategoryComponent,
    CreateTagComponent,
    EditTagComponent,
    CreatePostComponent,
    EditPostComponent,
    EditCommentComponent,
    CreateUserComponent,
    EditUserComponent,
    ProfileComponent,
    AlertModalComponent,
    AlertModalDirective,
    UpperCaseFirstLetterPipe,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
