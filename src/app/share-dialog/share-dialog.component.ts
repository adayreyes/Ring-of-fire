import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {TooltipPosition} from '@angular/material/tooltip';
import { ClipboardService } from 'ngx-clipboard';


@Component({
  selector: 'app-share-dialog',
  templateUrl: './share-dialog.component.html',
  styleUrls: ['./share-dialog.component.scss']
})
export class ShareDialogComponent implements OnInit {

  public path:string = window.location.href;
  constructor( private clipboardApi: ClipboardService) { 

  }

  ngOnInit(): void {
    
}

copyLink(){
  this.clipboardApi.copyFromContent(this.path)
}

}
