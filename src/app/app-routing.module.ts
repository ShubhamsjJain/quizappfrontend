import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './pages/signup/signup.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { adminGuard } from './services/admin.guard';
import { userGuard } from './services/user.guard';
import { ProfileComponent } from './pages/profile/profile.component';
import { WelcomeComponent } from './pages/user/welcome/welcome.component';
import { WelcomeAdminComponent } from './pages/admin/welcome-admin/welcome-admin.component';
import { ViewCategoriesComponent } from './pages/admin/view-categories/view-categories.component';
import { AddCategoryComponent } from './pages/admin/add-category/add-category.component';
import { ViewQuizzesComponent } from './pages/admin/view-quizzes/view-quizzes.component';
import { AddQuizComponent } from './pages/admin/add-quiz/add-quiz.component';
import { UpdateQuizComponent } from './pages/admin/update-quiz/update-quiz.component';
import { ViewQuestionsComponent } from './pages/admin/view-questions/view-questions.component';
import { AddQuestionComponent } from './pages/admin/add-question/add-question.component';
import { LoadQuizComponent } from './pages/user/load-quiz/load-quiz.component';
import { QuizInstructionsComponent } from './pages/user/quiz-instructions/quiz-instructions.component';
import { StartQuizComponent } from './pages/user/start-quiz/start-quiz.component';

const routes: Routes = [

  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
    

  },

  {

    path: 'signup',
    component: SignupComponent,
    pathMatch: 'full',
    

  },

  {

    path: 'login',
    component: LoginComponent,
    pathMatch: 'full',


  },

  {
    path: 'admin',
    component: DashboardComponent,
    canActivate: [adminGuard],
    children:[
      {
        path:'profile',
        component:ProfileComponent,
      },
      {
        path:'',
        component:WelcomeAdminComponent,
      },
      {
        path:'categories',
        component:ViewCategoriesComponent,
        children:[
          {
            path:'add',
            component:AddCategoryComponent,
          }
        ]
      },
      {
        path:'add-category',
        component:AddCategoryComponent,
      },
      {
        path:'view-quizzes',
        component:ViewQuizzesComponent,
      
      },
      {
        path:'add-quiz',
        component:AddQuizComponent,
      },
      {
        path:'update-quiz/:quiz_id',
        component:UpdateQuizComponent,
      },
      {

        path:'view-questions/:quiz_id/:title',
        component:ViewQuestionsComponent,

      },
      {

        path:'add-question/:quiz_id/:title',
        component:AddQuestionComponent,

      },

      
      
      
    ]
    

  },

  {
    path: 'user-dashboard',
    component: UserDashboardComponent,
    canActivate: [userGuard],
    children:[
      {
        path:'profile',
        component:ProfileComponent,
      },
      {
        path:'',
        component:WelcomeComponent,
      },
      {
        path:'quiz/:cat_id',
        component:LoadQuizComponent,
      },
      {
        path:'questions/:quiz_id',
        component:QuizInstructionsComponent,
      },
      
    ]
    

  },

  {
    path:'start/:quiz_id',
    component:StartQuizComponent,
    canActivate: [userGuard],
  },

  


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
