import { Key } from '../../../models/keys/key.model';
import { Component, OnInit, Input } from '@angular/core';
import { cosmosclient } from 'cosmos-client';

@Component({
  selector: 'view-key',
  templateUrl: './key.component.html',
  styleUrls: ['./key.component.css'],
})
export class KeyComponent implements OnInit {
  @Input()
  key?: Key | null;

  @Input()
  accAddress?: cosmosclient.AccAddress | null;

  @Input()
  valAddress?: cosmosclient.ValAddress | null;

  constructor() {}

  ngOnInit(): void {}
}