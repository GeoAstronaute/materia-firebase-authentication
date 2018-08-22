import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'fa-get-started',
  templateUrl: './get-started.component.html',
  styleUrls: ['./get-started.component.scss']
})
export class GetStartedComponent implements OnInit {
  @Output() openInBrowser = new EventEmitter<string>();
  @Output() openSetup = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }

}
