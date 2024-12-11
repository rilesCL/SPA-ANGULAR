import { Routes } from '@angular/router';
import { IntroComponent } from './components/intro/intro.component';
import { EnregistrementComponent } from './components/enregistrement/enregistrement.component';
import { CommentairesComponent } from './components/commentaires/commentaires.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { MytimeComponent } from './components/mytime/mytime.component';
import { AideComponent } from './aide/aide.component';
import { CaptureComponent } from './components/capture/capture.component';

export const routes: Routes = [
    
    {path: '', redirectTo: 'mytime', pathMatch: 'full'},
    {path: 'mytime', component: MytimeComponent,
    children: [
        {path: '', component: IntroComponent},
        {path: 'comments', component: CommentairesComponent},
        {path: 'capture', component: CaptureComponent},
        {path: 'aide', component: AideComponent
            ,children: [ { path: '', redirectTo: 'general', pathMatch: 'full' },
          { path: ':topic', component: AideComponent },
         /* { path: 'general', component: AideComponent },
          { path: 'saisie', component: AideComponent },
          { path: 'widget', component: AideComponent },
          { path: 'categories', component: AideComponent },
          { path: 'rapports', component: AideComponent } */
        ]
        }
    ]
    },
    {path: 'enregistrement', component: EnregistrementComponent},
    {path: 'not-found', component: PageNotFoundComponent},
    {path:'**', component: PageNotFoundComponent}
    
];
