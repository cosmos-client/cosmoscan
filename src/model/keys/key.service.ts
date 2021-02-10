import { Injectable } from '@angular/core';
import { Key, KeyType } from './key.model';
import { KeyInfrastructureService } from './key.infrastructure.service';
import { PrivKey, PubKey } from 'cosmos-client';

export interface IKeyInfrastructure {
  getPrivKey(type: KeyType, privateKey: string): PrivKey;
  getPubKey(type: KeyType, publicKey: string): PubKey;
  getPrivateKeyFromMnemonic(mnemonic: string): Promise<string>;
  get(id: string): Promise<Key | undefined>;
  list(): Promise<Key[]>;
  set(id: string, type: KeyType, privateKey: string): Promise<void>;
  delete(id: string): Promise<void>;
}

@Injectable({
  providedIn: 'root',
})
export class KeyService {
  private readonly iKeyInfrastructure: IKeyInfrastructure;
  constructor(readonly keyInfrastructure: KeyInfrastructureService) {
    this.iKeyInfrastructure = keyInfrastructure;
  }

  getPrivKey(type: KeyType, privateKey: string) {
    return this.iKeyInfrastructure.getPrivKey(type, privateKey);
  }

  getPubKey(type: KeyType, publicKey: string) {
    return this.iKeyInfrastructure.getPubKey(type, publicKey);
  }

  getPrivateKeyFromMnemonic(mnemonic: string) {
    return this.iKeyInfrastructure.getPrivateKeyFromMnemonic(mnemonic);
  }

  get(id: string) {
    return this.iKeyInfrastructure.get(id);
  }

  list(): Promise<Key[]> {
    return this.iKeyInfrastructure.list();
  }

  set(id: string, type: KeyType, privateKey: string) {
    return this.iKeyInfrastructure.set(id, type, privateKey);
  }

  delete(id: string) {
    return this.iKeyInfrastructure.delete(id);
  }
}
