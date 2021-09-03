//import is used to bring in all components classes you need to for the file
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { APIResponse, Game } from 'src/app/models';
import { HttpService } from 'src/app/services/http.service';

//All components were generated through angular CLI
//The following commands are all performed in the VB terminal
//to create a new project enter the command 'ng new' followed by the name of your project
//to choose the style format of your webpages enter command '--style=scss'
//command 'ng serve' makes the webpage accessible on localhost42000
//to change file location use command 'cd'
//to go up a file path use command 'cd ..'
// to make new directories such as components or services, use command 'mkdir'
// to generate a new section in a directory use command 'ng g _'
//Wow so much work
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit, OnDestroy {
  //attaches mat-select sort to home component
  public sort!: string;
  public games!: Array<Game>;
  private routeSub!: Subscription;
  private gameSub!: Subscription;

  constructor(
    private httpService: HttpService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  //'metacrit is a sorting parameter
  //'game-search'is a searching parameter
  ngOnInit(): void {
    this.routeSub = this.activatedRoute.params.subscribe((params: Params) => {
      if(params['game-search']) {
        this.searchGames('metacrit', params['game-search']);
      }else{
        this.searchGames('metacrit');
      }
    });     
  }

  searchGames(sort: string, search?: string): void{
    this.gameSub = this.httpService
      .getGameList(sort, search)
      .subscribe((gameList: APIResponse<Game>) => {
        this.games = gameList.results;
        console.log(gameList);
      });
  }


  openGameDetails(id: string): void {
    this.router.navigate(['details',id]);
  }

  ngOnDestroy(): void {
    if(this.gameSub) {
      this.gameSub.unsubscribe();
    }

    if(this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }

}


