import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { cosmosclient, rest } from 'cosmos-client';
import {
  CosmosDistributionV1beta1QueryDelegationTotalRewardsResponse,
  QueryValidatorDelegationsResponseIsResponseTypeForTheQueryValidatorDelegationsRPCMethod,
} from 'cosmos-client/cjs/openapi/api';
import { CosmosSDKService } from 'projects/cosmoscan/src/model/cosmos-sdk.service';
import { combineLatest, Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-staking',
  templateUrl: './staking.component.html',
  styleUrls: ['./staking.component.css'],
})
export class StakingComponent implements OnInit {
  totalrewards$: Observable<CosmosDistributionV1beta1QueryDelegationTotalRewardsResponse>;
  eachrewards$: Observable<QueryValidatorDelegationsResponseIsResponseTypeForTheQueryValidatorDelegationsRPCMethod>;

  constructor(private readonly route: ActivatedRoute, private readonly cosmosSDK: CosmosSDKService) {
    const accAddress$ = this.route.params.pipe(
      map((params) => params.address),
      map((addr) => cosmosclient.AccAddress.fromString(addr)),
    );
    const valAddress$ = accAddress$.pipe(map((addr) => addr.toValAddress()));
    const combined$ = combineLatest([this.cosmosSDK.sdk$, accAddress$, valAddress$]);

    this.totalrewards$ = combined$.pipe(
      mergeMap(([sdk, accAddress]) => rest.cosmos.distribution.delegationTotalRewards(sdk.rest, accAddress)),
      map((res) => res.data),
    );

    this.eachrewards$ = combined$.pipe(
      mergeMap(([sdk, accAddress, valAddress]) => rest.cosmos.distribution.delegationRewards(sdk.rest, accAddress, valAddress)),
      map((res) => res.data),
    );
  }

  ngOnInit(): void {
    // 一時的にデバッグ用に追加
    this.totalrewards$.subscribe((commision) => {
      console.log('commision');
      console.log(commision);
    });

    // 一時的にデバッグ用に追加
    this.eachrewards$.subscribe((rewards) => {
      console.log('rewards');
      console.log(rewards);
    });
  }
}
